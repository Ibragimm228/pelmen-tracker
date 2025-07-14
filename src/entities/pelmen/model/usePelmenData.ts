
import { useState, useEffect } from 'react';
import { PelmenEntry, Stats } from '@/shared/types/pelmen';

export const usePelmenData = () => {
  const [entries, setEntries] = useState<PelmenEntry[]>([]);
  const [todayCount, setTodayCount] = useState(0);
  const [todayCalories, setTodayCalories] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedEntries = localStorage.getItem('pelmenEntries');
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      setEntries(parsedEntries);
      updateTodayStats(parsedEntries);
      calculateStreak(parsedEntries);
    }
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('pelmenEntries', JSON.stringify(entries));
    }
  }, [entries]);

  const updateTodayStats = (entriesData: PelmenEntry[]) => {
    const today = new Date().toDateString();
    const todayEntry = entriesData.find(entry => entry.date === today);
    if (todayEntry) {
      setTodayCount(todayEntry.count);
      setTodayCalories(todayEntry.calories);
    }
  };

  const calculateStreak = (entriesData: PelmenEntry[]) => {
    let currentStreak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toDateString();
      
      const entry = entriesData.find(e => e.date === dateStr);
      if (entry && entry.count > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
    setStreak(currentStreak);
  };

  const getStats = (): Stats => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const monthAgo = new Date(now);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    
    const yearAgo = new Date(now);
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);

    const stats: Stats = {
      yesterday: { count: 0, calories: 0 },
      week: { count: 0, calories: 0 },
      month: { count: 0, calories: 0 },
      year: { count: 0, calories: 0 },
      allTime: { count: 0, calories: 0 }
    };

    entries.forEach(entry => {
      const entryDate = new Date(entry.date);
      
      if (entry.date === yesterday.toDateString()) {
        stats.yesterday.count += entry.count;
        stats.yesterday.calories += entry.calories;
      }
      
      if (entryDate >= weekAgo) {
        stats.week.count += entry.count;
        stats.week.calories += entry.calories;
      }
      
      if (entryDate >= monthAgo) {
        stats.month.count += entry.count;
        stats.month.calories += entry.calories;
      }
      
      if (entryDate >= yearAgo) {
        stats.year.count += entry.count;
        stats.year.calories += entry.calories;
      }
      
      stats.allTime.count += entry.count;
      stats.allTime.calories += entry.calories;
    });

    return stats;
  };

  return {
    entries,
    setEntries,
    todayCount,
    setTodayCount,
    todayCalories,
    setTodayCalories,
    streak,
    getStats,
    dailyRecord: Math.max(...entries.map(e => e.count), 0)
  };
};
