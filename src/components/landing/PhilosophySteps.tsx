import React from 'react';
import { RefreshCw, Wrench, Heart, Recycle, Trash2 } from 'lucide-react';
const steps = [
{
  id: 1,
  title: 'Reuse',
  icon: RefreshCw,
  color: 'text-[#2F6B5F]',
  bg: 'bg-[#2F6B5F]/10'
},
{
  id: 2,
  title: 'Repair',
  icon: Wrench,
  color: 'text-[#7BAE7F]',
  bg: 'bg-[#7BAE7F]/10'
},
{
  id: 3,
  title: 'Donate',
  icon: Heart,
  color: 'text-[#D9A441]',
  bg: 'bg-[#D9A441]/10'
},
{
  id: 4,
  title: 'Recycle',
  icon: Recycle,
  color: 'text-[#66706A]',
  bg: 'bg-[#66706A]/10'
},
{
  id: 5,
  title: 'Dispose',
  icon: Trash2,
  color: 'text-[#C65B4B]',
  bg: 'bg-[#C65B4B]/10'
}];

export function PhilosophySteps() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1B1F1D] mb-4">
            The RESIKLO Philosophy
          </h2>
          <p className="text-[#66706A] max-w-2xl mx-auto">
            A hierarchy of sustainability. We guide you through the best
            environmental choices before an item reaches the landfill.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-[#2F6B5F]/20 via-[#66706A]/20 to-[#C65B4B]/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) =>
            <div
              key={step.id}
              className="flex flex-col items-center text-center group">
              
                <div
                className={`w-16 h-16 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 shadow-sm border border-white/50 bg-white/80 backdrop-blur-sm relative`}>
                
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-border flex items-center justify-center text-[10px] font-mono font-bold text-[#1B1F1D] shadow-sm">
                    {step.id}
                  </div>
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-[#1B1F1D] mb-2">{step.title}</h3>
                <p className="text-xs text-[#66706A] md:hidden">
                  {index === 0 && 'Find a new purpose'}
                  {index === 1 && "Fix what's broken"}
                  {index === 2 && 'Give to others'}
                  {index === 3 && 'Process responsibly'}
                  {index === 4 && 'Last resort only'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}