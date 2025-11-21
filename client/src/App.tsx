import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import AddRecipe from "@/pages/AddRecipe";

interface Recipe {
  title: string;
  image: string;
  time: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  rating: number;
  ingredients?: string;
  instructions?: string;
}

function Router({ isAuth, recipes, onAddRecipe, onLogin, onLogout }: {
  isAuth: boolean;
  recipes: Recipe[];
  onAddRecipe: (recipe: Omit<Recipe, 'rating'> & { ingredients: string; instructions: string }) => void;
  onLogin: () => void;
  onLogout: () => void;
}) {
  const existingCategories = Array.from(new Set(recipes.map(r => r.category).filter(Boolean)));
  
  return (
    <Switch>
      <Route path="/" component={() => <Home recipes={recipes} isAuthenticated={isAuth} onLogout={onLogout} />} />
      <Route path="/login" component={() => isAuth ? null : <Login onLoginSuccess={onLogin} />} />
      <Route path="/add-recipe" component={() => isAuth ? <AddRecipe onRecipeAdded={onAddRecipe} existingCategories={existingCategories} /> : <Login onLoginSuccess={onLogin} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      title: "Orange Glazed Salmon",
      image: "",
      time: "25 min",
      servings: 2,
      difficulty: "Medium",
      category: "Dinner",
      rating: 4.9
    },
    {
      title: "Creamy Pumpkin Soup",
      image: "",
      time: "45 min",
      servings: 4,
      difficulty: "Easy",
      category: "Soup",
      rating: 4.7
    },
    {
      title: "Rustic Tomato Basil Pasta",
      image: "",
      time: "30 min",
      servings: 2,
      difficulty: "Easy",
      category: "Lunch",
      rating: 4.8
    },
    {
      title: "Avocado Chili Toast",
      image: "",
      time: "10 min",
      servings: 1,
      difficulty: "Easy",
      category: "Breakfast",
      rating: 4.9
    }
  ]);

  useEffect(() => {
    const isAuth = localStorage.getItem("omarjee_auth") === "true";
    setIsAuthenticated(isAuth);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("omarjee_auth");
    setIsAuthenticated(false);
  };

  const handleAddRecipe = (newRecipe: Omit<Recipe, 'rating'> & { ingredients: string; instructions: string }) => {
    setRecipes([
      ...recipes,
      {
        ...newRecipe,
        rating: 5.0
      }
    ]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router 
          isAuth={isAuthenticated} 
          recipes={recipes}
          onAddRecipe={handleAddRecipe}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
