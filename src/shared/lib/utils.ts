
import { FUNNY_COMMENTS, MOTIVATIONAL_PHRASES } from './constants';

export const getFunnyComment = (count: number, isDaily = false) => {
  const comments = isDaily ? FUNNY_COMMENTS.daily : FUNNY_COMMENTS.total;
  
  if (isDaily) {
    if (count === 0) return comments[0];
    if (count <= 5) return comments[5];
    if (count <= 15) return comments[15];
    if (count <= 30) return comments[30];
    if (count <= 50) return comments[50];
    return "ТЫ ПЕЛЬМЕННЫЙ БОГ! 🚀";
  } else {
    if (count <= 10) return comments[10];
    if (count <= 50) return comments[50];
    if (count <= 100) return comments[100];
    if (count <= 300) return comments[300];
    if (count <= 500) return comments[500];
    if (count <= 1000) return comments[1000];
    return "ЛЕГЕНДА ПЕЛЬМЕНЕЙ 🌟";
  }
};

export const getMotivationalPhrase = () => {
  return MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)];
};

export const playSound = (type: 'success' | 'achievement' | 'milestone') => {
  console.log(`🔊 Playing ${type} sound effect!`);
};
