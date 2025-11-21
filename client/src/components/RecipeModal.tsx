import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Users, Flame } from "lucide-react";

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

export function RecipeModal({ recipe, open, onOpenChange }: { recipe: Recipe | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  if (!recipe) return null;

  const ingredientsList = recipe.ingredients ? recipe.ingredients.split('\n').filter(i => i.trim()) : [];
  const instructionsList = recipe.instructions ? recipe.instructions.split('\n').filter(i => i.trim()) : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{recipe.title}</DialogTitle>
        </DialogHeader>

        {recipe.image && (
          <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg" />
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="font-semibold text-sm">{recipe.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Servings</p>
              <p className="font-semibold text-sm">{recipe.servings}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Category</p>
            <p className="font-semibold text-sm">{recipe.category}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Difficulty</p>
            <p className={`font-semibold text-sm ${
              recipe.difficulty === 'Easy' ? 'text-green-600' : 
              recipe.difficulty === 'Medium' ? 'text-yellow-600' : 'text-primary'
            }`}>
              {recipe.difficulty}
            </p>
          </div>
        </div>

        {ingredientsList.length > 0 && (
          <div className="py-4 border-t">
            <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {ingredientsList.map((ingredient, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span className="text-sm">{ingredient.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {instructionsList.length > 0 && (
          <div className="py-4 border-t">
            <h3 className="font-semibold text-lg mb-3">Instructions</h3>
            <ol className="space-y-2">
              {instructionsList.map((instruction, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">{i + 1}.</span>
                  <span className="text-sm">{instruction.trim()}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
