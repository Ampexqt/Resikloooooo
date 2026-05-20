import React from 'react';
import {
  Scan,
  Sprout,
  Check,
  RefreshCw,
  Wrench,
  Heart,
  MapPin,
  Navigation,
  Signal,
  Wifi,
  BatteryMedium,
  ArrowLeft,
  Bookmark } from
'lucide-react';
function StatusBar({ tint = 'text-white' }: {tint?: string;}) {
  return (
    <div
      className={`flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-medium ${tint}`}>
      
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <BatteryMedium className="h-3.5 w-3.5" />
      </div>
    </div>);

}
export function ScanScreen() {
  return (
    <div className="absolute inset-0 bg-[#1B1F1D] flex flex-col">
      <StatusBar tint="text-white/80" />
      <div className="px-5 pb-2 flex items-center justify-between">
        <button className="text-white/70">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">
          Scan
        </p>
        <div className="w-4" />
      </div>

      {/* Viewfinder */}
      <div className="relative flex-1 mx-4 mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0d1310] via-[#142019] to-[#0d1310]">
        {/* Mock subject */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-32 rounded-[40%] bg-gradient-to-b from-[#7BAE7F]/30 to-[#2F6B5F]/20 blur-[1px]" />
        </div>

        {/* Reticle corners */}
        <div className="absolute inset-8 pointer-events-none">
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#7BAE7F] rounded-tl-md" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#7BAE7F] rounded-tr-md" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#7BAE7F] rounded-bl-md" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#7BAE7F] rounded-br-md" />
          {/* Scan line */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-[#7BAE7F]/70 shadow-[0_0_8px_rgba(123,174,127,0.8)]" />
        </div>

        {/* Scanning pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          <Scan className="h-3 w-3 text-[#7BAE7F]" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/90">
            Scanning…
          </span>
        </div>

        {/* Detected chip */}
        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 backdrop-blur-md p-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider text-[#66706A] mb-0.5">
                Detected
              </p>
              <p className="text-[13px] font-semibold text-[#1B1F1D]">
                Plastic Bottle · PET #1
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F6B5F] text-white">
              <Check className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Capture button */}
      <div className="flex items-center justify-center pb-6">
        <div className="h-14 w-14 rounded-full border-2 border-white/80 p-1">
          <div className="h-full w-full rounded-full bg-white" />
        </div>
      </div>
    </div>);

}
export function AnalyzeScreen() {
  return (
    <div className="absolute inset-0 bg-[#F6F8F5] flex flex-col">
      <StatusBar tint="text-[#1B1F1D]/80" />
      <div className="px-5 pb-3 flex items-center justify-between">
        <button className="text-[#1B1F1D]/60">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#66706A]">
          Analysis
        </p>
        <div className="w-4" />
      </div>

      <div className="flex-1 px-4 space-y-3 overflow-hidden">
        {/* Result card */}
        <div className="rounded-2xl bg-white p-4 border border-[#1B1F1D]/5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider text-[#66706A] mb-1">
                Identified
              </p>
              <h3 className="text-base font-semibold text-[#1B1F1D]">
                Plastic Bottle
              </h3>
              <p className="text-[11px] text-[#66706A]">PET #1 · Clear</p>
            </div>
            <span className="px-2 py-1 rounded-full bg-[#DCE8DD] text-[#2F6B5F] text-[10px] font-mono font-medium">
              96% match
            </span>
          </div>
          <div className="flex items-center gap-2 pt-3 border-t border-[#1B1F1D]/5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7BAE7F]/15 text-[#2F6B5F]">
              <Sprout className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider text-[#66706A]">
                Condition
              </p>
              <p className="text-[12px] font-medium text-[#1B1F1D]">Reusable</p>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="rounded-2xl bg-white p-4 border border-[#1B1F1D]/5 shadow-sm space-y-3">
          <p className="font-mono text-[9px] uppercase tracking-wider text-[#66706A]">
            Suggestions
          </p>
          {[
          {
            icon: RefreshCw,
            label: 'Reuse as a planter',
            hint: 'Cut, drain, plant'
          },
          {
            icon: Wrench,
            label: 'Repair the cap',
            hint: 'Re-seal for storage'
          },
          {
            icon: Heart,
            label: 'Donate to school',
            hint: 'Craft program nearby'
          }].
          map(({ icon: Icon, label, hint }) =>
          <div key={label} className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7BAE7F]/15 text-[#2F6B5F]">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-[#1B1F1D] truncate">
                  {label}
                </p>
                <p className="text-[10px] text-[#66706A] truncate">{hint}</p>
              </div>
              <Check className="h-3.5 w-3.5 text-[#7BAE7F]" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-4">
        <div className="h-11 rounded-full bg-[#1B1F1D] flex items-center justify-center text-white text-[12px] font-medium">
          See nearby options
        </div>
      </div>
    </div>);

}
export function MapScreen() {
  return (
    <div className="absolute inset-0 bg-[#EDF2EC] flex flex-col">
      <StatusBar tint="text-[#1B1F1D]/80" />
      <div className="px-5 pb-2 flex items-center justify-between">
        <button className="text-[#1B1F1D]/60">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#66706A]">
          Nearby
        </p>
        <div className="w-4" />
      </div>

      {/* Map area */}
      <div className="relative flex-1 mx-3 mb-3 rounded-2xl overflow-hidden bg-[#dfe9de]">
        {/* Subtle grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          xmlns="http://www.w3.org/2000/svg">
          
          <defs>
            <pattern
              id="mapgrid"
              width="22"
              height="22"
              patternUnits="userSpaceOnUse">
              
              <path
                d="M 22 0 L 0 0 0 22"
                fill="none"
                stroke="#b8c9b8"
                strokeWidth="0.5" />
              
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapgrid)" />
        </svg>

        {/* Roads */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 320"
          preserveAspectRatio="none">
          
          <path
            d="M -20 240 Q 60 200 120 230 T 240 180"
            stroke="#cbd9ca"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round" />
          
          <path
            d="M 30 -10 Q 80 80 60 160 T 100 320"
            stroke="#cbd9ca"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round" />
          
          <path
            d="M 140 -10 Q 130 90 170 160 T 150 320"
            stroke="#d5e0d4"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round" />
          
        </svg>

        {/* Pins */}
        <Pin top="22%" left="28%" color="#2F6B5F" label="Drop-off" big />
        <Pin top="48%" left="62%" color="#7BAE7F" label="Repair Café" />
        <Pin top="70%" left="38%" color="#D9A441" label="Donation Hub" />

        {/* You marker */}
        <div
          className="absolute"
          style={{
            top: '38%',
            left: '46%'
          }}>
          
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-[#2F6B5F]/20 animate-pulse" />
            <div className="relative h-3 w-3 rounded-full bg-[#2F6B5F] border-2 border-white shadow" />
          </div>
        </div>

        {/* Bottom pill */}
        <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 backdrop-blur p-3 shadow-md flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2F6B5F] text-white">
            <Navigation className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-[#1B1F1D]">
              Drop-off Center
            </p>
            <p className="text-[10px] text-[#66706A]">2.4 km away · Open now</p>
          </div>
          <span className="text-[10px] font-mono text-[#2F6B5F] font-medium">
            GO
          </span>
        </div>
      </div>
    </div>);

}
function Pin({
  top,
  left,
  color,
  label,
  big






}: {top: string;left: string;color: string;label: string;big?: boolean;}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center"
      style={{
        top,
        left
      }}>
      
      <div className="px-1.5 py-0.5 rounded-md bg-white/95 shadow-sm mb-0.5 text-[8px] font-medium text-[#1B1F1D] whitespace-nowrap">
        {label}
      </div>
      <div
        className={`${big ? 'h-7 w-7' : 'h-6 w-6'} rounded-full flex items-center justify-center shadow-md border-2 border-white`}
        style={{
          backgroundColor: color
        }}>
        
        <MapPin className={`${big ? 'h-3.5 w-3.5' : 'h-3 w-3'} text-white`} />
      </div>
    </div>);

}
export function LearnScreen() {
  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      <StatusBar tint="text-[#1B1F1D]/80" />
      <div className="px-5 pb-2 flex items-center justify-between">
        <button className="text-[#1B1F1D]/60">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#66706A]">
          Learn
        </p>
        <button className="text-[#1B1F1D]/60">
          <Bookmark className="h-4 w-4" />
        </button>
      </div>

      {/* Hero image */}
      <div className="relative mx-4 rounded-2xl overflow-hidden aspect-[16/9] mb-3">
        <img
          src="https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=600"
          alt="Plastic bottles"
          className="absolute inset-0 w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="px-4 flex-1 overflow-hidden">
        {/* Tags */}
        <div className="flex gap-1.5 mb-2">
          {['Plastic', 'Recycling', 'Guide'].map((t) =>
          <span
            key={t}
            className="px-2 py-0.5 rounded-full bg-[#DCE8DD] text-[#2F6B5F] text-[9px] font-mono uppercase tracking-wider">
            
              {t}
            </span>
          )}
        </div>

        <h3 className="text-[15px] font-semibold text-[#1B1F1D] leading-snug mb-1.5">
          Why PET deserves a second life
        </h3>
        <p className="text-[11px] text-[#66706A] leading-relaxed mb-3 line-clamp-3">
          PET #1 is one of the most recyclable plastics on earth — but most
          bottles still end up in landfills. A few small choices at home can
          shift the math entirely.
        </p>

        {/* Reading progress */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] uppercase tracking-wider text-[#66706A]">
              Reading
            </p>
            <p className="font-mono text-[9px] text-[#2F6B5F]">35%</p>
          </div>
          <div className="h-1 rounded-full bg-[#1B1F1D]/5 overflow-hidden">
            <div
              className="h-full bg-[#2F6B5F] rounded-full"
              style={{
                width: '35%'
              }} />
            
          </div>
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 rounded-full bg-[#1B1F1D]/5 w-full" />
          <div className="h-1.5 rounded-full bg-[#1B1F1D]/5 w-11/12" />
          <div className="h-1.5 rounded-full bg-[#1B1F1D]/5 w-4/5" />
        </div>
      </div>
    </div>);

}