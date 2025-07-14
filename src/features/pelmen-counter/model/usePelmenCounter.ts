
import { CALORIES_PER_PELMEN, PELMENI_PER_100G } from '@/shared/lib/constants';
import { getFunnyComment, getMotivationalPhrase, playSound } from '@/shared/lib/utils';
import { toast } from '@/hooks/use-toast';

export const usePelmenCounter = (
  entries: any[],
  setEntries: (fn: (prev: any[]) => any[]) => void,
  todayCount: number,
  setTodayCount: (count: number) => void,
  todayCalories: number,
  setTodayCalories: (calories: number) => void,
  triggerConfetti: () => void
) => {
  const addPelmeni = (count: number) => {
    const today = new Date().toDateString();
    const calories = count * CALORIES_PER_PELMEN;
    
    setEntries(prev => {
      const existingEntryIndex = prev.findIndex(entry => entry.date === today);
      
      if (existingEntryIndex >= 0) {
        const updated = [...prev];
        updated[existingEntryIndex] = {
          ...updated[existingEntryIndex],
          count: updated[existingEntryIndex].count + count,
          calories: updated[existingEntryIndex].calories + calories
        };
        return updated;
      } else {
        return [...prev, { date: today, count, calories }];
      }
    });

    const newTodayCount = todayCount + count;
    const newTodayCalories = todayCalories + calories;
    
    setTodayCount(newTodayCount);
    setTodayCalories(newTodayCalories);
    
    if (newTodayCount % 10 === 0 && newTodayCount > 0) {
      playSound('milestone');
      triggerConfetti();
      toast({
        title: "🎉 КРУГЛОЕ ЧИСЛО!",
        description: `${newTodayCount} пельменей сегодня! ${getFunnyComment(newTodayCount, true)}`,
      });
    } else if (count >= 20) {
      playSound('achievement');
      toast({
        title: "🔥 БОЛЬШАЯ ПОРЦИЯ!",
        description: `+${count} пельменей разом! Респект! 👏`,
      });
    } else {
      playSound('success');
      toast({
        title: "Пельмени добавлены! 🥟",
        description: `+${count} пельменей (+${calories} калорий)`,
      });
    }

    if (Math.random() < 0.3) {
      setTimeout(() => {
        toast({
          title: "💪 Мотивация",
          description: getMotivationalPhrase(),
        });
      }, 1500);
    }
  };

  const addPelmenByWeight = (grams: number) => {
    const count = Math.round((grams / 100) * PELMENI_PER_100G);
    addPelmeni(count);
  };

  return { addPelmeni, addPelmenByWeight };
};
