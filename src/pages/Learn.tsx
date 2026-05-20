import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Play,
  BookOpen,
  Sprout,
  Wrench,
  ArrowRight } from
'lucide-react';
import { Input } from '../components/Input';
import { mockResources } from '../lib/mockData';
const categories = ['All', 'DIY', 'Repair', 'Articles', 'Videos'];
export function Learn() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredResources =
  activeCategory === 'All' ?
  mockResources :
  mockResources.filter((r) => r.category === activeCategory);
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sprout':
        return <Sprout className="w-5 h-5" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Play className="w-5 h-5" />;
    }
  };
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F6F8F5] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-border/40 pt-12 pb-8">
        <div className="container max-w-4xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1B1F1D] mb-4">
            Educational Resources
          </h1>
          <p className="text-[#66706A] mb-8 max-w-2xl">
            Learn how to repair, upcycle, and make sustainable choices with our
            curated guides and tutorials.
          </p>

          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#66706A]" />
            <Input
              placeholder="Search for tutorials, materials, or guides..."
              className="pl-12 bg-[#F6F8F5] border-transparent focus-visible:ring-[#2F6B5F] rounded-2xl h-14 text-base shadow-sm" />
            
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mt-8">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) =>
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-[#1B1F1D] text-white' : 'bg-white text-[#66706A] border border-border/50 hover:border-[#1B1F1D]/30'}`}>
            
              {cat}
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, i) =>
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
              delay: i * 0.1
            }}
            key={resource.id}
            className="bg-white rounded-3xl overflow-hidden border border-border/50 hover:shadow-lg hover:shadow-black/5 transition-all group cursor-pointer flex flex-col">
            
              <div className="aspect-video bg-[#E8EAE6] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-[#66706A]/20 group-hover:scale-110 transition-transform duration-500">
                  {getIcon(resource.icon)}
                </div>
                {resource.category === 'Videos' &&
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1B1F1D] shadow-sm group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-1" />
                    </div>
                  </div>
              }
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[#1B1F1D] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                    {resource.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-[#1B1F1D] mb-3 group-hover:text-[#2F6B5F] transition-colors line-clamp-2">
                  {resource.title}
                </h3>
                <div className="mt-auto flex items-center justify-between text-sm">
                  <span className="text-[#66706A] font-mono text-xs uppercase tracking-wider">
                    {resource.time}
                  </span>
                  <span className="text-[#2F6B5F] font-medium flex items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    Read <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>);

}