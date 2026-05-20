import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Search, Filter } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import { ScrollArea } from '../components/ScrollArea';
import { mockFacilities } from '../lib/mockData';
const categories = [
{
  id: 'all',
  label: 'All'
},
{
  id: 'recycling',
  label: 'Recycling'
},
{
  id: 'e-waste',
  label: 'E-Waste'
},
{
  id: 'donation',
  label: 'Donation'
}];

export function MapPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredFacilities =
  activeCategory === 'all' ?
  mockFacilities :
  mockFacilities.filter((f) => f.type === activeCategory);
  return (
    <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-[#F6F8F5] overflow-hidden relative">
      {/* Map Area (Mocked with CSS/Image for reliability) */}
      <div className="flex-1 relative bg-[#E8EAE6] order-2 md:order-1 h-[50vh] md:h-full">
        {/* Minimalist map background pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232F6B5F' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        

        {/* Map Pins */}
        <div className="absolute top-[40%] left-[30%]">
          <div className="relative group cursor-pointer">
            <div className="w-8 h-8 bg-[#2F6B5F] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#2F6B5F]/30 z-10 relative group-hover:scale-110 transition-transform">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold text-[#1B1F1D] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              Barangay San Lorenzo
            </div>
          </div>
        </div>

        <div className="absolute top-[60%] left-[60%]">
          <div className="relative group cursor-pointer">
            <div className="w-8 h-8 bg-[#C65B4B] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#C65B4B]/30 z-10 relative group-hover:scale-110 transition-transform">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold text-[#1B1F1D] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              GreenTech E-Waste
            </div>
          </div>
        </div>

        {/* User Location Pin */}
        <div className="absolute top-[50%] left-[45%]">
          <div className="w-4 h-4 bg-[#1B1F1D] rounded-full border-2 border-white shadow-md relative">
            <div className="absolute inset-0 bg-[#1B1F1D] rounded-full animate-ping opacity-50" />
          </div>
        </div>
      </div>

      {/* Sidebar Panel */}
      <div className="w-full md:w-[400px] lg:w-[450px] bg-white border-l border-border/40 flex flex-col order-1 md:order-2 h-[50vh] md:h-full z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.02)] rounded-t-3xl md:rounded-none -mt-6 md:mt-0 relative">
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-3 mb-1 md:hidden" />

        <div className="p-4 md:p-6 border-b border-border/40">
          <h1 className="font-heading text-2xl font-bold text-[#1B1F1D] mb-4">
            Disposal Map
          </h1>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#66706A]" />
            <Input
              placeholder="Search facilities or waste types..."
              className="pl-9 bg-[#F6F8F5] border-transparent focus-visible:ring-[#2F6B5F] rounded-xl h-11" />
            
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) =>
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat.id ? 'bg-[#1B1F1D] text-white' : 'bg-[#F6F8F5] text-[#66706A] hover:bg-gray-200'}`}>
              
                {cat.label}
              </button>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 p-4 md:p-6">
          <div className="space-y-4 pb-20 md:pb-0">
            {filteredFacilities.map((facility, i) =>
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: i * 0.1
              }}
              key={facility.id}
              className="bg-white border border-border/50 rounded-2xl p-4 hover:border-[#2F6B5F]/30 hover:shadow-md transition-all cursor-pointer group">
              
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[#1B1F1D] group-hover:text-[#2F6B5F] transition-colors">
                    {facility.name}
                  </h3>
                  <span className="text-xs font-mono text-[#66706A] bg-[#F6F8F5] px-2 py-1 rounded-md">
                    {facility.distance}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#66706A] mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  {facility.hours}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {facility.accepted.map((item) =>
                <Badge
                  key={item}
                  variant="outline"
                  className="text-[10px] bg-[#F6F8F5] border-transparent text-[#66706A]">
                  
                      {item}
                    </Badge>
                )}
                </div>

                <Button
                variant="outline"
                className="w-full rounded-xl text-sm h-10 border-border/50 hover:bg-[#F6F8F5]">
                
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>);

}