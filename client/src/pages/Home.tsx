import { Navigation } from "@/components/Navigation";
import { RecipeCard } from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Flame, Leaf, Clock } from "lucide-react";
import { motion } from "framer-motion";

// Import assets
import heroImage from "@assets/generated_images/dark_moody_cooking_ingredients_hero.png";
import salmonImage from "@assets/generated_images/salmon_with_orange_glaze.png";
import soupImage from "@assets/generated_images/creamy_pumpkin_soup.png";
import pastaImage from "@assets/generated_images/fresh_pasta_with_tomato_sauce.png";
import toastImage from "@assets/generated_images/avocado_toast.png";

export default function Home() {
  const recipes = [
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

  const categories = [
    { name: "Quick & Easy", icon: Clock },
    { name: "Vegetarian", icon: Leaf },
    { name: "Trending", icon: Flame },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Cooking ingredients" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="container relative z-10 text-white">
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

      {/* Categories */}
      <section className="py-12 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {categories.map((cat, i) => (
              <Button key={i} variant="secondary" className="h-12 px-6 rounded-full gap-2 text-base font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                <cat.icon className="w-5 h-5" />
                {cat.name}
              </Button>
            ))}
            <Button variant="ghost" className="h-12 px-6 rounded-full gap-2 text-base font-medium ml-auto text-primary hover:text-primary/80 hover:bg-transparent group">
              View All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-heading text-4xl font-bold mb-2 text-foreground">Family Favorites</h2>
              <p className="text-muted-foreground text-lg">Recipes that bring the Omarjee family together</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} {...recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 transform translate-x-1/4" />
        <div className="container relative z-10">
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
        <div className="container text-center text-muted-foreground">
          <p>© 2024 Omarjee Family Recipes. Cooking with love, sharing with family.</p>
        </div>
      </footer>
    </div>
  );
}
