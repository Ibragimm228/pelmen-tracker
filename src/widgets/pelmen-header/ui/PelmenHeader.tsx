import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LiveClock } from '@/components/live-clock';

interface PelmenHeaderProps {
  streak: number;
}

export const PelmenHeader: React.FC<PelmenHeaderProps> = ({ streak }) => {
  return (
    <header className="relative">
      <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>
      
      <div className="text-center space-y-8 pt-4">
        <div className="mb-8">
          <LiveClock />
        </div>

        <div className="space-y-6">
          <div className="relative">
            <h1 className="text-6xl md:text-7xl font-black tracking-tight text-gradient-primary leading-tight">
              Пельмень
            </h1>
            <div className="flex items-center justify-center mt-4">
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent w-32" />
              <div className="mx-4 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300">
                <Sparkles className="h-5 w-5 text-primary/60 animate-pulse" />
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent w-32" />
            </div>
          </div>
          
          <p className="text-xl md:text-2xl font-light text-muted-foreground tracking-wide max-w-2xl mx-auto leading-relaxed">
            Элегантный трекер ваших кулинарных моментов
          </p>
        </div>

        {streak > 0 && (
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl glass backdrop-blur-md border border-white/20 hover-lift shadow-soft">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-orange-500/10">
                <Flame className="h-5 w-5 text-orange-500" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black number-display text-foreground/90">
                  {streak}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {streak === 1 ? 'день подряд' : streak < 5 ? 'дня подряд' : 'дней подряд'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
