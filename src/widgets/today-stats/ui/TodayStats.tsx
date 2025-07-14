
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { getFunnyComment } from '@/shared/lib/utils';

interface TodayStatsProps {
  todayCount: number;
  todayCalories: number;
  showConfetti: boolean;
}

export const TodayStats: React.FC<TodayStatsProps> = ({
  todayCount,
  todayCalories,
  showConfetti
}) => {
  return (
    <Card className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white border-0 shadow-2xl">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-3xl font-bold">Сегодня</CardTitle>
        <p className="text-sm opacity-90 font-medium">
          {getFunnyComment(todayCount, true)}
        </p>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-4xl font-bold mb-1">{todayCount}</div>
            <div className="text-sm opacity-90">пельменей</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-4xl font-bold mb-1">{todayCalories}</div>
            <div className="text-sm opacity-90">калорий</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
