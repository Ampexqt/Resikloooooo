import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  MapPin,
  ShieldAlert,
  ArrowLeft,
  Wrench,
  Heart } from
'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { mockSuggestions } from '../lib/mockData';
export function Ewaste() {
  const data = mockSuggestions.smartphone;
  return (
    <div className="min-h-screen bg-[#111312] text-white pb-24 selection:bg-[#D9A441]/30">
      {/* Header */}
      <div className="border-b border-white/10 pt-8 pb-6 sticky top-16 z-40 bg-[#111312]/80 backdrop-blur-md">
        <div className="container flex items-center gap-4">
          <Link to="/analysis">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/60 hover:text-white hover:bg-white/10 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-heading text-2xl font-bold text-white">
                E-Waste Detected
              </h1>
              <Badge className="bg-[#C65B4B]/20 text-[#C65B4B] border-[#C65B4B]/30 font-mono uppercase tracking-wider text-[10px]">
                High Hazard
              </Badge>
            </div>
            <p className="text-white/60 text-sm">
              Special handling required for this item.
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              className="bg-white/5 rounded-3xl p-2 border border-white/10 overflow-hidden relative">
              
              <div className="absolute inset-0 bg-gradient-to-b from-[#D9A441]/5 to-transparent pointer-events-none" />
              <div className="aspect-square rounded-2xl overflow-hidden relative bg-black">
                <img
                  src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=800"
                  alt="Damaged phone"
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-white font-bold text-xl mb-1">
                    {data.item.split('·')[0].trim()}
                  </h2>
                  <p className="text-[#D9A441] text-sm font-mono">
                    {data.item.split('·')[1].trim()}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.1
              }}
              className="bg-[#C65B4B]/10 border border-[#C65B4B]/20 rounded-3xl p-6 relative overflow-hidden">
              
              <ShieldAlert className="w-6 h-6 text-[#C65B4B] mb-4" />
              <h3 className="font-bold text-lg text-white mb-2">
                Environmental Risk
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Lithium-ion batteries can catch fire if punctured or crushed in
                regular garbage trucks. They also leak toxic chemicals into soil
                and water.
              </p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.2
              }}
              className="bg-[#D9A441]/10 border border-[#D9A441]/20 rounded-2xl p-6 flex items-start gap-4">
              
              <AlertTriangle className="w-6 h-6 text-[#D9A441] shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Do not throw in regular trash
                </h3>
                <p className="text-white/70 text-sm">{data.recycle}</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Repair */}
              <motion.section
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.3
                }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6">
                
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-4">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white mb-2">Repair Option</h3>
                <p className="text-white/60 text-sm mb-4">
                  Screen and battery replacements can extend this device's life
                  by 2+ years.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10">
                  
                  Find Repair Shops
                </Button>
              </motion.section>

              {/* Donate */}
              <motion.section
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.4
                }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6">
                
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white mb-2">Donate</h3>
                <p className="text-white/60 text-sm mb-4">
                  If repaired, this device can be donated to students for online
                  learning.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10">
                  
                  View Donation Hubs
                </Button>
              </motion.section>
            </div>

            {/* Safe Disposal */}
            <motion.section
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.5
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6">
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-white text-lg">
                    Certified E-Waste Centers
                  </h3>
                  <p className="text-white/60 text-sm">
                    Nearest facilities equipped to handle lithium batteries.
                  </p>
                </div>
                <MapPin className="w-6 h-6 text-white/40 hidden sm:block" />
              </div>

              <div className="space-y-3">
                {[1, 2].map((i) =>
                <div
                  key={i}
                  className="bg-black/40 rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
                  
                    <div>
                      <p className="font-medium text-white text-sm">
                        GreenTech E-Waste Center
                      </p>
                      <p className="text-white/50 text-xs mt-1">
                        1.2 km away · Open until 5:00 PM
                      </p>
                    </div>
                    <Button
                    size="sm"
                    className="bg-white text-black hover:bg-white/90 rounded-lg text-xs">
                    
                      Directions
                    </Button>
                  </div>
                )}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>);

}