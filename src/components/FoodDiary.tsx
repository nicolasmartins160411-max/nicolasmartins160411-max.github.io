import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useFitGodStore } from '@/store/fitgodStore';
import { FOODS, getFoodsByCategory, searchFoods, Food } from '@/data/foods';
import { Plus, Search, Utensils, Coffee, Sun, Moon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const FoodDiary: React.FC = () => {
  const { addFoodEntry, getCurrentDayProgress } = useFitGodStore();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState('100');
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [activeCategory, setActiveCategory] = useState<Food['category']>('protein');

  const progress = getCurrentDayProgress();
  const filteredFoods = searchQuery 
    ? searchFoods(searchQuery)
    : getFoodsByCategory(activeCategory);

  const handleAddFood = () => {
    if (!selectedFood) return;

    const qty = parseFloat(quantity);
    if (qty <= 0) {
      toast({
        title: "Quantidade inválida",
        description: "Digite uma quantidade válida",
        variant: "destructive"
      });
      return;
    }

    const multiplier = qty / 100; // Foods are per 100g
    const entry = {
      foodId: selectedFood.id,
      foodName: selectedFood.name,
      quantity: qty,
      calories: selectedFood.calories * multiplier,
      protein: selectedFood.protein * multiplier,
      carbs: selectedFood.carbs * multiplier,
      fats: selectedFood.fats * multiplier,
      meal: selectedMeal
    };

    addFoodEntry(entry);
    
    toast({
      title: "Alimento adicionado!",
      description: `${selectedFood.name} (${qty}g) adicionado ao ${selectedMeal}`,
    });

    setSelectedFood(null);
    setQuantity('100');
  };

  const getMealIcon = (meal: string) => {
    switch (meal) {
      case 'breakfast': return <Coffee className="h-4 w-4" />;
      case 'lunch': return <Sun className="h-4 w-4" />;
      case 'dinner': return <Moon className="h-4 w-4" />;
      default: return <Utensils className="h-4 w-4" />;
    }
  };

  const getMealName = (meal: string) => {
    switch (meal) {
      case 'breakfast': return 'Café da Manhã';
      case 'lunch': return 'Almoço';
      case 'dinner': return 'Jantar';
      default: return 'Lanche';
    }
  };

  const getCategoryName = (category: Food['category']) => {
    switch (category) {
      case 'protein': return 'Proteínas';
      case 'carbs': return 'Carboidratos';
      case 'fats': return 'Gorduras';
      case 'vegetables': return 'Vegetais';
      case 'drinks': return 'Bebidas';
    }
  };

  const groupedEntries = progress.foodEntries.reduce((acc, entry) => {
    if (!acc[entry.meal]) acc[entry.meal] = [];
    acc[entry.meal].push(entry);
    return acc;
  }, {} as Record<string, typeof progress.foodEntries>);

  return (
    <div className="space-y-6">
      <Card className="fitgod-premium-border">
        <CardHeader>
          <CardTitle className="text-fitgod-lg fitgod-text-gradient">
            DIÁRIO ALIMENTAR
          </CardTitle>
          <p className="text-motivation">CADA CALORIA CONTA. REGISTRE TUDO.</p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="add" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add">Adicionar Alimento</TabsTrigger>
          <TabsTrigger value="diary">Ver Diário</TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="space-y-6">
          {/* Busca */}
          <Card className="fitgod-card">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar alimento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Categorias */}
          {!searchQuery && (
            <div className="flex flex-wrap gap-2">
              {(['protein', 'carbs', 'fats', 'vegetables', 'drinks'] as Food['category'][]).map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'premium' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {getCategoryName(category)}
                </Button>
              ))}
            </div>
          )}

          {/* Lista de Alimentos */}
          <Card className="fitgod-card">
            <CardHeader>
              <CardTitle className="text-lg">
                {searchQuery ? `Resultados para "${searchQuery}"` : getCategoryName(activeCategory)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 max-h-96 overflow-y-auto">
                {filteredFoods.map((food) => (
                  <div
                    key={food.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedFood?.id === food.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedFood(food)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{food.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {food.calories} kcal • {food.protein}g proteína (100g)
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryName(food.category)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Adicionar Alimento */}
          {selectedFood && (
            <Card className="fitgod-premium-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Adicionar {selectedFood.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Quantidade (gramas)</Label>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="100"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Refeição</Label>
                    <Select value={selectedMeal} onValueChange={(value: any) => setSelectedMeal(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Café da Manhã</SelectItem>
                        <SelectItem value="lunch">Almoço</SelectItem>
                        <SelectItem value="dinner">Jantar</SelectItem>
                        <SelectItem value="snack">Lanche</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preview dos valores */}
                <div className="p-4 bg-secondary/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Valores Nutricionais ({quantity}g)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Calorias</p>
                      <p className="font-bold text-primary">
                        {(selectedFood.calories * (parseFloat(quantity) || 0) / 100).toFixed(0)} kcal
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Proteína</p>
                      <p className="font-bold text-primary">
                        {(selectedFood.protein * (parseFloat(quantity) || 0) / 100).toFixed(1)}g
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Carboidratos</p>
                      <p className="font-bold text-primary">
                        {(selectedFood.carbs * (parseFloat(quantity) || 0) / 100).toFixed(1)}g
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Gorduras</p>
                      <p className="font-bold text-primary">
                        {(selectedFood.fats * (parseFloat(quantity) || 0) / 100).toFixed(1)}g
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleAddFood} variant="gold" className="w-full">
                  ADICIONAR AO DIÁRIO
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="diary" className="space-y-6">
          {Object.keys(groupedEntries).length === 0 ? (
            <Card className="fitgod-card">
              <CardContent className="p-8 text-center">
                <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold">Nenhum alimento registrado hoje</p>
                <p className="text-muted-foreground">Comece adicionando sua primeira refeição!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((meal) => {
                const entries = groupedEntries[meal] || [];
                if (entries.length === 0) return null;

                const mealTotals = entries.reduce((acc, entry) => ({
                  calories: acc.calories + entry.calories,
                  protein: acc.protein + entry.protein,
                  carbs: acc.carbs + entry.carbs,
                  fats: acc.fats + entry.fats
                }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

                return (
                  <Card key={meal} className="fitgod-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {getMealIcon(meal)}
                        {getMealName(meal)}
                        <Badge variant="outline" className="ml-auto">
                          {mealTotals.calories.toFixed(0)} kcal
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {entries.map((entry) => (
                          <div key={entry.id} className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                            <div>
                              <p className="font-semibold">{entry.foodName}</p>
                              <p className="text-sm text-muted-foreground">{entry.quantity}g</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">{entry.calories.toFixed(0)} kcal</p>
                              <p className="text-sm text-muted-foreground">
                                {entry.protein.toFixed(0)}g P • {entry.carbs.toFixed(0)}g C • {entry.fats.toFixed(0)}g G
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center font-semibold">
                            <span>Total {getMealName(meal)}</span>
                            <div className="text-right">
                              <p className="text-primary">{mealTotals.calories.toFixed(0)} kcal</p>
                              <p className="text-sm text-muted-foreground">
                                {mealTotals.protein.toFixed(0)}g P • {mealTotals.carbs.toFixed(0)}g C • {mealTotals.fats.toFixed(0)}g G
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};