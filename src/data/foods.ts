export interface Food {
  id: string;
  name: string;
  category: 'protein' | 'carbs' | 'fats' | 'vegetables' | 'drinks';
  calories: number; // per 100g
  protein: number; // per 100g
  carbs: number; // per 100g
  fats: number; // per 100g
  fiber?: number; // per 100g
}

export const FOODS: Food[] = [
  // Proteínas
  {
    id: 'frango',
    name: 'Frango',
    category: 'protein',
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6
  },
  {
    id: 'carne-moida',
    name: 'Carne Moída',
    category: 'protein',
    calories: 250,
    protein: 26,
    carbs: 0,
    fats: 15
  },
  {
    id: 'patinho',
    name: 'Patinho',
    category: 'protein',
    calories: 158,
    protein: 32,
    carbs: 0,
    fats: 3
  },
  {
    id: 'ovos',
    name: 'Ovos',
    category: 'protein',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fats: 11
  },
  {
    id: 'peito-peru',
    name: 'Peito de Peru',
    category: 'protein',
    calories: 135,
    protein: 30,
    carbs: 0,
    fats: 1
  },
  {
    id: 'salmao',
    name: 'Salmão',
    category: 'protein',
    calories: 208,
    protein: 25,
    carbs: 0,
    fats: 12
  },
  {
    id: 'tilapia',
    name: 'Tilápia',
    category: 'protein',
    calories: 128,
    protein: 26,
    carbs: 0,
    fats: 2.7
  },
  {
    id: 'atum',
    name: 'Atum',
    category: 'protein',
    calories: 144,
    protein: 30,
    carbs: 0,
    fats: 1
  },
  {
    id: 'tofu',
    name: 'Tofu',
    category: 'protein',
    calories: 76,
    protein: 8,
    carbs: 1.9,
    fats: 4.8
  },
  {
    id: 'iogurte-grego',
    name: 'Iogurte Grego',
    category: 'protein',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fats: 0.4
  },
  {
    id: 'cottage',
    name: 'Cottage',
    category: 'protein',
    calories: 98,
    protein: 11,
    carbs: 3.4,
    fats: 4.3
  },
  {
    id: 'queijo-minas',
    name: 'Queijo Minas',
    category: 'protein',
    calories: 264,
    protein: 17.4,
    carbs: 3,
    fats: 20
  },
  {
    id: 'feijao',
    name: 'Feijão',
    category: 'protein',
    calories: 127,
    protein: 9,
    carbs: 23,
    fats: 0.5,
    fiber: 9
  },
  {
    id: 'grao-bico',
    name: 'Grão-de-bico',
    category: 'protein',
    calories: 164,
    protein: 8.9,
    carbs: 27,
    fats: 2.6,
    fiber: 8
  },
  {
    id: 'lentilha',
    name: 'Lentilha',
    category: 'protein',
    calories: 116,
    protein: 9,
    carbs: 20,
    fats: 0.4,
    fiber: 8
  },
  {
    id: 'whey-protein',
    name: 'Whey Protein',
    category: 'protein',
    calories: 400,
    protein: 80,
    carbs: 5,
    fats: 5
  },

  // Carboidratos
  {
    id: 'arroz-branco',
    name: 'Arroz Branco',
    category: 'carbs',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fats: 0.3
  },
  {
    id: 'arroz-integral',
    name: 'Arroz Integral',
    category: 'carbs',
    calories: 123,
    protein: 2.6,
    carbs: 23,
    fats: 1,
    fiber: 1.8
  },
  {
    id: 'batata-doce',
    name: 'Batata-doce',
    category: 'carbs',
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fats: 0.1,
    fiber: 3
  },
  {
    id: 'batata-inglesa',
    name: 'Batata Inglesa',
    category: 'carbs',
    calories: 77,
    protein: 2,
    carbs: 17,
    fats: 0.1,
    fiber: 2.2
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    category: 'carbs',
    calories: 120,
    protein: 4.4,
    carbs: 22,
    fats: 1.9,
    fiber: 2.8
  },
  {
    id: 'aveia',
    name: 'Aveia',
    category: 'carbs',
    calories: 389,
    protein: 16.9,
    carbs: 66,
    fats: 6.9,
    fiber: 10.6
  },
  {
    id: 'macarrao-integral',
    name: 'Macarrão Integral',
    category: 'carbs',
    calories: 124,
    protein: 5,
    carbs: 25,
    fats: 1.1,
    fiber: 3.2
  },
  {
    id: 'pao-integral',
    name: 'Pão Integral',
    category: 'carbs',
    calories: 247,
    protein: 13,
    carbs: 41,
    fats: 4.2,
    fiber: 7
  },
  {
    id: 'tapioca',
    name: 'Tapioca',
    category: 'carbs',
    calories: 358,
    protein: 1.4,
    carbs: 88,
    fats: 0.2
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'carbs',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fats: 0.3,
    fiber: 2.6
  },
  {
    id: 'maca',
    name: 'Maçã',
    category: 'carbs',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fats: 0.2,
    fiber: 2.4
  },
  {
    id: 'morango',
    name: 'Morango',
    category: 'carbs',
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fats: 0.3,
    fiber: 2
  },

  // Gorduras boas
  {
    id: 'pasta-amendoim',
    name: 'Pasta de Amendoim',
    category: 'fats',
    calories: 588,
    protein: 25,
    carbs: 20,
    fats: 50
  },
  {
    id: 'azeite',
    name: 'Azeite',
    category: 'fats',
    calories: 884,
    protein: 0,
    carbs: 0,
    fats: 100
  },
  {
    id: 'abacate',
    name: 'Abacate',
    category: 'fats',
    calories: 160,
    protein: 2,
    carbs: 9,
    fats: 15,
    fiber: 7
  },
  {
    id: 'castanhas',
    name: 'Castanhas',
    category: 'fats',
    calories: 656,
    protein: 14,
    carbs: 12,
    fats: 66
  },
  {
    id: 'amendoas',
    name: 'Amêndoas',
    category: 'fats',
    calories: 579,
    protein: 21,
    carbs: 22,
    fats: 50,
    fiber: 12
  },
  {
    id: 'chia',
    name: 'Sementes de Chia',
    category: 'fats',
    calories: 486,
    protein: 17,
    carbs: 42,
    fats: 31,
    fiber: 34
  },
  {
    id: 'linhaca',
    name: 'Sementes de Linhaça',
    category: 'fats',
    calories: 534,
    protein: 18,
    carbs: 29,
    fats: 42,
    fiber: 27
  },

  // Vegetais
  {
    id: 'brocolis',
    name: 'Brócolis',
    category: 'vegetables',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fats: 0.4,
    fiber: 2.6
  },
  {
    id: 'espinafre',
    name: 'Espinafre',
    category: 'vegetables',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fats: 0.4,
    fiber: 2.2
  },
  {
    id: 'couve',
    name: 'Couve',
    category: 'vegetables',
    calories: 49,
    protein: 4.3,
    carbs: 10,
    fats: 0.7,
    fiber: 3.6
  },
  {
    id: 'tomate',
    name: 'Tomate',
    category: 'vegetables',
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fats: 0.2,
    fiber: 1.2
  },
  {
    id: 'cenoura',
    name: 'Cenoura',
    category: 'vegetables',
    calories: 41,
    protein: 0.9,
    carbs: 10,
    fats: 0.2,
    fiber: 2.8
  },
  {
    id: 'abobrinha',
    name: 'Abobrinha',
    category: 'vegetables',
    calories: 17,
    protein: 1.2,
    carbs: 3.1,
    fats: 0.3,
    fiber: 1
  },
  {
    id: 'pepino',
    name: 'Pepino',
    category: 'vegetables',
    calories: 16,
    protein: 0.7,
    carbs: 4,
    fats: 0.1,
    fiber: 0.5
  },

  // Bebidas
  {
    id: 'agua',
    name: 'Água',
    category: 'drinks',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  },
  {
    id: 'cafe-sem-acucar',
    name: 'Café sem Açúcar',
    category: 'drinks',
    calories: 2,
    protein: 0.3,
    carbs: 0,
    fats: 0
  },
  {
    id: 'cha-sem-acucar',
    name: 'Chá sem Açúcar',
    category: 'drinks',
    calories: 1,
    protein: 0,
    carbs: 0.3,
    fats: 0
  },
  {
    id: 'agua-com-limao',
    name: 'Água com Limão',
    category: 'drinks',
    calories: 7,
    protein: 0.1,
    carbs: 2.1,
    fats: 0
  }
];

export const getFoodsByCategory = (category: Food['category']) => {
  return FOODS.filter(food => food.category === category);
};

export const getFoodById = (id: string) => {
  return FOODS.find(food => food.id === id);
};

export const searchFoods = (query: string) => {
  return FOODS.filter(food => 
    food.name.toLowerCase().includes(query.toLowerCase())
  );
};