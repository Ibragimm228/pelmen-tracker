
import React from 'react';
import { Utensils, Zap } from 'lucide-react';

interface PelmenHeaderProps {
  streak: number;
}

export const PelmenHeader: React.FC<PelmenHeaderProps> = ({ streak }) => {
  return (
    <div className="text-center space-y-4 mb-8">
      <div className="flex items-center justify-center gap-3">
        <Utensils className="text-orange-600 h-8 w-8" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
          Пельмень-Трекер
        </h1>
        <Utensils className="text-orange-600 h-8 w-8" />
      </div>
      <p className="text-lg text-muted-foreground">
        Отслеживай свои любимые пельмени и калории!
      </p>
      {streak > 0 && (
        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-full px-4 py-2 border border-yellow-200">
          <Zap className="text-yellow-500 h-5 w-5" />
          <span className="text-lg font-semibold text-yellow-700">
            Серия: {streak} {streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'}! 🔥
          </span>
        </div>
      )}
    </div>
  );
};
