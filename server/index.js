const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer');
const { crypto } = require('crypto');
const path = require('path');

// Load environment configurations
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Set up file uploads storage rules
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WEBP are supported.'));
    }
  }
});

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabaseAdmin = null;

if (supabaseUrl && supabaseServiceKey && !supabaseUrl.includes('your_project_id')) {
  try {
    supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    console.log('✅ Supabase client initialized successfully.');
  } catch (err) {
    console.error('❌ Failed to initialize Supabase client:', err.message);
  }
} else {
  console.warn('⚠️ Supabase URL or Service Key is unconfigured. Running DB in Mock Fallback Mode.');
}

// Initialize Gemini SDK
const geminiApiKey = process.env.GEMINI_API_KEY;
let genAI = null;
if (geminiApiKey && !geminiApiKey.includes('your_gemini_api_key')) {
  try {
    genAI = new GoogleGenerativeAI(geminiApiKey);
    console.log('✅ Google Gemini SDK initialized successfully.');
  } catch (err) {
    console.error('❌ Failed to initialize Gemini SDK:', err.message);
  }
} else {
  console.warn('⚠️ Google Gemini API Key is unconfigured. Running AI in Mock Fallback Mode.');
}

// In-Memory fallback store for database operations when Supabase is unconfigured
const localScanStore = new Map();
const localDecisionsStore = [];

// ==========================================
// API ROUTES
// ==========================================

// 1. Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    mode: supabaseAdmin ? 'production' : 'development-mock',
    aiEnabled: !!genAI
  });
});

// 2. Upload Scan Image endpoint
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const base64Data = req.body.imageBase64; // Fallback if uploaded as base64 JSON
    const sessionId = req.body.sessionId || 'session_' + Math.random().toString(36).substring(2, 11);
    
    let imageUrl = '';
    let scanId = 'scan_' + Math.random().toString(36).substring(2, 15);
    let fileName = '';

    if (!file && !base64Data) {
      return res.status(400).json({ error: 'No image assets provided' });
    }

    let buffer;
    let mimeType = 'image/jpeg';
    if (file) {
      buffer = file.buffer;
      mimeType = file.mimetype;
      fileName = `${sessionId}/${Date.now()}-${file.originalname}`;
    } else {
      // Decode base64 fallback
      const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        mimeType = matches[1];
        buffer = Buffer.from(matches[2], 'base64');
      } else {
        buffer = Buffer.from(base64Data, 'base64');
      }
      fileName = `${sessionId}/${Date.now()}-upload.jpg`;
    }

    if (supabaseAdmin) {
      // Production path: upload image to Supabase Bucket 'scans'
      const { error: uploadError } = await supabaseAdmin.storage
        .from('scans')
        .upload(fileName, buffer, {
          contentType: mimeType,
          cacheControl: '3600'
        });

      if (uploadError) {
        console.error('Supabase upload storage exception:', uploadError);
        return res.status(500).json({ error: 'Failed to upload image into Supabase Storage' });
      }

      const { data: urlData } = supabaseAdmin.storage
        .from('scans')
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;

      // Register new scan row
      const { data: scan, error: dbError } = await supabaseAdmin
        .from('scans')
        .insert({
          image_url: imageUrl,
          thumbnail_url: imageUrl,
          image_storage_path: fileName,
          session_id: sessionId,
          is_ewaste: false
        })
        .select()
        .single();

      if (dbError) {
        console.error('Supabase DB registration exception:', dbError);
        return res.status(500).json({ error: 'Failed to register scan row in database' });
      }

      scanId = scan.id;
    } else {
      // Local Mock fallback path
      imageUrl = file
        ? `https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&q=80&w=800`
        : (base64Data.startsWith('data:') ? base64Data : `data:${mimeType};base64,${buffer.toString('base64')}`);
      
      const mockScan = {
        id: scanId,
        image_url: imageUrl,
        thumbnail_url: imageUrl,
        session_id: sessionId,
        is_ewaste: false,
        created_at: new Date().toISOString()
      };

      localScanStore.set(scanId, mockScan);
    }

    res.json({
      success: true,
      scanId,
      imageUrl,
      thumbnailUrl: imageUrl
    });

  } catch (error) {
    console.error('Upload handler exception:', error);
    res.status(500).json({ error: error.message || 'An unexpected error occurred during upload' });
  }
});

// 3. Scan Image analysis endpoint using Gemini AI
app.post('/api/scan', async (req, res) => {
  try {
    const { scanId, imageBase64 } = req.body;
    if (!scanId) {
      return res.status(400).json({ error: 'scanId is a required parameter' });
    }

    let scanRecord = null;
    let base64ToUse = imageBase64;

    // Fetch scan metadata
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('scans')
        .select('*')
        .eq('id', scanId)
        .single();
      
      if (error || !data) {
        return res.status(404).json({ error: 'Scan record not found in Supabase' });
      }
      scanRecord = data;
    } else {
      scanRecord = localScanStore.get(scanId);
      if (!scanRecord) {
        return res.status(404).json({ error: 'Scan record not found in mock store' });
      }
    }

    // Prepare response structure
    let geminiResult = null;

    if (genAI && base64ToUse) {
      // Production path: Execute Gemini Multi-modal vision analysis
      try {
        const model = genAI.getGenerativeModel({
          model: process.env.GEMINI_MODEL || 'gemini-1.5-pro',
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024,
            responseMimeType: "application/json"
          }
        });

        // Strip headers from base64 if present
        let cleanBase64 = base64ToUse;
        if (base64ToUse.startsWith('data:')) {
          cleanBase64 = base64ToUse.split(',')[1];
        }

        const prompt = `You are Resiklo, an advanced eco-friendly waste management AI. Analyze the uploaded photo of an object.
Analyze the image and return a JSON object with the following fields:
{
  "objectType": "string (common name of the item)",
  "wasteCategory": "plastic | paper | glass | metal | organic | electronic | hazardous | other",
  "material": "string (specific material composition, e.g., PET Plastic)",
  "condition": "good | fair | poor | broken | unknown",
  "confidence": 0.0 to 1.0 (estimation match percentage),
  "isEwaste": boolean,
  "hazardLevel": "low | medium | high | null",
  "hazardReasons": ["array of reasons if hazardous"],
  "reuseSuggestions": ["3 specific DIY or reuse ideas for this exact object"],
  "recyclingInstructions": "string (step by step preparation, like washing, caps removal, sorting)",
  "environmentalImpact": {
    "decompositionYears": number,
    "co2SavedByRecycling": "string (e.g. 0.5kg)",
    "impactStatement": "string (compelling statement about why recycling or reusing this helps)"
  }
}`;

        const imagePart = {
          inlineData: {
            data: cleanBase64,
            mimeType: "image/jpeg"
          }
        };

        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text();
        geminiResult = JSON.parse(responseText);
        console.log('Gemini Analysis Response:', geminiResult);

      } catch (geminiErr) {
        console.error('Gemini direct API call exception, falling back to mock analysis:', geminiErr);
      }
    }

    // Fallback Mock data if Gemini is disabled or crashed
    if (!geminiResult) {
      const isEwasteMock = scanRecord.image_url.includes('electronics') || scanRecord.image_url.includes('battery');
      geminiResult = {
        objectType: isEwasteMock ? 'Old Mobile Phone' : 'Plastic Mineral Water Bottle',
        wasteCategory: isEwasteMock ? 'electronic' : 'plastic',
        material: isEwasteMock ? 'Silicon, Glass & Lithium' : 'PET Plastic (Type 1)',
        condition: 'fair',
        confidence: 0.94,
        isEwaste: isEwasteMock,
        hazardLevel: isEwasteMock ? 'medium' : null,
        hazardReasons: isEwasteMock ? ['Lithium battery degradation risk', 'Heavy metals components'] : [],
        reuseSuggestions: isEwasteMock 
          ? ['Repurpose as a dedicated alarm clock or media controller', 'Donate to schools for hardware parts labs', 'Use as an offline dashcam or navigation screen']
          : ['Create a self-watering desk planter for small plants', 'Convert into a simple storage holder for stationery', 'Construct a localized bird feeder for gardens'],
        recyclingInstructions: isEwasteMock
          ? 'Do not throw in general bins. Remove SIM card, wrap in protective packing, and locate specialized local e-waste sorting hubs.'
          : 'Wash thoroughly with soap. Peel off paper labels if possible. Crush to minimize volume, keep the cap separate, and drop in plastics bin.',
        environmentalImpact: {
          decompositionYears: isEwasteMock ? 1000 : 450,
          co2SavedByRecycling: isEwasteMock ? '2.3kg' : '0.12kg',
          impactStatement: isEwasteMock
            ? 'Recycling cellphones recovers valuable copper, silver, and gold while preventing soil toxicity from heavy metals.'
            : 'Recycling standard PET bottles saves high amounts of raw petroleum energy and keeps plastics out of oceanic ecosystems.'
        }
      };
    }

    // 3. Update Database row
    if (supabaseAdmin) {
      const { data: updatedScan, error: updateError } = await supabaseAdmin
        .from('scans')
        .update({
          object_type: geminiResult.objectType,
          waste_category: geminiResult.wasteCategory,
          material: geminiResult.material,
          condition: geminiResult.condition,
          confidence: geminiResult.confidence,
          is_ewaste: geminiResult.isEwaste,
          hazard_level: geminiResult.hazardLevel,
          hazard_reasons: geminiResult.hazardReasons,
          reuse_suggestions: geminiResult.reuseSuggestions,
          recycling_instructions: geminiResult.recyclingInstructions,
          decomposition_years: geminiResult.environmentalImpact.decompositionYears,
          co2_saved_kg: parseFloat(geminiResult.environmentalImpact.co2SavedByRecycling) || 0,
          gemini_response: geminiResult,
          updated_at: new Date().toISOString()
        })
        .eq('id', scanId)
        .select()
        .single();

      if (updateError) {
        console.error('Supabase DB updates exception:', updateError);
        return res.status(500).json({ error: 'Failed to record AI scanning analytics in database' });
      }

      // Silent analytics insertion
      try {
        await supabaseAdmin.from('analytics_events').insert({
          session_id: scanRecord.session_id,
          event_type: 'scan_completed',
          event_data: {
            scanId,
            wasteCategory: geminiResult.wasteCategory,
            confidence: geminiResult.confidence
          }
        });
      } catch (ae) {
        console.warn('Analytics log failed:', ae.message);
      }
    } else {
      // Mock db updates
      const updated = {
        ...scanRecord,
        object_type: geminiResult.objectType,
        waste_category: geminiResult.wasteCategory,
        material: geminiResult.material,
        condition: geminiResult.condition,
        confidence: geminiResult.confidence,
        is_ewaste: geminiResult.isEwaste,
        hazard_level: geminiResult.hazardLevel,
        hazard_reasons: geminiResult.hazardReasons,
        reuse_suggestions: geminiResult.reuseSuggestions,
        recycling_instructions: geminiResult.recyclingInstructions,
        decomposition_years: geminiResult.environmentalImpact.decompositionYears,
        co2_saved_kg: parseFloat(geminiResult.environmentalImpact.co2SavedByRecycling) || 0,
        gemini_response: geminiResult,
        updated_at: new Date().toISOString()
      };
      localScanStore.set(scanId, updated);
    }

    res.json({
      success: true,
      scanId,
      ...geminiResult
    });

  } catch (error) {
    console.error('Scan analysis controller error:', error);
    res.status(500).json({ error: error.message || 'An unexpected error occurred during AI analysis' });
  }
});

// 4. Localized recycling facilities search
app.get('/api/facilities', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat) || 14.5995; // Manila defaults
    const lng = parseFloat(req.query.lng) || 120.9842;
    const type = req.query.type || '';
    const radius = parseFloat(req.query.radius) || 10; // in km

    const searchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius * 1000}&type=recycling_center&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    let facilities = [];

    // Production: Try calling DB + Google Places
    if (supabaseAdmin) {
      try {
        let dbQuery = supabaseAdmin.from('facilities').select('*').eq('verified', true);
        if (type) {
          dbQuery = dbQuery.eq('type', type);
        }
        const { data: dbFacilities } = await dbQuery;

        if (dbFacilities && dbFacilities.length > 0) {
          facilities = dbFacilities.map(f => {
            const distance = calculateDistance(lat, lng, f.latitude, f.longitude);
            return { ...f, distance };
          }).filter(f => f.distance <= radius);
        }
      } catch (dbErr) {
        console.warn('Supabase facilities check failed:', dbErr);
      }
    }

    // Google Places Lookup fallback if low numbers
    const placesKey = process.env.GOOGLE_MAPS_API_KEY;
    if (facilities.length < 5 && placesKey && !placesKey.includes('your_google_maps')) {
      try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        if (data.results) {
          const places = data.results.map(place => {
            const distance = calculateDistance(lat, lng, place.geometry.location.lat, place.geometry.location.lng);
            return {
              id: place.place_id,
              name: place.name,
              type: type || 'recycling',
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
              distance: parseFloat(distance.toFixed(2)),
              address: place.vicinity || 'Local Manila Area',
              verified: false,
              accepted_waste: ['plastic', 'paper', 'glass', 'metal']
            };
          });
          facilities = [...facilities, ...places];
        }
      } catch (placesErr) {
        console.warn('Google Places fetch failed:', placesErr);
      }
    }

    // Hardcoded Seed Data fallbacks if everything is empty or missing keys
    if (facilities.length === 0) {
      facilities = [
        {
          id: 'moa-recycling',
          name: 'SM Mall of Asia Recycling Center',
          type: 'recycling',
          latitude: 14.5355,
          longitude: 120.9827,
          distance: parseFloat(calculateDistance(lat, lng, 14.5355, 120.9827).toFixed(2)),
          address: 'MOA Square, Pasay City, Metro Manila',
          verified: true,
          accepted_waste: ['plastic', 'paper', 'glass', 'metal']
        },
        {
          id: 'makati-ewaste',
          name: 'Makati E-Waste Facility',
          type: 'ewaste',
          latitude: 14.5547,
          longitude: 121.0242,
          distance: parseFloat(calculateDistance(lat, lng, 14.5547, 121.0242).toFixed(2)),
          address: '123 Jupiter Street, Makati City, Metro Manila',
          verified: true,
          accepted_waste: ['electronics', 'batteries', 'chargers', 'phones']
        },
        {
          id: 'barangay-san-antonio',
          name: 'Barangay San Antonio Collection Hall',
          type: 'barangay',
          latitude: 14.5632,
          longitude: 121.0185,
          distance: parseFloat(calculateDistance(lat, lng, 14.5632, 121.0185).toFixed(2)),
          address: 'San Antonio Village, Makati City',
          verified: true,
          accepted_waste: ['plastic', 'paper', 'organic']
        }
      ];
    }

    // Sort nearest first
    facilities.sort((a, b) => a.distance - b.distance);

    res.json({
      success: true,
      facilities,
      totalResults: facilities.length
    });

  } catch (error) {
    console.error('Facilities controller failure:', error);
    res.status(500).json({ error: 'Failed to lookup nearby facility centers' });
  }
});

// 5. Search DIY and Circular YouTube Tutorials
app.get('/api/tutorials', async (req, res) => {
  try {
    const query = req.query.q;
    const type = req.query.type || 'diy';
    const limit = parseInt(req.query.limit) || 3;

    if (!query) {
      return res.status(400).json({ error: 'Search query parameter "q" is required' });
    }

    const youtubeKey = process.env.YOUTUBE_API_KEY;
    let tutorials = [];

    if (youtubeKey && !youtubeKey.includes('your_youtube_api')) {
      try {
        const searchTerms = {
          diy: `${query} DIY reuse upcycle tutorial`,
          repair: `${query} how to fix repair guide`,
          recycle: `${query} how to recycle properly sorting`
        };
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${limit}&q=${encodeURIComponent(searchTerms[type] || query)}&type=video&key=${youtubeKey}`;
        
        const response = await fetch(searchUrl);
        const data = await response.json();
        
        if (data.items) {
          tutorials = data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.medium?.url || '',
            channelTitle: item.snippet.channelTitle,
            url: `https://youtube.com/watch?v=${item.id.videoId}`
          }));
        }
      } catch (ytErr) {
        console.warn('YouTube API fetch failure, using mock circular guides:', ytErr);
      }
    }

    // Mock Guides if empty or YouTube is unconfigured
    if (tutorials.length === 0) {
      tutorials = [
        {
          id: 'upcycle-1',
          title: `How to DIY Upcycle and Repurpose a ${query} - Easy Guide`,
          description: `Learn how to turn a simple ${query} into a functional household accessory with these step-by-step upcycling instructions.`,
          thumbnailUrl: 'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=400&q=80',
          channelTitle: 'Green Living Crafts',
          url: 'https://youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          id: 'recycle-1',
          title: `How to properly recycle a ${query} inside Manila`,
          description: `This zero waste video walks through material categorization, sorting rules, and municipal facility drops.`,
          thumbnailUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400&q=80',
          channelTitle: 'Recycle Science',
          url: 'https://youtube.com/watch?v=L1H8yTz1_Qk'
        }
      ];
    }

    res.json({
      success: true,
      tutorials: tutorials.slice(0, limit),
      query,
      type
    });

  } catch (error) {
    console.error('Tutorials controller exception:', error);
    res.status(500).json({ error: 'Failed to search YouTube circular guides' });
  }
});

// Haversine formula distance calculator
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Start Server listener
app.listen(PORT, () => {
  console.log(`🚀 Resiklo Secure Proxy Backend is running on http://localhost:${PORT}`);
});
