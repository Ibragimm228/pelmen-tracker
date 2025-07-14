
import React from 'react';
import { TrendingUp, Award, Zap, Calendar } from 'lucide-react';
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
  return (
    <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-600" />
          Статистика
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
            {getFunnyComment(stats.allTime.count)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="periods" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="periods">По периодам</TabsTrigger>
            <TabsTrigger value="achievements">Достижения</TabsTrigger>
            <TabsTrigger value="fun">Веселые факты</TabsTrigger>
          </TabsList>
          
          <TabsContent value="periods" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-200">
                  <span className="font-semibold">Вчера</span>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-sm">{stats.yesterday.count} шт</Badge>
                    <div className="text-xs text-muted-foreground mt-1">{stats.yesterday.calories} кал</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200">
                  <span className="font-semibold">Неделя</span>
                  <div className="text-right">
                    <Badge className="bg-blue-500 text-sm">{stats.week.count} шт</Badge>
                    <div className="text-xs text-muted-foreground mt-1">{stats.week.calories} кал</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-200">
                  <span className="font-semibold">Месяц</span>
                  <div className="text-right">
                    <Badge className="bg-green-500 text-sm">{stats.month.count} шт</Badge>
                    <div className="text-xs text-muted-foreground mt-1">{stats.month.calories} кал</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-200">
                  <span className="font-semibold">Год</span>
                  <div className="text-right">
                    <Badge className="bg-purple-500 text-sm">{stats.year.count} шт</Badge>
                    <div className="text-xs text-muted-foreground mt-1">{stats.year.calories} кал</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl hover:from-orange-100 hover:to-red-100 transition-all duration-200">
                  <span className="font-semibold">Всё время</span>
                  <div className="text-right">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-sm">{stats.allTime.count} шт</Badge>
                    <div className="text-xs text-muted-foreground mt-1">{stats.allTime.calories} кал</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Средний день</span>
                  </div>
                  <div className="text-sm text-yellow-700 font-medium">
                    {entriesLength > 0 ? Math.round(stats.allTime.count / entriesLength) : 0} пельменей
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-6 w-6 text-yellow-600" />
                  <span className="font-bold text-yellow-800 text-lg">Рекорд дня</span>
                </div>
                <div className="text-3xl font-bold text-yellow-700">
                  {dailyRecord} пельменей 🏆
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl border border-pink-200">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-6 w-6 text-pink-600" />
                  <span className="font-bold text-pink-800 text-lg">Серия дней</span>
                </div>
                <div className="text-3xl font-bold text-pink-700">
                  {streak} {streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'} 🔥
                </div>
              </div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
              <div className="text-xl font-bold text-indigo-800 mb-3">
                Уровень Пельменного Мастера
              </div>
              <div className="text-4xl font-bold text-indigo-600 mb-3">
                {stats.allTime.count < 100 ? '🐣 Новичок' : 
                 stats.allTime.count < 500 ? '😊 Любитель' :
                 stats.allTime.count < 1000 ? '🤤 Эксперт' : 
                 stats.allTime.count < 5000 ? '👨‍🍳 Мастер' : '🌟 Легенда'}
              </div>
              <div className="text-sm text-indigo-600">
                {stats.allTime.count}/5000 для статуса "Легенда"
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fun" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl">
                <div className="text-lg font-semibold text-cyan-800 mb-2">🏃‍♂️ Сжечь калории</div>
                <div className="text-sm text-cyan-700">
                  Нужно пробежать ~{Math.round(stats.allTime.calories / 10)} минут, чтобы сжечь все съеденные калории!
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl">
                <div className="text-lg font-semibold text-violet-800 mb-2">⏰ Время на еду</div>
                <div className="text-sm text-violet-700">
                  Примерно {Math.round(stats.allTime.count * 0.2)} минут потрачено на поедание пельменей!
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                <div className="text-lg font-semibold text-rose-800 mb-2">🎯 До цели</div>
                <div className="text-sm text-rose-700">
                  Еще {Math.max(0, 1000 - stats.allTime.count)} пельменей до статуса "Эксперт"!
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                <div className="text-lg font-semibold text-emerald-800 mb-2">📏 Длина</div>
                <div className="text-sm text-emerald-700">
                  {stats.allTime.count > 0 
                    ? `Если сложить все пельмени в ряд: ${Math.round(stats.allTime.count * 3)} см!`
                    : "Первый пельмень всегда самый важный! 🥟"
                  }
                </div>
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl">
              <div className="text-2xl mb-2">🎲 Случайный факт</div>
              <div className="text-lg text-amber-800">
                {stats.allTime.count > 0 
                  ? `За все время ты съел пельменей на вес примерно ${Math.round(stats.allTime.count / 10)} кг!`
                  : "Начни свое пельменное путешествие прямо сейчас! 🥟"
                }
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
