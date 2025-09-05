import React, { useEffect, useState } from 'react';
import { X, Heart, Star } from 'lucide-react';
import { Card, CardContent } from '@/shared/ui/Card';

interface MotivationToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

export const MotivationToast: React.FC<MotivationToastProps> = ({
  show,
  message,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show && !isVisible) return null;

  return (
    <div className={`fixed top-6 right-6 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <Card className="card-modern bg-gradient-to-r from-primary/90 to-accent/90 text-primary-foreground border-0 shadow-strong max-w-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <div className="p-2 bg-white/20 rounded-full">
                <Heart className="h-4 w-4 animate-pulse" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-relaxed">
                {message}
              </p>
            </div>
            
            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute -top-1 -right-1">
            <Star className="h-3 w-3 text-white/40 animate-ping" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
