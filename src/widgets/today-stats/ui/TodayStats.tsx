import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/shared/ui/Card';
import { getFunnyComment } from '@/shared/lib/utils';
import { Clock, Zap } from 'lucide-react';
import { ConfettiCelebration } from '@/components/confetti-celebration';
import { MotivationToast } from '@/components/motivation-toast';

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
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState('');
  
  const currentTime = new Date().toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  useEffect(() => {
    if (todayCount > 0 && todayCount % 5 === 0) {
      const messages = [
        'Отличная работа! Продолжайте в том же духе! 🎉',
        'Вы на правильном пути к своим целям! 💪',
        'Каждый пельмень приближает к успеху! ⭐',
        'Ваша дисциплина впечатляет! 🏆'
      ];
      setMotivationMessage(messages[Math.floor(Math.random() * messages.length)]);
      setShowMotivation(true);
    }
  }, [todayCount]);

  return (
    <>
      <ConfettiCelebration show={showConfetti} />
      <MotivationToast 
        show={showMotivation}
        message={motivationMessage}
        onClose={() => setShowMotivation(false)}
      />
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground">Сегодня</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium number-display">{currentTime}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-primary px-3 py-1 rounded-full bg-primary/10">
              {getFunnyComment(todayCount, true)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className={`card-modern group relative overflow-hidden ${showConfetti ? 'gradient-animated' : ''}`}>
            <CardContent className="p-6 text-center relative z-10">
              <div className="space-y-3">
                <div className="text-5xl font-black number-display text-gradient-primary leading-none">
                  {todayCount}
                </div>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Пельменей
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary/10 animate-float" />
            </CardContent>
          </Card>

          <Card className={`card-modern group relative overflow-hidden ${showConfetti ? 'gradient-animated' : ''}`}>
            <CardContent className="p-6 text-center relative z-10">
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <div className="text-5xl font-black number-display text-gradient-accent leading-none">
                    {todayCalories}
                  </div>
                  <Zap className="h-6 w-6 text-accent/70 mt-1 animate-pulse" />
                </div>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Калорий
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent/10 animate-float" style={{ animationDelay: '1s' }} />
            </CardContent>
          </Card>
        </div>

        <Card className="card-modern">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Прогресс дня</span>
                <span className="text-sm font-medium text-muted-foreground number-display">
                  {Math.min(todayCount, 20)}/20
                </span>
              </div>
              
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-1000 ease-out relative"
                  style={{ width: `${Math.min((todayCount / 20) * 100, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
              
              {todayCount >= 20 && (
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-success bg-success/10 px-3 py-1 rounded-full">
                    🎯 Цель дня достигнута!
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
