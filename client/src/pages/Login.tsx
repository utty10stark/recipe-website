import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "omarjee7865") {
      localStorage.setItem("omarjee_auth", "true");
      onLoginSuccess();
      setLocation("/");
    } else {
      setError("Incorrect password. Try again.");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Omarjee <span className="text-primary">Kitchen</span>
            </h1>
            <p className="text-muted-foreground">Family Recipes Admin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter recipe master password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="h-12 text-base"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white border-none rounded-lg"
              data-testid="button-login"
            >
              Unlock Kitchen
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Family members only • Recipes preserved with love
          </p>
        </div>
      </div>
    </div>
  );
}
