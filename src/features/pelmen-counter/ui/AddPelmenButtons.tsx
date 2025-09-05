import React, { useState } from 'react';
import { Plus, Package, Utensils, ChefHat } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Card, CardContent } from '@/shared/ui/Card';

interface AddPelmenButtonsProps {
  onAddPelmeni: (count: number) => void;
  onAddPelmenByWeight: (grams: number) => void;
}

export const AddPelmenButtons: React.FC<AddPelmenButtonsProps> = ({
  onAddPelmeni,
  onAddPelmenByWeight
}) => {
  const [isClicked, setIsClicked] = useState<string | null>(null);

  const handleClick = (action: () => void, id: string) => {
    setIsClicked(id);
    action();
    setTimeout(() => setIsClicked(null), 200);
  };

  const weightOptions = [
    { 
      weight: 200, 
      count: '~20', 
      icon: Utensils,
      label: 'Порция',
      description: 'Небольшая порция'
    },
    { 
      weight: 400, 
      count: '~40', 
      icon: Package,
      label: 'Упаковка',
      description: 'Стандартная упаковка'
    },
    { 
      weight: 1000, 
      count: '~100', 
      icon: ChefHat,
      label: 'Семейная',
      description: 'Большая порция'
    }
  ];

  return (
    <div className="space-y-6">
      <Button 
        onClick={() => handleClick(() => onAddPelmeni(1), 'single')}
        className={`w-full h-16 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group border-0 rounded-xl ${
          isClicked === 'single' ? 'scale-[0.98]' : ''
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-200">
            <Plus className="h-5 w-5" />
          </div>
          <div className="text-left">
            <div className="text-lg font-semibold">Добавить пельмень</div>
            <div className="text-sm opacity-90">+1 шт</div>
          </div>
        </div>
      </Button>

      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Быстрые порции</h3>
          <p className="text-sm text-muted-foreground">Добавить по весу</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {weightOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.weight}
                onClick={() => handleClick(() => onAddPelmenByWeight(option.weight), `weight-${option.weight}`)}
                variant="outline"
                className={`h-20 border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group rounded-xl ${
                  isClicked === `weight-${option.weight}` ? 'scale-[0.98]' : ''
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <IconComponent className="h-5 w-5 text-primary group-hover:text-primary transition-colors" />
                  <div className="text-center">
                    <div className="text-base font-semibold text-foreground">
                      {option.weight}г
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {option.count} шт
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
