
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';

interface AddPelmenButtonsProps {
  onAddPelmeni: (count: number) => void;
  onAddPelmenByWeight: (grams: number) => void;
}

export const AddPelmenButtons: React.FC<AddPelmenButtonsProps> = ({
  onAddPelmeni,
  onAddPelmenByWeight
}) => {
  return (
    <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Добавить пельмени
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={() => onAddPelmeni(1)}
          className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="mr-2 h-6 w-6" />
          +1 Пельмень 🥟
        </Button>
        
        <div className="grid grid-cols-3 gap-3">
          <Button 
            onClick={() => onAddPelmenByWeight(200)}
            variant="outline"
            className="h-14 border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-400 transition-all duration-200 flex flex-col justify-center"
          >
            <span className="text-lg font-semibold">200г</span>
            <span className="text-xs text-muted-foreground">~20 шт</span>
          </Button>
          <Button 
            onClick={() => onAddPelmenByWeight(400)}
            variant="outline"
            className="h-14 border-2 border-red-200 hover:bg-red-50 hover:border-red-400 transition-all duration-200 flex flex-col justify-center"
          >
            <span className="text-lg font-semibold">400г</span>
            <span className="text-xs text-muted-foreground">~40 шт</span>
          </Button>
          <Button 
            onClick={() => onAddPelmenByWeight(1000)}
            variant="outline"
            className="h-14 border-2 border-pink-200 hover:bg-pink-50 hover:border-pink-400 transition-all duration-200 flex flex-col justify-center"
          >
            <span className="text-lg font-semibold">1кг</span>
            <span className="text-xs text-muted-foreground">~100 шт</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
