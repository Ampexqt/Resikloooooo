import React from 'react';
export function DarkIntro() {
  return (
    <section className="bg-[#1B1F1D] py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7BAE7F] mb-8">
            Our approach
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-[1.15] tracking-tight mb-8">
            A more connected approach to everyday waste, built for real life.
          </h2>
          <div className="space-y-5 text-[15px] md:text-base text-[#9aa39d] leading-relaxed">
            <p>
              RESIKLO sits between the bin and the curb. Before you throw
              something away, we walk you through a quiet hierarchy — reuse,
              repair, donate, recycle, dispose — and tell you what actually
              makes sense for that one item, in your neighborhood, right now.
            </p>
            <p>
              It's a layer designed to slow the decision down by just a few
              seconds, so the right choice can win. No guilt, no scoreboard.
              Just clearer answers when you're standing over the bin with
              something in your hand.
            </p>
          </div>
        </div>
      </div>
    </section>);

}