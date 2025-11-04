import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFitGodStore } from '@/store/fitgodStore';
import { Droplets, Footprints, Scale, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const QuickActions: React.FC = () => {
  const { updateWater, updateSteps, updateWeight, getCurrentDayProgress, profile } = useFitGodStore();
  const { toast } = useToast();
  const [waterAmount, setWaterAmount] = useState('250');
  const [stepsInput, setStepsInput] = useState('');
  const [weightInput, setWeightInput] = useState('');

  const progress = getCurrentDayProgress();

  const handleAddWater = (amount: number) => {
    updateWater(amount);
    toast({
      title: "Água adicionada!",
      description: `+${amount}ml de água registrados`,
    });
  };

  const handleUpdateSteps = () => {
    const steps = parseInt(stepsInput);
    if (steps > 0) {
      updateSteps(steps);
      toast({
        title: "Passos atualizados!",
        description: `${steps.toLocaleString()} passos registrados`,
      });
      setStepsInput('');
    }
  };

  const handleUpdateWeight = () => {
    const weight = parseFloat(weightInput);
    if (weight > 0) {
      updateWeight(weight);
      toast({
        title: "Peso registrado!",
        description: `Peso atual: ${weight}kg`,
      });
      setWeightInput('');
    }
  };

  const waterProgress = profile ? (progress.water / profile.dailyGoals.water) * 100 : 0;
  const stepsProgress = profile ? (progress.steps / profile.dailyGoals.steps) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card className="fitgod-premium-border">
        <CardHeader>
          <CardTitle className="text-fitgod-lg fitgod-text-gradient">
            AÇÕES RÁPIDAS
          </CardTitle>
          <p className="text-motivation">REGISTRE SEU PROGRESSO AGORA</p>
        </CardHeader>
      </Card>

      {/* Água */}
      <Card className="fitgod-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            Hidratação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              {(progress.water / 1000).toFixed(1)}L
            </span>
            <span className="text-sm text-muted-foreground">
              / {profile ? (profile.dailyGoals.water / 1000).toFixed(1) : '3.0'}L
            </span>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(waterProgress, 100)}%` }}
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddWater(250)}
              className="flex flex-col gap-1 h-16"
            >
              <Plus className="h-4 w-4" />
              <span className="text-xs">250ml</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddWater(500)}
              className="flex flex-col gap-1 h-16"
            >
              <Plus className="h-4 w-4" />
              <span className="text-xs">500ml</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddWater(750)}
              className="flex flex-col gap-1 h-16"
            >
              <Plus className="h-4 w-4" />
              <span className="text-xs">750ml</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddWater(1000)}
              className="flex flex-col gap-1 h-16"
            >
              <Plus className="h-4 w-4" />
              <span className="text-xs">1L</span>
            </Button>
          </div>

          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="ml"
              value={waterAmount}
              onChange={(e) => setWaterAmount(e.target.value)}
              className="flex-1"
            />
            <Button 
              variant="warrior"
              onClick={() => {
                const amount = parseInt(waterAmount);
                if (amount > 0) {
                  handleAddWater(amount);
                  setWaterAmount('250');
                }
              }}
            >
              ADICIONAR
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Passos */}
      <Card className="fitgod-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Footprints className="h-5 w-5 text-green-500" />
            Passos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              {progress.steps.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">
              / {profile ? profile.dailyGoals.steps.toLocaleString() : '10,000'}
            </span>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(stepsProgress, 100)}%` }}
            />
          </div>

          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Número de passos"
              value={stepsInput}
              onChange={(e) => setStepsInput(e.target.value)}
              className="flex-1"
            />
            <Button variant="warrior" onClick={handleUpdateSteps}>
              ATUALIZAR
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Peso */}
      <Card className="fitgod-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Peso Atual
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            {progress.weight ? (
              <div>
                <span className="text-3xl font-bold text-primary">{progress.weight}kg</span>
                <p className="text-sm text-muted-foreground">Registrado hoje</p>
              </div>
            ) : (
              <div>
                <span className="text-lg text-muted-foreground">Peso não registrado hoje</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Input
              type="number"
              step="0.1"
              placeholder="Peso em kg"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="flex-1"
            />
            <Button variant="warrior" onClick={handleUpdateWeight}>
              REGISTRAR
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resumo do Dia */}
      <Card className="fitgod-premium-border">
        <CardHeader>
          <CardTitle>Resumo de Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-2xl font-bold text-primary">{progress.calories.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">Calorias</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-2xl font-bold text-primary">{progress.protein.toFixed(0)}g</p>
              <p className="text-sm text-muted-foreground">Proteína</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};