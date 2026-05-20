import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, BookOpen, ScanLine } from 'lucide-react';
export function BottomNav() {
  const location = useLocation();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/40 bg-background/80 backdrop-blur-md pb-safe">
      <div className="flex h-16 items-center justify-around px-4">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 p-2 ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
          
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        <Link
          to="/map"
          className={`flex flex-col items-center gap-1 p-2 ${location.pathname.includes('/map') ? 'text-primary' : 'text-muted-foreground'}`}>
          
          <Map className="h-5 w-5" />
          <span className="text-[10px] font-medium">Map</span>
        </Link>

        <div className="relative -top-5 flex justify-center">
          <Link
            to="/scan"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-4 ring-background transition-transform active:scale-95">
            
            <ScanLine className="h-6 w-6" />
          </Link>
        </div>

        <Link
          to="/learn"
          className={`flex flex-col items-center gap-1 p-2 ${location.pathname.includes('/learn') ? 'text-primary' : 'text-muted-foreground'}`}>
          
          <BookOpen className="h-5 w-5" />
          <span className="text-[10px] font-medium">Learn</span>
        </Link>

        <Link
          to="/"
          className="flex flex-col items-center gap-1 p-2 text-muted-foreground">
          
          <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
            U
          </div>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
    </div>);

}