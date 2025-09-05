import React, { useState, useRef } from 'react';

interface ParticleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ParticleButton: React.FC<ParticleButtonProps> = ({
  children,
  className = '',
  onClick,
  disabled = false
}) => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createParticles = (e: React.MouseEvent) => {
    if (disabled) return;
    
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20
    }));

    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);

    onClick?.();
  };

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onClick={createParticles}
      disabled={disabled}
    >
      {children}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: 'translate(-50%, -50%)',
            animation: 'particleFloat 1s ease-out forwards'
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full opacity-80" />
        </div>
      ))}

      <style>{`
        @keyframes particleFloat {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -150%) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};
