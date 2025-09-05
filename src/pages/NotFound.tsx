import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent } from "@/shared/ui/Card";
import { AnimatedBackground } from "@/components/animated-background";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900" />
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <Card className="card-modern max-w-lg w-full text-center">
          <CardContent className="p-12">
            <div className="space-y-8">
              <div className="relative">
                <div className="text-8xl font-black text-gradient-primary opacity-20">404</div>
                <div className="absolute inset-0 flex items-center justify-center">
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground">
                  Пельмень потерялся!
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Кажется, эта страница ушла на кухню и не вернулась. 
                  Давайте найдем дорогу домой к нашим пельменям.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground">
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Домой к пельменям
                  </Link>
                </Button>

              </div>

              <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                   А знаете ли вы, что пельмени изобрели в Китае более 1800 лет назад?
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
