
import React from 'react';
import { TrendingUp, Award, Target, Calendar, Activity, Trophy, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs';
import { Stats } from '@/shared/types/pelmen';
import { getFunnyComment } from '@/shared/lib/utils';

interface StatisticsProps {
  stats: Stats;
  dailyRecord: number;
  streak: number;
  entriesLength: number;
}

export const Statistics: React.FC<StatisticsProps> = ({
  stats,
  dailyRecord,
  streak,
  entriesLength
}) => {
  const averageDaily = entriesLength > 0 ? Math.round(stats.allTime.count / entriesLength) : 0;
  
  const getMasterLevel = (count: number) => {
    if (count < 100) return { level: 'Новичок', progress: count, next: 100, icon: '🌱', color: 'text-green-500' };
    if (count < 500) return { level: 'Любитель', progress: count - 100, next: 400, icon: '🍃', color: 'text-blue-500' };
    if (count < 1000) return { level: 'Эксперт', progress: count - 500, next: 500, icon: '⭐', color: 'text-purple-500' };
    if (count < 5000) return { level: 'Мастер', progress: count - 1000, next: 4000, icon: '🏆', color: 'text-yellow-500' };
    return { level: 'Легенда', progress: count - 5000, next: 0, icon: '👑', color: 'text-orange-500' };
  };

  const masterInfo = getMasterLevel(stats.allTime.count);

  return (
    <Card className="card-modern">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold">Аналитика</span>
          </CardTitle>
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
            {getFunnyComment(stats.allTime.count)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/50 rounded-lg">
            <TabsTrigger value="overview" className="rounded-md">Обзор</TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-md">Достижения</TabsTrigger>
            <TabsTrigger value="insights" className="rounded-md">Инсайты</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-2 p-4 rounded-lg bg-muted/30 hover-lift">
                <Calendar className="h-5 w-5 text-muted-foreground mx-auto" />
                <div className="text-2xl font-bold number-display">{stats.yesterday.count}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Вчера</div>
              </div>
              
              <div className="text-center space-y-2 p-4 rounded-lg bg-primary/5 hover-lift">
                <TrendingUp className="h-5 w-5 text-primary mx-auto" />
                <div className="text-2xl font-bold number-display text-primary">{stats.week.count}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Неделя</div>
              </div>
              
              <div className="text-center space-y-2 p-4 rounded-lg bg-accent/5 hover-lift">
                <Target className="h-5 w-5 text-accent mx-auto" />
                <div className="text-2xl font-bold number-display text-accent">{stats.month.count}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Месяц</div>
              </div>
              
              <div className="text-center space-y-2 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 hover-lift">
                <Trophy className="h-5 w-5 text-gradient-primary mx-auto" />
                <div className="text-2xl font-bold number-display text-gradient-primary">{stats.allTime.count}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Всего</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground mb-4">Детальная статистика</h4>
              <div className="grid gap-3">
                {[
                  { label: 'Вчера', count: stats.yesterday.count, calories: stats.yesterday.calories, color: 'border-l-gray-400' },
                  { label: 'За неделю', count: stats.week.count, calories: stats.week.calories, color: 'border-l-primary' },
                  { label: 'За месяц', count: stats.month.count, calories: stats.month.calories, color: 'border-l-accent' },
                  { label: 'За год', count: stats.year.count, calories: stats.year.calories, color: 'border-l-purple-500' },
                  { label: 'Всё время', count: stats.allTime.count, calories: stats.allTime.calories, color: 'border-l-gradient-primary' }
                ].map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${item.color} bg-card hover-lift`}>
                    <span className="font-medium text-card-foreground">{item.label}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-right">
                        <div className="font-bold number-display">{item.count} шт</div>
                        <div className="text-muted-foreground">{item.calories} кал</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6 mt-6">
            <Card className="card-modern border border-primary/20">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="text-4xl">{masterInfo.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Уровень: {masterInfo.level}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {masterInfo.next > 0 ? `Еще ${masterInfo.next - masterInfo.progress} до следующего уровня` : 'Максимальный уровень достигнут!'}
                    </p>
                  </div>
                  
                  {masterInfo.next > 0 && (
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                          style={{ width: `${(masterInfo.progress / masterInfo.next) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {masterInfo.progress}/{masterInfo.next}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="card-modern border border-yellow-200 bg-gradient-to-br from-yellow-50/50 to-orange-50/50">
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-yellow-800 mb-2">Рекорд дня</h4>
                  <div className="text-3xl font-black number-display text-yellow-700">
                    {dailyRecord}
                  </div>
                  <p className="text-sm text-yellow-600 mt-1">пельменей за день</p>
                </CardContent>
              </Card>
              
              <Card className="card-modern border border-orange-200 bg-gradient-to-br from-orange-50/50 to-red-50/50">
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-orange-800 mb-2">Серия</h4>
                  <div className="text-3xl font-black number-display text-orange-700">
                    {streak}
                  </div>
                  <p className="text-sm text-orange-600 mt-1">
                    {streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'} подряд
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="card-modern border border-teal-200 bg-gradient-to-br from-teal-50/30 to-cyan-50/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="h-6 w-6 text-teal-600" />
                    <h4 className="text-lg font-bold text-teal-800">Активность</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Средний день:</span>
                      <span className="font-semibold number-display">{averageDaily} шт</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Время на еду:</span>
                      <span className="font-semibold">{Math.round(stats.allTime.count * 0.2)} мин</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-modern border border-purple-200 bg-gradient-to-br from-purple-50/30 to-indigo-50/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-purple-600" />
                    <h4 className="text-lg font-bold text-purple-800">Калории</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Всего калорий:</span>
                      <span className="font-semibold number-display">{stats.allTime.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Время бега:</span>
                      <span className="font-semibold">{Math.round(stats.allTime.calories / 10)} мин</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-modern border border-rose-200 bg-gradient-to-br from-rose-50/30 to-pink-50/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-6 w-6 text-rose-600" />
                    <h4 className="text-lg font-bold text-rose-800">Цели</h4>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    До статуса "Эксперт" осталось:{' '}
                    <span className="font-bold text-rose-700 number-display">
                      {Math.max(0, 1000 - stats.allTime.count)}
                    </span>{' '}
                    пельменей
                  </div>
                </CardContent>
              </Card>

              <Card className="card-modern border border-emerald-200 bg-gradient-to-br from-emerald-50/30 to-green-50/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="h-6 w-6 text-emerald-600" />
                    <h4 className="text-lg font-bold text-emerald-800">Факты</h4>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stats.allTime.count > 0 
                      ? `Вес всех пельменей: ~${Math.round(stats.allTime.count / 10)} кг`
                      : "Начните свое пельменное путешествие!"
                    }
                  </div>
                </CardContent>
              </Card>
            </div>

            {stats.allTime.count > 0 && (
              <Card className="card-modern bg-gradient-to-br from-amber-50/50 to-yellow-50/50 border border-amber-200">
                <CardContent className="p-8 text-center">
                  <div className="text-3xl mb-4">📊</div>
                  <h4 className="text-xl font-bold text-amber-800 mb-4">Интересная визуализация</h4>
                  <div className="space-y-4 text-sm text-amber-700">
                    <p>
                      Если сложить все ваши пельмени в ряд, получится линия длиной{' '}
                      <span className="font-bold">{Math.round(stats.allTime.count * 3)} см</span>!
                    </p>
                    <div className="h-2 bg-amber-200 rounded-full overflow-hidden max-w-xs mx-auto">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                        style={{ width: `${Math.min((stats.allTime.count / 1000) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Прогресс к километру пельменей
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
