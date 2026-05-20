
import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { Button } from '../Button';
export function TopNav() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            RESIKLO
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/scan"
            className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname.includes('/scan') ? 'text-primary' : 'text-secondary-foreground'}`}>
            
            Scan
          </Link>
          <Link
            to="/map"
            className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname.includes('/map') ? 'text-primary' : 'text-secondary-foreground'}`}>
            
            Map
          </Link>
          <Link
            to="/learn"
            className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname.includes('/learn') ? 'text-primary' : 'text-secondary-foreground'}`}>
            
            Learn
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-secondary-foreground transition-colors hover:text-primary">
            
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/scan">
            <Button
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Start Scanning
            </Button>
          </Link>
        </div>
      </div>
    </header>);

}