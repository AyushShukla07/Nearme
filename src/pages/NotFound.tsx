import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { MapPin, Home, Store } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Oops! This location doesn't exist
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              It looks like this page got lost in the neighborhood. Let's help
              you find your way back to fresh products and local shops.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/shops">
                <Store className="w-5 h-5 mr-2" />
                Browse Shops
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Need help? Our community support team is always ready to assist you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
