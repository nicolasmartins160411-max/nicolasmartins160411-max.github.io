export interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs?: number;
  fats?: number;
  ingredients: string[];
  instructions: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'shake';
}

export const RECIPES: Recipe[] = [
  {
    id: 'power-omelete',
    name: 'Power Omelete',
    calories: 380,
    protein: 45,
    carbs: 2,
    fats: 18,
    ingredients: ['3 ovos', '100g frango', 'sal', 'pimenta'],
    instructions: 'Misturar e fritar',
    category: 'breakfast'
  },
  {
    id: 'warrior-beef-bowl',
    name: 'Warrior Beef Bowl',
    calories: 520,
    protein: 47,
    carbs: 45,
    fats: 12,
    ingredients: ['150g patinho', '100g arroz', '100g brócolis'],
    instructions: 'Refogar carne e montar bowl',
    category: 'lunch'
  },
  {
    id: 'titan-shake',
    name: 'Titan Shake',
    calories: 350,
    protein: 32,
    carbs: 28,
    fats: 8,
    ingredients: ['30g whey protein', '1 banana', '30g aveia', '300ml água'],
    instructions: 'Bater no liquidificador',
    category: 'shake'
  },
  {
    id: 'frango-olimpo',
    name: 'Frango Olimpo',
    calories: 250,
    protein: 40,
    carbs: 0,
    fats: 8,
    ingredients: ['150g frango', 'temperos', 'azeite'],
    instructions: 'Temperar e grelhar',
    category: 'lunch'
  },
  {
    id: 'quinoa-supreme',
    name: 'Quinoa Supreme',
    calories: 480,
    protein: 42,
    carbs: 35,
    fats: 15,
    ingredients: ['100g quinoa', '120g frango', '50g tomate'],
    instructions: 'Cozinhar quinoa e misturar com frango e tomate',
    category: 'lunch'
  },
  {
    id: 'panqueca-whey',
    name: 'Panqueca Whey',
    calories: 280,
    protein: 32,
    carbs: 15,
    fats: 8,
    ingredients: ['1 ovo', '30g whey protein', '20g aveia'],
    instructions: 'Misturar e fritar como panqueca',
    category: 'breakfast'
  },
  {
    id: 'batata-sweet-power',
    name: 'Batata Sweet Power',
    calories: 200,
    protein: 4,
    carbs: 45,
    fats: 1,
    ingredients: ['200g batata-doce'],
    instructions: 'Assar no forno',
    category: 'snack'
  },
  {
    id: 'salmao-elite',
    name: 'Salmão Elite',
    calories: 380,
    protein: 34,
    carbs: 2,
    fats: 25,
    ingredients: ['150g salmão', 'limão', 'temperos'],
    instructions: 'Assar com limão e temperos',
    category: 'dinner'
  },
  {
    id: 'coxinha-fit',
    name: 'Coxinha Fit',
    calories: 120,
    protein: 10,
    carbs: 12,
    fats: 3,
    ingredients: ['80g frango', '50g batata-doce', '10g aveia'],
    instructions: 'Misturar ingredientes e assar',
    category: 'snack'
  },
  {
    id: 'tofu-ninja',
    name: 'Tofu Ninja',
    calories: 220,
    protein: 20,
    carbs: 8,
    fats: 12,
    ingredients: ['150g tofu', 'shoyu', 'temperos'],
    instructions: 'Marinar tofu e grelhar',
    category: 'dinner'
  },
  {
    id: 'cottage-bowl',
    name: 'Cottage Bowl',
    calories: 180,
    protein: 24,
    carbs: 15,
    fats: 3,
    ingredients: ['150g cottage', '100g morango', '10g chia'],
    instructions: 'Misturar cottage com morango e chia',
    category: 'snack'
  },
  {
    id: 'peanut-muscle-mix',
    name: 'Peanut Muscle Mix',
    calories: 430,
    protein: 32,
    carbs: 25,
    fats: 22,
    ingredients: ['30g pasta de amendoim', '1 banana', '30g whey protein'],
    instructions: 'Misturar todos os ingredientes',
    category: 'shake'
  },
  {
    id: 'burrito-pro',
    name: 'Burrito Pro',
    calories: 520,
    protein: 38,
    carbs: 45,
    fats: 18,
    ingredients: ['1 tortilha integral', '100g frango', '80g arroz', '50g feijão'],
    instructions: 'Montar burrito com todos os ingredientes',
    category: 'lunch'
  },
  {
    id: 'iogurte-giga',
    name: 'Iogurte Giga',
    calories: 320,
    protein: 18,
    carbs: 35,
    fats: 12,
    ingredients: ['200g iogurte grego', '30g granola', '15g mel'],
    instructions: 'Misturar iogurte com granola e mel',
    category: 'breakfast'
  },
  {
    id: 'waffle-titan',
    name: 'Waffle Titan',
    calories: 300,
    protein: 30,
    carbs: 18,
    fats: 10,
    ingredients: ['1 ovo', '30g whey protein', '25g aveia'],
    instructions: 'Misturar e fazer na waffleira',
    category: 'breakfast'
  }
];

export const getRecipesByCategory = (category: Recipe['category']) => {
  return RECIPES.filter(recipe => recipe.category === category);
};

export const getRecipeById = (id: string) => {
  return RECIPES.find(recipe => recipe.id === id);
};

export const searchRecipes = (query: string) => {
  return RECIPES.filter(recipe => 
    recipe.name.toLowerCase().includes(query.toLowerCase()) ||
    recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(query.toLowerCase())
    )
  );
};