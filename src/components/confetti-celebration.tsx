import React, { useEffect, useState } from 'react';

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  emoji: string;
}

interface ConfettiCelebrationProps {
  show: boolean;
  onComplete?: () => void;
}

export const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({ 
  show, 
  onComplete 
}) => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    if (!show) {
      setParticles([]);
      return;
    }

    const emojis = ['🥟', '✨', '🎉', '⭐', '💫', '🌟'];
    const colors = [
      'text-purple-500',
      'text-teal-500',
      'text-indigo-500',
      'text-rose-500',
      'text-amber-500',
      'text-emerald-500'
    ];

    const newParticles: ConfettiParticle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      });
    }
    
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute text-2xl ${particle.color}`}
          style={{
            left: `${particle.x}%`,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            animation: `confettiFall 3s linear forwards`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        >
          {particle.emoji}
        </div>
      ))}
      
      <style>{`
        @keyframes confettiFall {
          to {
            transform: translateY(120vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
