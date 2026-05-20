import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
const articles = [
{
  title: 'What is PET and why is it tricky to recycle?',
  excerpt:
  'The most common plastic on earth is also one of the most misunderstood. A short, honest field guide to PET #1.',
  image:
  'https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=800',
  tag: 'Plastic'
},
{
  title: 'How to repair small electronics at home',
  excerpt:
  'Three tools, four habits, and a calmer relationship with the gadgets that keep breaking on you.',
  image:
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
  tag: 'Repair'
},
{
  title: 'Donation hubs: where your old phone really goes',
  excerpt:
  'We followed a donated smartphone for six weeks. Here is what actually happens after you drop it off.',
  image:
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
  tag: 'Donate'
},
{
  title: 'The honest truth about plastic #5',
  excerpt:
  "Polypropylene is everywhere — yogurt cups, bottle caps, takeout lids. What can really be recycled, and what can't.",
  image:
  'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=800',
  tag: 'Guide'
}];

export function Resources() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    if (!scrollerRef.current) return;
    const card = scrollerRef.current.querySelector('[data-card]') as HTMLElement;
    const w = card ? card.offsetWidth + 16 : 320;
    scrollerRef.current.scrollBy({
      left: dir * w,
      behavior: 'smooth'
    });
  };
  return (
    <section className="bg-[#F6F8F5] py-24 md:py-28">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2F6B5F] mb-4">
              Resources
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#1B1F1D] tracking-tight">
              Helpful guides from RESIKLO.
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              className="h-11 w-11 rounded-full border border-[#1B1F1D]/15 flex items-center justify-center text-[#1B1F1D] hover:bg-[#1B1F1D] hover:text-white transition-colors">
              
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next"
              className="h-11 w-11 rounded-full border border-[#1B1F1D]/15 flex items-center justify-center text-[#1B1F1D] hover:bg-[#1B1F1D] hover:text-white transition-colors">
              
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          
          {articles.map((a) =>
          <article
            key={a.title}
            data-card
            className="snap-start flex-none w-[280px] md:w-[320px] rounded-3xl bg-white border border-[#1B1F1D]/5 overflow-hidden group hover:shadow-lg hover:shadow-black/5 transition-shadow">
            
              <div className="relative aspect-[4/3] overflow-hidden bg-[#DCE8DD]">
                <img
                src={a.image}
                alt={a.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              
                <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-mono uppercase tracking-wider text-[#2F6B5F]">
                  {a.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-[#1B1F1D] leading-snug mb-2 line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-[13px] text-[#66706A] leading-relaxed line-clamp-2 mb-4">
                  {a.excerpt}
                </p>
                <a
                href="#"
                className="inline-flex items-center gap-1 text-[13px] font-medium text-[#2F6B5F] hover:gap-2 transition-all">
                
                  Read
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}