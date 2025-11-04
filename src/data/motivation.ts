export const MOTIVATIONAL_QUOTES = [
  "Disciplina vence.",
  "Sem desculpa.",
  "Você constrói seu corpo todo dia.",
  "Dor é fraqueza saindo do corpo.",
  "Não existe amanhã. Só existe agora.",
  "Sua única competição é quem você foi ontem.",
  "Resultados não mentem.",
  "Treino pesado, vida leve.",
  "Foco, força, fé.",
  "Guerreiros não desistem.",
  "Cada rep conta.",
  "Transformação não tem pressa, tem constância.",
  "Sua mente desiste antes do seu corpo.",
  "Campeões treinam quando ninguém está vendo.",
  "O impossível é só uma opinião.",
  "Suor hoje, orgulho amanhã.",
  "Você é mais forte do que pensa.",
  "Limites existem apenas na sua mente.",
  "Consistência é a mãe da maestria.",
  "Seja a versão mais forte de você."
];

export const getRandomQuote = () => {
  return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
};

export const CHALLENGES = [
  {
    id: '7-day-burn',
    name: 'Queima de 7 Dias',
    duration: 7,
    description: 'Déficit calórico consistente por 7 dias',
    goals: [
      'Manter déficit de 300-500 calorias',
      'Beber 3L de água por dia',
      'Atingir meta de proteína diária',
      'Registrar todas as refeições'
    ],
    reward: 'Desbloqueio: Badge Warrior'
  },
  {
    id: '15-day-muscle',
    name: 'Construção de 15 Dias',
    duration: 15,
    description: 'Foco em ganho de massa magra',
    goals: [
      'Consumir 2g de proteína por kg',
      'Treinar 5x por semana',
      'Dormir 8h por noite',
      'Zero dias sem treino'
    ],
    reward: 'Desbloqueio: Badge Titan'
  },
  {
    id: '30-day-transformation',
    name: 'Transformação de 30 Dias',
    duration: 30,
    description: 'Mudança completa de estilo de vida',
    goals: [
      'Atingir todas as metas diárias',
      'Perder 3-5kg de gordura',
      'Aumentar força em 20%',
      'Criar hábitos sólidos'
    ],
    reward: 'Desbloqueio: Badge FitGod'
  }
];

export const getChallengeById = (id: string) => {
  return CHALLENGES.find(challenge => challenge.id === id);
};