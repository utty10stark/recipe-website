import { useState } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

interface Recipe {
  title: string;
  category: string;
  time: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string;
}

export default function AddRecipe({ onRecipeAdded }: { onRecipeAdded: (recipe: Recipe) => void }) {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    time: "",
    servings: 2,
    difficulty: "Easy" as const,
    ingredients: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.category && formData.time && formData.ingredients) {
      onRecipeAdded({
        title: formData.title,
        category: formData.category,
        time: formData.time,
        servings: formData.servings,
        difficulty: formData.difficulty,
        ingredients: formData.ingredients,
      });
      setLocation("/");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} onLogout={() => {}} />
      
      <div className="container px-4 md:px-8 py-12">
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </button>

        <div className="max-w-2xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="text-3xl font-bold text-foreground">
                Add a <span className="text-primary">Family Recipe</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Recipe Name *
                  </label>
                  <Input
                    placeholder="e.g., Grandma's Biryani"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="h-12 text-base"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Category *
                    </label>
                    <Input
                      placeholder="e.g., Dinner"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Cook Time *
                    </label>
                    <Input
                      placeholder="e.g., 45 min"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Servings
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.servings}
                      onChange={(e) => setFormData({ ...formData, servings: parseInt(e.target.value) })}
                      className="h-12 text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "Easy" || val === "Medium" || val === "Hard") {
                          setFormData({ ...formData, difficulty: val });
                        }
                      }}
                      className="w-full h-12 px-3 border border-border rounded-md bg-background text-foreground"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Ingredients *
                  </label>
                  <Textarea
                    placeholder="List ingredients (one per line)"
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    className="min-h-32 text-base resize-none"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="submit"
                    className="flex-1 h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white border-none"
                  >
                    Save Recipe
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-12 text-base font-semibold"
                    onClick={() => setLocation("/")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
