import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFitGodStore, UserProfile } from '@/store/fitgodStore';
import { Crown, Target, Zap } from 'lucide-react';

interface ProfileSetupProps {
  onComplete: () => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const { setProfile, calculateCalorieNeeds, calculateProteinNeeds } = useFitGodStore();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    activityLevel: '',
    goal: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: UserProfile = {
      name: formData.name,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseInt(formData.height),
      gender: formData.gender as 'male' | 'female',
      activityLevel: formData.activityLevel as UserProfile['activityLevel'],
      goal: formData.goal as UserProfile['goal'],
      dailyGoals: {
        calories: 0,
        protein: 0,
        water: 3000,
        steps: 10000
      }
    };

    // Calculate daily goals
    profile.dailyGoals.calories = calculateCalorieNeeds(profile);
    profile.dailyGoals.protein = calculateProteinNeeds(profile);

    setProfile(profile);
    onComplete();
  };

  const isFormValid = Object.values(formData).every(value => value !== '');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl fitgod-premium-border">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Crown className="h-16 w-16 text-primary fitgod-glow" />
          </div>
          <CardTitle className="text-fitgod-xl fitgod-text-gradient">
            BEM-VINDO AO FITGOD
          </CardTitle>
          <p className="text-muted-foreground text-lg">
            Configure seu perfil para dominar seus objetivos
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-fitgod-md">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Seu nome de guerra"
                  className="bg-input border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="text-fitgod-md">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Anos"
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-fitgod-md">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  placeholder="70.5"
                  className="bg-input border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height" className="text-fitgod-md">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  placeholder="175"
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-fitgod-md">Gênero</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Selecione seu gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-fitgod-md">Nível de Atividade</Label>
              <Select value={formData.activityLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, activityLevel: value }))}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Qual seu nível de atividade?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentário (sem exercício)</SelectItem>
                  <SelectItem value="light">Leve (1-3 dias/semana)</SelectItem>
                  <SelectItem value="moderate">Moderado (3-5 dias/semana)</SelectItem>
                  <SelectItem value="active">Ativo (6-7 dias/semana)</SelectItem>
                  <SelectItem value="very_active">Muito Ativo (2x por dia)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-fitgod-md">Objetivo Principal</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant={formData.goal === 'lose_weight' ? 'premium' : 'outline'}
                  className="h-20 flex-col gap-2"
                  onClick={() => setFormData(prev => ({ ...prev, goal: 'lose_weight' }))}
                >
                  <Target className="h-6 w-6" />
                  <span className="text-sm font-bold">QUEIMAR GORDURA</span>
                </Button>
                
                <Button
                  type="button"
                  variant={formData.goal === 'maintain' ? 'premium' : 'outline'}
                  className="h-20 flex-col gap-2"
                  onClick={() => setFormData(prev => ({ ...prev, goal: 'maintain' }))}
                >
                  <Zap className="h-6 w-6" />
                  <span className="text-sm font-bold">MANTER FORMA</span>
                </Button>
                
                <Button
                  type="button"
                  variant={formData.goal === 'gain_muscle' ? 'premium' : 'outline'}
                  className="h-20 flex-col gap-2"
                  onClick={() => setFormData(prev => ({ ...prev, goal: 'gain_muscle' }))}
                >
                  <Crown className="h-6 w-6" />
                  <span className="text-sm font-bold">GANHAR MÚSCULO</span>
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full text-lg font-black"
              disabled={!isFormValid}
            >
              INICIAR JORNADA FITGOD
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};