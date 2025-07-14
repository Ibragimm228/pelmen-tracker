
import React, { useState } from 'react';
import { usePelmenData } from '@/entities/pelmen/model/usePelmenData';
import { usePelmenCounter } from '@/features/pelmen-counter/model/usePelmenCounter';
import { PelmenHeader } from '@/widgets/pelmen-header/ui/PelmenHeader';
import { TodayStats } from '@/widgets/today-stats/ui/TodayStats';
import { AddPelmenButtons } from '@/features/pelmen-counter/ui/AddPelmenButtons';
import { Statistics } from '@/widgets/statistics/ui/Statistics';

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8">
        <PelmenHeader streak={streak} />
        
        <TodayStats 
          todayCount={todayCount}
          todayCalories={todayCalories}
          showConfetti={showConfetti}
        />

        <AddPelmenButtons 
          onAddPelmeni={addPelmeni}
          onAddPelmenByWeight={addPelmenByWeight}
        />

        <Statistics 
          stats={stats}
          dailyRecord={dailyRecord}
          streak={streak}
          entriesLength={entries.length}
        />
      </div>
    </div>
  );
};

export default Index;
