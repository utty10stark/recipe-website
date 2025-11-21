import { useState } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ChevronUp, ChevronDown } from "lucide-react";

interface Recipe {
  title: string;
  category: string;
  time: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string;
}

export default function AddRecipe({ onRecipeAdded, existingCategories = [] }: { onRecipeAdded: (recipe: Recipe) => void; existingCategories?: string[] }) {
  const [, setLocation] = useLocation();
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hours: 0,
    minutes: 30,
    servings: 2,
    difficulty: "Easy" as const,
    ingredients: "",
  });

  const categoriesOptions = [...existingCategories, "Create New Category"];
  
  const handleCategoryChange = (value: string) => {
    if (value === "Create New Category") {
      setShowNewCategory(true);
      setFormData({ ...formData, category: "" });
      setNewCategoryInput("");
    } else {
      setShowNewCategory(false);
      setFormData({ ...formData, category: value });
      setNewCategoryInput("");
    }
  };

  const buildTimeString = () => {
    const parts = [];
    if (formData.hours > 0) parts.push(`${formData.hours}h`);
    if (formData.minutes > 0) parts.push(`${formData.minutes}m`);
    return parts.length > 0 ? parts.join(" ") : "0m";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = showNewCategory ? newCategoryInput : formData.category;
    const timeString = buildTimeString();
    if (formData.title && finalCategory && (formData.hours > 0 || formData.minutes > 0) && formData.ingredients) {
      onRecipeAdded({
        title: formData.title,
        category: finalCategory,
        time: timeString,
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

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Category *
                  </label>
                  <select
                    value={showNewCategory ? "Create New Category" : formData.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full h-12 px-3 border border-border rounded-md bg-background text-foreground text-base"
                    required={!showNewCategory}
                  >
                    <option value="">Select a category</option>
                    {existingCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="Create New Category">+ Create New Category</option>
                  </select>
                  {showNewCategory && (
                    <Input
                      placeholder="New category name"
                      value={newCategoryInput}
                      onChange={(e) => setNewCategoryInput(e.target.value)}
                      className="h-12 text-base mt-2"
                      required
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Cook Time *
                  </label>
                  <div className="flex gap-3 max-w-xs">
                    <div className="flex-1">
                      <label className="block text-xs text-muted-foreground mb-1">Hours</label>
                      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 h-10">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, hours: Math.max(0, formData.hours - 1) })}
                          className="flex items-center justify-center w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <ChevronDown className="w-4 h-4 text-primary" />
                        </button>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={formData.hours}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "");
                            if (val === "") {
                              setFormData({ ...formData, hours: 0 });
                            } else {
                              const num = Math.max(0, Math.min(24, parseInt(val)));
                              setFormData({ ...formData, hours: num });
                            }
                          }}
                          className="flex-1 text-center bg-transparent text-foreground font-semibold text-base outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, hours: Math.min(24, formData.hours + 1) })}
                          className="flex items-center justify-center w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <ChevronUp className="w-4 h-4 text-primary" />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-muted-foreground mb-1">Minutes</label>
                      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 h-10">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, minutes: Math.max(0, formData.minutes - 5) })}
                          className="flex items-center justify-center w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <ChevronDown className="w-4 h-4 text-primary" />
                        </button>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={formData.minutes}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "");
                            if (val === "") {
                              setFormData({ ...formData, minutes: 0 });
                            } else {
                              const num = Math.max(0, Math.min(59, parseInt(val)));
                              setFormData({ ...formData, minutes: num });
                            }
                          }}
                          className="flex-1 text-center bg-transparent text-foreground font-semibold text-base outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, minutes: Math.min(59, formData.minutes + 5) })}
                          className="flex items-center justify-center w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <ChevronUp className="w-4 h-4 text-primary" />
                        </button>
                      </div>
                    </div>
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
