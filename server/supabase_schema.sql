-- ============================================================
-- Resiklo – Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → Run ▶
-- ============================================================

-- Enable UUID helper if not already active
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLE: public.scans
--   Core table used by every API route in server/index.js
-- ============================================================
create table if not exists public.scans (
  -- Primary key
  id                    uuid primary key default gen_random_uuid(),

  -- Image storage
  image_url             text not null,
  thumbnail_url         text,
  image_storage_path    text,

  -- Session tracking
  session_id            text,

  -- Object identification (filled by /api/scan/initiate)
  object_type           text,
  confidence            numeric(5,4),          -- 0.0000 – 1.0000
  is_ewaste             boolean default false,

  -- Waste classification (filled by /api/scan and /api/scan/finalize)
  waste_category        text,                  -- plastic | paper | glass | metal | organic | electronic | hazardous | other
  material              text,
  condition             text,                  -- good | fair | poor | broken | unknown | Reusable | Recyclable | Damaged | Soiled
  hazard_level          text,                  -- low | medium | high | null
  hazard_reasons        jsonb,                 -- string array
  reuse_suggestions     jsonb,                 -- string array
  recycling_instructions text,

  -- Environmental impact
  decomposition_years   integer,
  co2_saved_kg          numeric(10,4),

  -- Full Gemini AI response blob (used for questions, answers, final_analysis sub-keys)
  gemini_response       jsonb,

  -- Timestamps
  created_at            timestamp with time zone default now(),
  updated_at            timestamp with time zone
);

-- Index on session_id so lookups by session are fast
create index if not exists idx_scans_session_id on public.scans(session_id);

-- ============================================================
-- TABLE: public.analytics_events
--   Used by the silent analytics insert in /api/scan
-- ============================================================
create table if not exists public.analytics_events (
  id           uuid primary key default gen_random_uuid(),
  session_id   text,
  event_type   text,                           -- e.g. scan_completed
  event_data   jsonb,
  created_at   timestamp with time zone default now()
);

-- ============================================================
-- TABLE: public.facilities
--   Used by /api/facilities when Supabase is connected
-- ============================================================
create table if not exists public.facilities (
  id              text primary key,
  name            text not null,
  type            text,                         -- recycling | ewaste | barangay
  latitude        numeric(10,6),
  longitude       numeric(10,6),
  address         text,
  verified        boolean default false,
  accepted_waste  jsonb,                        -- string array e.g. ['plastic','paper']
  created_at      timestamp with time zone default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (optional – disable if you're always
-- using the service-role key from the backend)
-- ============================================================
-- alter table public.scans enable row level security;
-- alter table public.analytics_events enable row level security;
-- alter table public.facilities enable row level security;
