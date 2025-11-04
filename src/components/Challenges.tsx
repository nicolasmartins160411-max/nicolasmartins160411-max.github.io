import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useFitGodStore } from '@/store/fitgodStore';
import { CHALLENGES, getChallengeById } from '@/data/motivation';
import { Trophy, Target, Calendar, Crown, Zap, Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Challenges: React.FC = () => {
  const { activeChallenges, completedChallenges, startChallenge, completeChallenge } = useFitGodStore();
  const { toast } = useToast();

  const handleStartChallenge = (challengeId: string) => {
    startChallenge(challengeId);
    toast({
      title: "Desafio Iniciado!",
      description: "Você aceitou o desafio. Hora de mostrar sua força!",
    });
  };

  const handleCompleteChallenge = (challengeId: string) => {
    completeChallenge(challengeId);
    toast({
      title: "DESAFIO CONCLUÍDO!",
      description: "Parabéns, guerreiro! Você conquistou mais uma vitória!",
    });
  };

  const getDurationIcon = (duration: number) => {
    if (duration <= 7) return <Zap className="h-4 w-4" />;
    if (duration <= 15) return <Target className="h-4 w-4" />;
    return <Crown className="h-4 w-4" />;
  };

  const getDurationColor = (duration: number) => {
    if (duration <= 7) return 'text-green-500';
    if (duration <= 15) return 'text-yellow-500';
    return 'text-primary';
  };

  return (
    <div className="space-y-6">
      <Card className="fitgod-premium-border">
        <CardHeader>
          <CardTitle className="text-fitgod-lg fitgod-text-gradient">
            DESAFIOS FITGOD
          </CardTitle>
          <p className="text-motivation">PROVE SEU VALOR. CONQUISTE SUA TRANSFORMAÇÃO.</p>
        </CardHeader>
      </Card>

      {/* Desafios Ativos */}
      {activeChallenges.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-fitgod-md flex items-center gap-2">
            <Flame className="h-6 w-6 text-primary" />
            Desafios Ativos
          </h2>
          
          <div className="grid gap-4">
            {activeChallenges.map((challengeId) => {
              const challenge = getChallengeById(challengeId);
              if (!challenge) return null;

              return (
                <Card key={challengeId} className="fitgod-premium-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {getDurationIcon(challenge.duration)}
                          {challenge.name}
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">{challenge.description}</p>
                      </div>
                      <Badge variant="outline" className={`flex items-center gap-1 ${getDurationColor(challenge.duration)}`}>
                        <Calendar className="h-3 w-3" />
                        {challenge.duration} dias
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progresso simulado - em uma implementação real, seria baseado nos dados do usuário */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>3/{challenge.duration} dias</span>
                      </div>
                      <Progress value={(3 / challenge.duration) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Objetivos:</h4>
                      <ul className="space-y-1">
                        {challenge.goals.map((goal, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm font-semibold text-primary">🏆 {challenge.reward}</p>
                    </div>

                    <Button 
                      variant="gold" 
                      onClick={() => handleCompleteChallenge(challengeId)}
                      className="w-full"
                    >
                      MARCAR COMO CONCLUÍDO
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Desafios Disponíveis */}
      <div className="space-y-4">
        <h2 className="text-fitgod-md flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          Desafios Disponíveis
        </h2>
        
        <div className="grid gap-4">
          {CHALLENGES.filter(challenge => 
            !activeChallenges.includes(challenge.id) && 
            !completedChallenges.includes(challenge.id)
          ).map((challenge) => (
            <Card key={challenge.id} className="fitgod-card hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getDurationIcon(challenge.duration)}
                      {challenge.name}
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">{challenge.description}</p>
                  </div>
                  <Badge variant="outline" className={`flex items-center gap-1 ${getDurationColor(challenge.duration)}`}>
                    <Calendar className="h-3 w-3" />
                    {challenge.duration} dias
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Objetivos:</h4>
                  <ul className="space-y-1">
                    {challenge.goals.map((goal, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-semibold text-primary">🏆 {challenge.reward}</p>
                </div>

                <Button 
                  variant="warrior" 
                  onClick={() => handleStartChallenge(challenge.id)}
                  className="w-full"
                >
                  ACEITAR DESAFIO
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Desafios Concluídos */}
      {completedChallenges.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-fitgod-md flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            Desafios Concluídos
          </h2>
          
          <div className="grid gap-4">
            {completedChallenges.map((challengeId) => {
              const challenge = getChallengeById(challengeId);
              if (!challenge) return null;

              return (
                <Card key={challengeId} className="fitgod-card border-primary/30">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-primary" />
                          {challenge.name}
                          <Badge variant="outline" className="text-primary border-primary">
                            CONCLUÍDO
                          </Badge>
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">{challenge.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm font-semibold text-primary">🏆 {challenge.reward} - CONQUISTADO!</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Estado vazio */}
      {activeChallenges.length === 0 && completedChallenges.length === 0 && (
        <Card className="fitgod-card">
          <CardContent className="p-8 text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-semibold">Nenhum desafio ativo</p>
            <p className="text-muted-foreground">Aceite um desafio e prove sua determinação!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};