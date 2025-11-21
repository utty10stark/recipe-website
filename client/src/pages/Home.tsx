import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeModal } from "@/components/RecipeModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Flame, Leaf, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

// Import assets
import heroImage from "@assets/generated_images/dark_moody_cooking_ingredients_hero.png";
import salmonImage from "@assets/generated_images/salmon_with_orange_glaze.png";
import soupImage from "@assets/generated_images/creamy_pumpkin_soup.png";
import pastaImage from "@assets/generated_images/fresh_pasta_with_tomato_sauce.png";
import toastImage from "@assets/generated_images/avocado_toast.png";

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

export default function Home({ recipes: passedRecipes = [], isAuthenticated = false, onLogout }: { recipes?: Recipe[]; isAuthenticated?: boolean; onLogout?: () => void }) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const defaultRecipes = [
    {
      title: "Orange Glazed Salmon",
      image: salmonImage,
      time: "25 min",
      servings: 2,
      difficulty: "Medium" as const,
      category: "Dinner",
      rating: 4.9
    },
    {
      title: "Creamy Pumpkin Soup",
      image: soupImage,
      time: "45 min",
      servings: 4,
      difficulty: "Easy" as const,
      category: "Soup",
      rating: 4.7
    },
    {
      title: "Rustic Tomato Basil Pasta",
      image: pastaImage,
      time: "30 min",
      servings: 2,
      difficulty: "Easy" as const,
      category: "Lunch",
      rating: 4.8
    },
    {
      title: "Avocado Chili Toast",
      image: toastImage,
      time: "10 min",
      servings: 1,
      difficulty: "Easy" as const,
      category: "Breakfast",
      rating: 4.9
    }
  ];

  const finalRecipes = passedRecipes.length > 0 ? passedRecipes : defaultRecipes;
  
  const displayRecipes = finalRecipes.map((recipe, idx) => ({
    ...recipe,
    image: recipe.image || [salmonImage, soupImage, pastaImage, toastImage][idx % 4] || salmonImage
  }));

  const allCategories = Array.from(new Set(displayRecipes.map(r => r.category).filter(Boolean)));

  const filteredRecipes = selectedCategory ? displayRecipes.filter(r => r.category === selectedCategory) : displayRecipes;

  return (
    <div className="min-h-screen bg-background font-body">
      <RecipeModal recipe={selectedRecipe} open={!!selectedRecipe} onOpenChange={(open) => !open && setSelectedRecipe(null)} />
      <Navigation isAuthenticated={isAuthenticated} onLogout={onLogout} />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-primary/20">
        <div className="absolute inset-0 z-0" />
        
        <div className="container px-4 md:px-8 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              Omarjee Family Recipes
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Timeless Recipes <br />
              from Our <span className="text-primary">Kitchen</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-lg leading-relaxed">
              Discover cherished family recipes passed down through generations. 
              Traditional flavors, modern techniques, pure love in every bite.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-none rounded-full px-8 h-12 text-base font-semibold">
                Start Cooking
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full px-8 h-12 text-base font-semibold">
                View Collections
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Carousel */}
      <section className="py-12 border-b bg-background overflow-hidden">
        <div className="container px-4 md:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-4 px-4 md:-mx-8 md:px-8 scrollbar-hide">
            <Button 
              onClick={() => setSelectedCategory(null)}
              variant={!selectedCategory ? "default" : "secondary"}
              className={`h-12 px-6 rounded-full whitespace-nowrap text-base font-medium transition-colors flex-shrink-0 ${
                !selectedCategory 
                  ? "bg-primary hover:bg-primary/90 text-white" 
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
            >
              All Recipes
            </Button>
            {allCategories.map((category) => (
              <Button 
                key={category} 
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "secondary"}
                className={`h-12 px-6 rounded-full whitespace-nowrap text-base font-medium transition-colors flex-shrink-0 ${
                  selectedCategory === category 
                    ? "bg-primary hover:bg-primary/90 text-white" 
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 md:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-heading text-4xl font-bold mb-2 text-foreground">Family Favorites</h2>
              <p className="text-muted-foreground text-lg">Recipes that bring the Omarjee family together</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredRecipes.length > 0 ? filteredRecipes.map((recipe, index) => {
              const ingredientsList = recipe.ingredients ? recipe.ingredients.split('\n').filter(i => i.trim()) : [];
              return (
                <div key={index} className="group">
                  <RecipeCard {...recipe} onClick={() => setSelectedRecipe(recipe)} />
                  {ingredientsList.length > 0 && (
                    <div className="mt-4 bg-card border border-border rounded-lg p-4 max-h-0 group-hover:max-h-96 overflow-hidden transition-all duration-300">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Ingredients:</h4>
                      <ul className="space-y-1">
                        {ingredientsList.map((ingredient, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary font-bold mt-0.5">•</span>
                            <span>{ingredient.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            }) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No recipes found in this category</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 transform translate-x-1/4" />
        <div className="container px-4 md:px-8 relative z-10">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl font-bold mb-4">Keep the Tradition Alive</h2>
            <p className="text-gray-400 text-lg mb-8">
              Get new family recipes and cooking stories delivered to your inbox. Preserve our culinary heritage together.
            </p>
            <div className="flex gap-2 max-w-md">
              <Input 
                placeholder="Enter your email address" 
                className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 h-12 rounded-lg focus-visible:ring-primary" 
              />
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="py-12 bg-background border-t">
        <div className="container px-4 md:px-8 text-center text-muted-foreground">
          <p>© 2024 Omarjee Family Recipes. Cooking with love, sharing with family.</p>
        </div>
      </footer>
    </div>
  );
}
