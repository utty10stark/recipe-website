import { Clock, Users, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";

interface RecipeCardProps {
  title: string;
  image: string;
  time: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  rating: number;
}

export function RecipeCard({ title, image, time, servings, difficulty, category, rating }: RecipeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col group bg-card">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
          />
          <Badge className="absolute top-3 left-3 bg-background/90 text-foreground hover:bg-background backdrop-blur-sm border-none shadow-sm">
            {category}
          </Badge>
        </div>
        
        <CardContent className="p-5 flex-grow">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              difficulty === 'Easy' ? 'text-green-600' : 
              difficulty === 'Medium' ? 'text-yellow-600' : 'text-primary'
            }`}>
              {difficulty}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <span className="text-sm font-bold">★ {rating}</span>
            </div>
          </div>
          
          <h3 className="font-heading text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </CardContent>
        
        <CardFooter className="p-5 pt-0 text-muted-foreground text-sm flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{servings} ppl</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
