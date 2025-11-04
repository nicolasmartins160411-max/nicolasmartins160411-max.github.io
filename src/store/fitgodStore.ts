import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DailyGoals {
  calories: number;
  protein: number;
  water: number; // in ml
  steps: number;
}

export interface FoodEntry {
  id: string;
  foodId: string;
  foodName: string;
  quantity: number; // in grams
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: Date;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface DailyProgress {
  date: string; // YYYY-MM-DD
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  water: number;
  steps: number;
  weight?: number;
  foodEntries: FoodEntry[];
}

export interface UserProfile {
  name: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose_weight' | 'maintain' | 'gain_muscle';
  dailyGoals: DailyGoals;
}

interface FitGodStore {
  // User Profile
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  
  // Daily Progress
  dailyProgress: Record<string, DailyProgress>;
  getCurrentDayProgress: () => DailyProgress;
  addFoodEntry: (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => void;
  updateWater: (amount: number) => void;
  updateSteps: (steps: number) => void;
  updateWeight: (weight: number) => void;
  
  // Challenges
  activeChallenges: string[];
  completedChallenges: string[];
  startChallenge: (challengeId: string) => void;
  completeChallenge: (challengeId: string) => void;
  
  // Utilities
  getTodayString: () => string;
  calculateCalorieNeeds: (profile: UserProfile) => number;
  calculateProteinNeeds: (profile: UserProfile) => number;
}

const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

const calculateBMR = (profile: UserProfile): number => {
  // Mifflin-St Jeor Equation
  if (profile.gender === 'male') {
    return 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else {
    return 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }
};

const getActivityMultiplier = (level: UserProfile['activityLevel']): number => {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  return multipliers[level];
};

export const useFitGodStore = create<FitGodStore>()(
  persist(
    (set, get) => ({
      profile: null,
      dailyProgress: {},
      activeChallenges: [],
      completedChallenges: [],

      setProfile: (profile) => set({ profile }),

      getTodayString,

      calculateCalorieNeeds: (profile) => {
        const bmr = calculateBMR(profile);
        const tdee = bmr * getActivityMultiplier(profile.activityLevel);
        
        switch (profile.goal) {
          case 'lose_weight':
            return Math.round(tdee - 500); // 500 calorie deficit
          case 'gain_muscle':
            return Math.round(tdee + 300); // 300 calorie surplus
          default:
            return Math.round(tdee);
        }
      },

      calculateProteinNeeds: (profile) => {
        // 2g per kg for muscle building, 1.6g for weight loss, 1.2g for maintenance
        const multiplier = profile.goal === 'gain_muscle' ? 2 : 
                          profile.goal === 'lose_weight' ? 1.6 : 1.2;
        return Math.round(profile.weight * multiplier);
      },

      getCurrentDayProgress: () => {
        const today = getTodayString();
        const state = get();
        
        if (!state.dailyProgress[today]) {
          const newProgress: DailyProgress = {
            date: today,
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            water: 0,
            steps: 0,
            foodEntries: []
          };
          
          set(state => ({
            dailyProgress: {
              ...state.dailyProgress,
              [today]: newProgress
            }
          }));
          
          return newProgress;
        }
        
        return state.dailyProgress[today];
      },

      addFoodEntry: (entry) => {
        const today = getTodayString();
        const id = Date.now().toString();
        const timestamp = new Date();
        
        const newEntry: FoodEntry = {
          ...entry,
          id,
          timestamp
        };

        set(state => {
          const currentProgress = state.dailyProgress[today] || {
            date: today,
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            water: 0,
            steps: 0,
            foodEntries: []
          };

          const updatedProgress = {
            ...currentProgress,
            calories: currentProgress.calories + entry.calories,
            protein: currentProgress.protein + entry.protein,
            carbs: currentProgress.carbs + entry.carbs,
            fats: currentProgress.fats + entry.fats,
            foodEntries: [...currentProgress.foodEntries, newEntry]
          };

          return {
            dailyProgress: {
              ...state.dailyProgress,
              [today]: updatedProgress
            }
          };
        });
      },

      updateWater: (amount) => {
        const today = getTodayString();
        
        set(state => {
          const currentProgress = state.dailyProgress[today] || {
            date: today,
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            water: 0,
            steps: 0,
            foodEntries: []
          };

          return {
            dailyProgress: {
              ...state.dailyProgress,
              [today]: {
                ...currentProgress,
                water: currentProgress.water + amount
              }
            }
          };
        });
      },

      updateSteps: (steps) => {
        const today = getTodayString();
        
        set(state => {
          const currentProgress = state.dailyProgress[today] || {
            date: today,
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            water: 0,
            steps: 0,
            foodEntries: []
          };

          return {
            dailyProgress: {
              ...state.dailyProgress,
              [today]: {
                ...currentProgress,
                steps
              }
            }
          };
        });
      },

      updateWeight: (weight) => {
        const today = getTodayString();
        
        set(state => {
          const currentProgress = state.dailyProgress[today] || {
            date: today,
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            water: 0,
            steps: 0,
            foodEntries: []
          };

          return {
            dailyProgress: {
              ...state.dailyProgress,
              [today]: {
                ...currentProgress,
                weight
              }
            }
          };
        });
      },

      startChallenge: (challengeId) => {
        set(state => ({
          activeChallenges: [...state.activeChallenges, challengeId]
        }));
      },

      completeChallenge: (challengeId) => {
        set(state => ({
          activeChallenges: state.activeChallenges.filter(id => id !== challengeId),
          completedChallenges: [...state.completedChallenges, challengeId]
        }));
      }
    }),
    {
      name: 'fitgod-storage',
      version: 1
    }
  )
);