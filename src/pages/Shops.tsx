import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Loading, { LoadingSpinner, LoadingSkeleton } from "@/components/Loading";
import {
  MapPin,
  Star,
  Clock,
  Truck,
  Leaf,
  Store,
  Search,
  Filter,
  Grid,
  List,
  Heart,
  ShoppingBag,
  Award,
  Zap,
  Users,
  Map,
} from "lucide-react";

const Shops = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("distance");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate search loading
  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  const categories = [
    { id: "all", label: "All Shops", icon: <Store className="w-4 h-4" /> },
    {
      id: "grocery",
      label: "Grocery",
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    { id: "bakery", label: "Bakery", icon: <Award className="w-4 h-4" /> },
    { id: "organic", label: "Organic", icon: <Leaf className="w-4 h-4" /> },
    { id: "butcher", label: "Butcher", icon: <Zap className="w-4 h-4" /> },
    { id: "pharmacy", label: "Pharmacy", icon: <Users className="w-4 h-4" /> },
  ];

  const shops = [
    {
      id: 1,
      name: "Green Valley Grocers",
      category: "grocery",
      rating: 4.8,
      reviews: 142,
      distance: "120m",
      deliveryTime: "8-12 min",
      deliveryFee: "Free",
      image: "/api/placeholder/300/200",
      description: "Fresh organic produce and sustainable groceries",
      features: ["Organic", "Local Produce", "Eco-Friendly"],
      isOpen: true,
      isFavorite: false,
      sustainabilityScore: 95,
      products: ["Fresh Vegetables", "Fruits", "Dairy", "Bread"],
    },
    {
      id: 2,
      name: "Artisan Bakery Corner",
      category: "bakery",
      rating: 4.9,
      reviews: 89,
      distance: "85m",
      deliveryTime: "5-8 min",
      deliveryFee: "Free",
      image: "/api/placeholder/300/200",
      description: "Freshly baked bread and pastries daily",
      features: ["Fresh Daily", "Handmade", "Local"],
      isOpen: true,
      isFavorite: true,
      sustainabilityScore: 88,
      products: ["Croissants", "Sourdough", "Pastries", "Cakes"],
    },
    {
      id: 3,
      name: "Urban Organic Market",
      category: "organic",
      rating: 4.7,
      reviews: 256,
      distance: "200m",
      deliveryTime: "10-15 min",
      deliveryFee: "Rs 40",
      image: "/api/placeholder/300/200",
      description: "Premium organic foods and natural products",
      features: ["100% Organic", "Sustainable", "Zero Waste"],
      isOpen: true,
      isFavorite: false,
      sustainabilityScore: 98,
      products: ["Organic Vegetables", "Superfoods", "Natural Cosmetics"],
    },
    {
      id: 4,
      name: "Fresh & Local Butcher",
      category: "butcher",
      rating: 4.6,
      reviews: 78,
      distance: "350m",
      deliveryTime: "12-18 min",
      deliveryFee: "$2.50",
      image: "/api/placeholder/300/200",
      description: "Quality meats from local farms",
      features: ["Local Farm", "Grass-Fed", "Ethical"],
      isOpen: false,
      isFavorite: false,
      sustainabilityScore: 85,
      products: ["Beef", "Chicken", "Pork", "Lamb"],
    },
    {
      id: 5,
      name: "Community Pharmacy Plus",
      category: "pharmacy",
      rating: 4.5,
      reviews: 134,
      distance: "280m",
      deliveryTime: "15-20 min",
      deliveryFee: "Free",
      image: "/api/placeholder/300/200",
      description: "Healthcare essentials and wellness products",
      features: ["24/7 Service", "Prescription", "Wellness"],
      isOpen: true,
      isFavorite: false,
      sustainabilityScore: 78,
      products: ["Medications", "Health Products", "Vitamins", "First Aid"],
    },
    {
      id: 6,
      name: "Sunrise Fresh Market",
      category: "grocery",
      rating: 4.4,
      reviews: 203,
      distance: "450m",
      deliveryTime: "18-25 min",
      deliveryFee: "$1.50",
      image: "/api/placeholder/300/200",
      description: "Your neighborhood grocery store",
      features: ["Wide Selection", "Competitive Prices", "Fresh Daily"],
      isOpen: true,
      isFavorite: true,
      sustainabilityScore: 82,
      products: ["Groceries", "Snacks", "Beverages", "Household"],
    },
  ];

  const filteredShops = shops.filter(
    (shop) => selectedCategory === "all" || shop.category === selectedCategory,
  );

  const ShopCard = ({
    shop,
    isListView = false,
  }: {
    shop: any;
    isListView?: boolean;
  }) => (
    <Card
      className={`hover:shadow-lg transition-shadow duration-300 ${isListView ? "flex" : ""}`}
    >
      <div className={`${isListView ? "w-48 flex-shrink-0" : ""}`}>
        <div className="relative">
          <img
            src={shop.image}
            alt={shop.name}
            className={`w-full object-cover rounded-t-lg ${isListView ? "h-32 rounded-l-lg rounded-tr-none" : "h-48"}`}
          />
          <Button
            size="icon"
            variant="ghost"
            className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
              shop.isFavorite ? "text-red-500" : "text-gray-500"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${shop.isFavorite ? "fill-current" : ""}`}
            />
          </Button>
          {!shop.isOpen && (
            <div className="absolute inset-0 bg-gray-900/50 rounded-t-lg flex items-center justify-center">
              <Badge variant="secondary" className="bg-gray-800 text-white">
                Closed
              </Badge>
            </div>
          )}
          <Badge
            variant="secondary"
            className="absolute bottom-2 right-2 bg-green-100 text-green-800"
          >
            <Leaf className="w-3 h-3 mr-1" />
            {shop.sustainabilityScore}%
          </Badge>
        </div>
      </div>

      <div className={`${isListView ? "flex-1" : ""}`}>
        <CardHeader className={`${isListView ? "pb-2" : ""}`}>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">
                {shop.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">
                {shop.description}
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-2 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{shop.rating}</span>
              <span className="text-gray-500">({shop.reviews})</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{shop.distance}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{shop.deliveryTime}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className={`${isListView ? "pt-0" : ""}`}>
          <div className="flex flex-wrap gap-1 mb-3">
            {shop.features.slice(0, 3).map((feature: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Delivery: </div>
            <span className="mr-auto">
              <p>Rs 40</p>
            </span>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              disabled={!shop.isOpen}
            >
              <ShoppingBag className="w-4 h-4 mr-1" />
              {shop.isOpen ? "Shop Now" : "Closed"}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );

  // Show initial loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loading
              size="lg"
              message="Finding fresh products within 500m of your location..."
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Shops Near You
              </h1>
              <p className="text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-green-600" />
                Downtown Area • 18 shops within 500m
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Map className="w-4 h-4 mr-2" />
                Map View
              </Button>
              <div className="flex items-center space-x-1 bg-white rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Search Shops
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search by name or product..."
                      className="pl-10"
                      onChange={handleSearch}
                      disabled={isSearching}
                    />
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <LoadingSpinner size="sm" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Category
                  </label>
                  <Tabs
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <TabsList className="grid w-full grid-cols-2 h-auto p-1">
                      {categories.slice(0, 6).map((category) => (
                        <TabsTrigger
                          key={category.id}
                          value={category.id}
                          className="flex flex-col items-center p-2 text-xs"
                        >
                          {category.icon}
                          <span className="mt-1">{category.label}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="delivery-time">
                        Fastest Delivery
                      </SelectItem>
                      <SelectItem value="sustainability">
                        Most Sustainable
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-3">Quick Filters</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>Open Now</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>Free Delivery</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>Organic Products</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>Eco-Friendly</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sustainability Score Info */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-800 flex items-center">
                  <Leaf className="w-5 h-5 mr-2" />
                  Sustainability Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700 leading-relaxed">
                  Our sustainability score reflects eco-friendly practices,
                  local sourcing, and environmental impact. Higher scores mean
                  greener choices!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Shop Listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {filteredShops.length} shops found
              </h2>
              <div className="text-sm text-gray-600">
                Showing results within 500m radius
              </div>
            </div>

            {isSearching ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <LoadingSkeleton key={index} lines={3} showAvatar={true} />
                ))}
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredShops.map((shop) => (
                  <ShopCard
                    key={shop.id}
                    shop={shop}
                    isListView={viewMode === "list"}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Shops
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shops;
