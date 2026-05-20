import React from 'react';
const stats = [
{
  label: 'Items diverted',
  value: '12,473',
  caption: 'Kept out of landfills this year by RESIKLO users.'
},
{
  label: 'Reusable at home',
  value: '1 in 10',
  caption: 'Household items could be reused before recycling.'
},
{
  label: 'CO₂ saved',
  value: '342,795',
  caption: 'Kilograms of CO₂ avoided by smarter waste choices.'
},
{
  label: 'Repairs & donations',
  value: '329,604',
  caption: 'Logged through RESIKLO partner hubs and cafés.'
}];

export function StatsWall() {
  return (
    <section className="bg-[#1B1F1D] py-24 md:py-32">
      <div className="container">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7BAE7F] mb-6">
            Collective impact
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-[1.1] tracking-tight mb-6">
            Why early, evidence-based waste decisions matter.
          </h2>
          <p className="text-[#9aa39d] leading-relaxed max-w-2xl">
            Most waste is decided in under three seconds. Those seconds add up.
            RESIKLO is built to make better waste choices the easier ones —
            measured by what they actually keep out of the ground.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) =>
          <div
            key={s.label}
            className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-7 hover:bg-white/[0.06] transition-colors">
            
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7BAE7F] mb-6">
                {s.label}
              </p>
              <p className="font-heading text-4xl md:text-5xl font-semibold text-white tracking-tight mb-3">
                {s.value}
              </p>
              <p className="text-[13px] text-[#9aa39d] leading-relaxed">
                {s.caption}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}