import { Link } from "wouter";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl font-bold text-foreground">
              Omarj<span className="text-primary">ee</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Recipes</Link>
            <Link href="/" className="hover:text-primary transition-colors">Classics</Link>
            <Link href="/" className="hover:text-primary transition-colors">Stories</Link>
            <Link href="/" className="hover:text-primary transition-colors">Family</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search recipes..." className="pl-8 bg-secondary/50 border-transparent focus-visible:bg-background transition-all" />
          </div>
          
          <Button variant="default" className="hidden md:flex">Sign In</Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium">Recipes</Link>
                <Link href="/" className="text-lg font-medium">Popular</Link>
                <Link href="/" className="text-lg font-medium">Chefs</Link>
                <Link href="/" className="text-lg font-medium">About</Link>
                <hr className="my-2" />
                <Button>Sign In</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
