import React, { useState } from 'react';
import { useFitGodStore } from '@/store/fitgodStore';
import { ProfileSetup } from '@/components/ProfileSetup';
import { Dashboard } from '@/components/Dashboard';
import { FoodDiary } from '@/components/FoodDiary';
import { Recipes } from '@/components/Recipes';
import { Challenges } from '@/components/Challenges';
import { QuickActions } from '@/components/QuickActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getRandomQuote } from '@/data/motivation';
import { Crown, Home, BookOpen, ChefHat, Target, Zap, Menu, X } from 'lucide-react';
type ActiveTab = 'dashboard' | 'diary' | 'recipes' | 'challenges' | 'actions';
const Index = () => {
  const {
    profile
  } = useFitGodStore();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  // Show profile setup if no profile exists
  if (!profile && !showSetup) {
    return <ProfileSetup onComplete={() => setShowSetup(true)} />;
  }
  const navigationItems = [{
    id: 'dashboard' as ActiveTab,
    label: 'Dashboard',
    icon: Home
  }, {
    id: 'diary' as ActiveTab,
    label: 'Diário',
    icon: BookOpen
  }, {
    id: 'recipes' as ActiveTab,
    label: 'Receitas',
    icon: ChefHat
  }, {
    id: 'challenges' as ActiveTab,
    label: 'Desafios',
    icon: Target
  }, {
    id: 'actions' as ActiveTab,
    label: 'Ações',
    icon: Zap
  }];
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'diary':
        return <FoodDiary />;
      case 'recipes':
        return <Recipes />;
      case 'challenges':
        return <Challenges />;
      case 'actions':
        return <QuickActions />;
      default:
        return <Dashboard />;
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="lucide lucide-crown h-8 w-8 text-primary fitgod-glow bg-[rgba(0,0,0,0)]" />
              <div>
                <h1 className="text-2xl font-black fitgod-text-gradient">FITGOD</h1>
                <p className="text-xs text-motivation hidden sm:block">
                  {getRandomQuote()}
                </p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigationItems.map(item => {
              const Icon = item.icon;
              return <Button key={item.id} variant={activeTab === item.id ? 'premium' : 'ghost'} size="sm" onClick={() => setActiveTab(item.id)} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>;
            })}
            </nav>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && <div className="md:hidden border-t border-border bg-card">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map(item => {
            const Icon = item.icon;
            return <Button key={item.id} variant={activeTab === item.id ? 'premium' : 'ghost'} size="sm" onClick={() => {
              setActiveTab(item.id);
              setIsMobileMenuOpen(false);
            }} className="w-full justify-start gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>;
          })}
            </nav>
          </div>}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-primary" />
              <span className="font-bold fitgod-text-gradient">FITGOD</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transforme seu corpo. Domine sua mente. Seja um FitGod.
            </p>
            <p className="text-xs text-motivation mt-2">
              DISCIPLINA VENCE.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;