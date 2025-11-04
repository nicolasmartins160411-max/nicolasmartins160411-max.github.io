import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useFitGodStore } from '@/store/fitgodStore';
import { getRandomQuote } from '@/data/motivation';
import { Flame, Droplets, Footprints, Zap, Crown, Target } from 'lucide-react';
export const Dashboard: React.FC = () => {
  const {
    profile,
    getCurrentDayProgress
  } = useFitGodStore();
  const progress = getCurrentDayProgress();
  const motivationalQuote = getRandomQuote();
  if (!profile) return null;
  const calorieProgress = progress.calories / profile.dailyGoals.calories * 100;
  const proteinProgress = progress.protein / profile.dailyGoals.protein * 100;
  const waterProgress = progress.water / profile.dailyGoals.water * 100;
  const stepsProgress = progress.steps / profile.dailyGoals.steps * 100;
  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-primary';
    if (percentage >= 80) return 'bg-yellow-500';
    if (percentage >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };
  return <div className="space-y-6">
      {/* Header com motivação */}
      <Card className="fitgod-premium-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-fitgod-xl">Olá, {profile.name}!</h1>
              <p className="text-motivation mt-2">{motivationalQuote}</p>
            </div>
            <Crown className="lucide lucide-crown h-12 w-12 text-primary fitgod-glow bg-[rgba(222,115,0,0.01)]" />
          </div>
        </CardContent>
      </Card>

      {/* Metas Diárias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calorias */}
        <Card className="fitgod-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Flame className="h-5 w-5 text-orange-500" />
              Calorias
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                {progress.calories.toFixed(0)}
              </span>
              <span className="text-sm text-muted-foreground">
                / {profile.dailyGoals.calories}
              </span>
            </div>
            <Progress value={Math.min(calorieProgress, 100)} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {calorieProgress >= 100 ? 'META ATINGIDA!' : `${(100 - calorieProgress).toFixed(0)}% restante`}
            </p>
          </CardContent>
        </Card>

        {/* Proteína */}
        <Card className="fitgod-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="h-5 w-5 text-primary" />
              Proteína
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                {progress.protein.toFixed(0)}g
              </span>
              <span className="text-sm text-muted-foreground">
                / {profile.dailyGoals.protein}g
              </span>
            </div>
            <Progress value={Math.min(proteinProgress, 100)} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {proteinProgress >= 100 ? 'WARRIOR STATUS!' : `${(profile.dailyGoals.protein - progress.protein).toFixed(0)}g restante`}
            </p>
          </CardContent>
        </Card>

        {/* Água */}
        <Card className="fitgod-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Droplets className="h-5 w-5 text-blue-500" />
              Água
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                {(progress.water / 1000).toFixed(1)}L
              </span>
              <span className="text-sm text-muted-foreground">
                / {(profile.dailyGoals.water / 1000).toFixed(1)}L
              </span>
            </div>
            <Progress value={Math.min(waterProgress, 100)} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {waterProgress >= 100 ? 'HIDRATADO!' : `${((profile.dailyGoals.water - progress.water) / 1000).toFixed(1)}L restante`}
            </p>
          </CardContent>
        </Card>

        {/* Passos */}
        <Card className="fitgod-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Footprints className="h-5 w-5 text-green-500" />
              Passos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                {progress.steps.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                / {profile.dailyGoals.steps.toLocaleString()}
              </span>
            </div>
            <Progress value={Math.min(stepsProgress, 100)} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {stepsProgress >= 100 ? 'ATIVO!' : `${(profile.dailyGoals.steps - progress.steps).toLocaleString()} restante`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Resumo Nutricional */}
      <Card className="fitgod-premium-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Resumo Nutricional de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{progress.calories.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">Calorias</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{progress.protein.toFixed(0)}g</p>
              <p className="text-sm text-muted-foreground">Proteína</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{progress.carbs.toFixed(0)}g</p>
              <p className="text-sm text-muted-foreground">Carboidratos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{progress.fats.toFixed(0)}g</p>
              <p className="text-sm text-muted-foreground">Gorduras</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Refeições de Hoje */}
      {progress.foodEntries.length > 0 && <Card className="fitgod-card">
          <CardHeader>
            <CardTitle>Últimas Refeições</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {progress.foodEntries.slice(-3).map(entry => <div key={entry.id} className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <div>
                    <p className="font-semibold">{entry.foodName}</p>
                    <p className="text-sm text-muted-foreground">
                      {entry.quantity}g • {entry.meal}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{entry.calories.toFixed(0)} kcal</p>
                    <p className="text-sm text-muted-foreground">{entry.protein.toFixed(0)}g proteína</p>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>}
    </div>;
};