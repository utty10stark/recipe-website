import { Link } from "wouter";
import { Search, Menu, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navigation({ isAuthenticated = false, onLogout }: { isAuthenticated?: boolean; onLogout?: () => void }) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-8 flex h-16 items-center justify-between">
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
          
          {isAuthenticated && (
            <>
              <Link href="/add-recipe" className="hidden md:flex">
                <Button variant="default" className="gap-2 bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4" />
                  Add Recipe
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={onLogout} className="hidden md:flex hover:text-primary">
                <LogOut className="w-5 h-5" />
              </Button>
            </>
          )}
          
          {!isAuthenticated && (
            <Link href="/login" className="hidden md:flex">
              <Button variant="default">Sign In</Button>
            </Link>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium">Recipes</Link>
                <Link href="/" className="text-lg font-medium">Classics</Link>
                <Link href="/" className="text-lg font-medium">Stories</Link>
                <Link href="/" className="text-lg font-medium">Family</Link>
                <hr className="my-2" />
                {isAuthenticated ? (
                  <>
                    <Link href="/add-recipe" className="text-lg font-medium flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Recipe
                    </Link>
                    <Button variant="outline" onClick={onLogout} className="flex gap-2">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/login">
                    <Button>Sign In</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
