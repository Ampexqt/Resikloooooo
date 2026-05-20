import React from 'react';
import { Leaf } from 'lucide-react';
export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-primary">
              <Leaf className="h-4 w-4" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight">
              RESIKLO
            </span>
          </div>
          <p className="text-sm text-secondary-foreground max-w-xs">
            An AI decision layer for your waste. Think before you throw.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Platform
          </h4>
          <ul className="space-y-2 text-sm text-secondary-foreground">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                AI Scan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Disposal Map
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Resources
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-secondary-foreground">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Impact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Legal
          </h4>
          <ul className="space-y-2 text-sm text-secondary-foreground">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t border-border/40 text-center md:text-left text-xs text-muted-foreground">
        © {new Date().getFullYear()} RESIKLO. All rights reserved.
      </div>
    </footer>);

}