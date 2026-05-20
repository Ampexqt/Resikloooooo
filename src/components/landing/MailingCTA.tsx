import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../Button';
export function MailingCTA() {
  const [email, setEmail] = useState('');
  return (
    <section className="bg-[#1B1F1D] py-24 md:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7BAE7F] mb-6">
            Stay close
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.05] mb-6">
            Stay close to <br />
            RESIKLO.
          </h2>
          <p className="text-[#9aa39d] leading-relaxed mb-8 max-w-lg">
            One quiet email a month — new guides, new partner hubs, and small
            updates from the people building this. No noise, easy to leave.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-2 max-w-md">
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email address"
              className="flex-1 h-12 rounded-full bg-white/5 border border-white/10 px-5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#7BAE7F]/50 focus:ring-2 focus:ring-[#7BAE7F]/20 transition" />
            
            <Button
              type="submit"
              className="h-12 rounded-full bg-[#7BAE7F] hover:bg-[#7BAE7F]/90 text-[#1B1F1D] px-6 text-sm font-medium group">
              
              Join the mailing list
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </form>

          <p className="font-mono text-[10px] text-[#66706A] mt-4">
            We never share your email. Unsubscribe with a single click.
          </p>
        </div>
      </div>
    </section>);

}