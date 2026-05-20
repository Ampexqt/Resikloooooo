import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../Button';
export function Hero() {
  const [email, setEmail] = useState('');
  return (
    <section className="relative bg-[#F6F8F5] pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image - shows first on mobile, right on desktop */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[5/4] lg:aspect-[4/3] shadow-2xl shadow-black/10">
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1600"
                alt="A quiet forest path winding through tall trees"
                className="absolute inset-0 w-full h-full object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          </div>

          {/* Text */}
          <div className="order-2 lg:order-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2F6B5F] mb-6">
              AI · Sustainability · v1.0
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1B1F1D] leading-[1.05] mb-6">
              Waste decisions are personal. Your guidance should be too.
            </h1>
            <p className="text-base md:text-lg text-[#66706A] leading-relaxed max-w-xl mb-8">
              RESIKLO is a calm decision layer for the things you're about to
              throw away. Before recycling, we help you see if an item can be
              reused, repaired, donated, or given a longer life.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-2 max-w-md mb-4">
              
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="w-full h-12 rounded-full bg-white border border-[#1B1F1D]/10 px-5 text-sm text-[#1B1F1D] placeholder:text-[#66706A]/70 outline-none focus:border-[#2F6B5F]/40 focus:ring-2 focus:ring-[#2F6B5F]/15 transition" />
                
              </div>
              <Button
                type="submit"
                className="h-12 rounded-full bg-[#1B1F1D] hover:bg-[#2F6B5F] text-white px-6 text-sm font-medium transition-colors group">
                
                Sign me in
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </form>

            <p className="font-mono text-[11px] text-[#66706A] leading-relaxed max-w-md">
              Shaped by everyone learning to live with less waste — early access
              opens this summer.
            </p>
          </div>
        </div>
      </div>
    </section>);

}