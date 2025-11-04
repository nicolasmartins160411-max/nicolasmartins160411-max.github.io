import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RECIPES, getRecipesByCategory, searchRecipes, Recipe } from '@/data/recipes';
import { Input } from '@/components/ui/input';
import { Search, Clock, Zap, ChefHat, Coffee, Sun, Moon, Cookie } from 'lucide-react';

export const Recipes: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Recipe['category']>('breakfast');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = searchQuery 
    ? searchRecipes(searchQuery)
    : getRecipesByCategory(selectedCategory);

  const getCategoryIcon = (category: Recipe['category']) => {
    switch (category) {
      case 'breakfast': return <Coffee className="h-4 w-4" />;
      case 'lunch': return <Sun className="h-4 w-4" />;
      case 'dinner': return <Moon className="h-4 w-4" />;
      case 'snack': return <Cookie className="h-4 w-4" />;
      case 'shake': return <Zap className="h-4 w-4" />;
    }
  };

  const getCategoryName = (category: Recipe['category']) => {
    switch (category) {
      case 'breakfast': return 'Café da Manhã';
      case 'lunch': return 'Almoço';
      case 'dinner': return 'Jantar';
      case 'snack': return 'Lanches';
      case 'shake': return 'Shakes';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="fitgod-premium-border">
        <CardHeader>
          <CardTitle className="text-fitgod-lg fitgod-text-gradient">
            RECEITAS FITGOD
          </CardTitle>
          <p className="text-motivation">COMBUSTÍVEL PARA GUERREIROS</p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="recipes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recipes">Explorar Receitas</TabsTrigger>
          <TabsTrigger value="recipe" disabled={!selectedRecipe}>
            {selectedRecipe ? selectedRecipe.name : 'Selecione uma Receita'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recipes" className="space-y-6">
          {/* Busca */}
          <Card className="fitgod-card">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar receita ou ingrediente..."
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
              {(['breakfast', 'lunch', 'dinner', 'snack', 'shake'] as Recipe['category'][]).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'premium' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2"
                >
                  {getCategoryIcon(category)}
                  {getCategoryName(category)}
                </Button>
              ))}
            </div>
          )}

          {/* Lista de Receitas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe) => (
              <Card 
                key={recipe.id} 
                className="fitgod-card cursor-pointer hover:border-primary/50 transition-all"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-bold">{recipe.name}</CardTitle>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getCategoryIcon(recipe.category)}
                      {getCategoryName(recipe.category)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Valores Nutricionais */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{recipe.calories}</p>
                      <p className="text-xs text-muted-foreground">KCAL</p>
                    </div>
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{recipe.protein}g</p>
                      <p className="text-xs text-muted-foreground">PROTEÍNA</p>
                    </div>
                  </div>

                  {/* Ingredientes Preview */}
                  <div>
                    <p className="text-sm font-semibold mb-2">Ingredientes:</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {recipe.ingredients.join(', ')}
                    </p>
                  </div>

                  <Button 
                    variant="warrior" 
                    size="sm" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRecipe(recipe);
                    }}
                  >
                    <ChefHat className="h-4 w-4 mr-2" />
                    VER RECEITA
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <Card className="fitgod-card">
              <CardContent className="p-8 text-center">
                <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold">Nenhuma receita encontrada</p>
                <p className="text-muted-foreground">
                  {searchQuery ? 'Tente buscar por outro termo' : 'Selecione uma categoria diferente'}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recipe" className="space-y-6">
          {selectedRecipe && (
            <>
              <Card className="fitgod-premium-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-fitgod-lg">{selectedRecipe.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getCategoryIcon(selectedRecipe.category)}
                          {getCategoryName(selectedRecipe.category)}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Rápido
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Informações Nutricionais */}
              <Card className="fitgod-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Informações Nutricionais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{selectedRecipe.calories}</p>
                      <p className="text-sm text-muted-foreground">Calorias</p>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{selectedRecipe.protein}g</p>
                      <p className="text-sm text-muted-foreground">Proteína</p>
                    </div>
                    {selectedRecipe.carbs && (
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <p className="text-3xl font-bold text-primary">{selectedRecipe.carbs}g</p>
                        <p className="text-sm text-muted-foreground">Carboidratos</p>
                      </div>
                    )}
                    {selectedRecipe.fats && (
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <p className="text-3xl font-bold text-primary">{selectedRecipe.fats}g</p>
                        <p className="text-sm text-muted-foreground">Gorduras</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Ingredientes */}
              <Card className="fitgod-card">
                <CardHeader>
                  <CardTitle>Ingredientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="font-medium">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Modo de Preparo */}
              <Card className="fitgod-card">
                <CardHeader>
                  <CardTitle>Modo de Preparo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <p className="text-lg font-medium">{selectedRecipe.instructions}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Ações */}
              <div className="flex gap-4">
                <Button 
                  variant="gold" 
                  className="flex-1"
                  onClick={() => {
                    // Aqui poderia adicionar a receita ao diário ou favoritos
                    alert('Funcionalidade em desenvolvimento!');
                  }}
                >
                  ADICIONAR AO DIÁRIO
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedRecipe(null)}
                >
                  VOLTAR
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};