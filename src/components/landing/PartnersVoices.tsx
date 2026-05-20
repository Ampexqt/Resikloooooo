import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../Button';
const cards = [
{
  eyebrow: 'For partners',
  title: 'Work with us to shape RESIKLO.',
  body: 'Whether you run a recycling center, a repair café, or a donation hub — help shape how RESIKLO routes the right items to the right places.',
  bullets: [
  'A 10-minute partner questionnaire',
  'Free listing on the RESIKLO map',
  'Monthly impact reports for your space'],

  cta: 'Complete partner questionnaire',
  disclaimer: 'Takes ~10 minutes. We review applications monthly.'
},
{
  eyebrow: 'For voices',
  title: 'Help us build something that works.',
  body: 'Lived experience makes RESIKLO better. Share what you wish existed, what frustrates you, or what already works in your home.',
  bullets: [
  'Three short prompts, your own words',
  'Fully anonymous unless you opt in',
  'Real changes ship from your input'],

  cta: 'Share your experience',
  disclaimer: 'You can stop and save your answers anytime — they stay yours.'
}];

export function PartnersVoices() {
  return (
    <section className="bg-white py-24 md:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2F6B5F] mb-5">
            Get involved
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1F1D] tracking-tight">
            We're looking for{' '}
            <span className="italic font-normal text-[#2F6B5F]">
              partners and voices
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {cards.map((c) =>
          <div
            key={c.title}
            className="rounded-3xl bg-[#F6F8F5] border border-[#1B1F1D]/5 p-8 md:p-10 flex flex-col">
            
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2F6B5F] mb-5">
                {c.eyebrow}
              </p>
              <h3 className="font-heading text-2xl md:text-3xl font-semibold text-[#1B1F1D] tracking-tight leading-tight mb-4">
                {c.title}
              </h3>
              <p className="text-[#66706A] leading-relaxed mb-6">{c.body}</p>
              <ul className="space-y-3 mb-8">
                {c.bullets.map((b) =>
              <li
                key={b}
                className="flex items-start gap-3 text-sm text-[#1B1F1D]">
                
                    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#7BAE7F]/15 text-[#2F6B5F] mt-0.5">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
              )}
              </ul>
              <div className="mt-auto">
                <Button className="rounded-full bg-[#1B1F1D] hover:bg-[#2F6B5F] text-white h-12 px-6 text-sm font-medium group transition-colors">
                  {c.cta}
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <p className="font-mono text-[10px] text-[#66706A] mt-4">
                  {c.disclaimer}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}