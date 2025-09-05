import React, { useState } from 'react';
import { usePelmenData } from '@/entities/pelmen/model/usePelmenData';
import { usePelmenCounter } from '@/features/pelmen-counter/model/usePelmenCounter';
import { PelmenHeader } from '@/widgets/pelmen-header/ui/PelmenHeader';
import { TodayStats } from '@/widgets/today-stats/ui/TodayStats';
import { AddPelmenButtons } from '@/features/pelmen-counter/ui/AddPelmenButtons';
import { Statistics } from '@/widgets/statistics/ui/Statistics';
import { AnimatedBackground } from '@/components/animated-background';

const Index = () => {
  const {
    entries,
    setEntries,
    todayCount,
    setTodayCount,
    todayCalories,
    setTodayCalories,
    streak,
    getStats,
    dailyRecord
  } = usePelmenData();

  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const { addPelmeni, addPelmenByWeight } = usePelmenCounter(
    entries,
    setEntries,
    todayCount,
    setTodayCount,
    todayCalories,
    setTodayCalories,
    triggerConfetti
  );

  const stats = getStats();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900" />
      <AnimatedBackground />
      
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
           style={{
             backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
             backgroundSize: '24px 24px'
           }} />
      
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="mb-12 fade-in">
            <PelmenHeader streak={streak} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-8">
              <div className="fade-in stagger-1">
                <TodayStats 
                  todayCount={todayCount}
                  todayCalories={todayCalories}
                  showConfetti={showConfetti}
                />
              </div>
              
              <div className="fade-in stagger-2">
                <AddPelmenButtons 
                  onAddPelmeni={addPelmeni}
                  onAddPelmenByWeight={addPelmenByWeight}
                />
              </div>
            </div>
            
            <div className="lg:col-span-7 fade-in stagger-3">
              <Statistics 
                stats={stats}
                dailyRecord={dailyRecord}
                streak={streak}
                entriesLength={entries.length}
              />
            </div>
          </div>
          
          <footer className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 text-muted-foreground text-sm">
              <div className="w-2 h-2 rounded-full bg-primary/60" />
              <span>Создано с любовью к пельменям @FrontendMania</span>
              <div className="w-2 h-2 rounded-full bg-accent/60" />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
