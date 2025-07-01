import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import {
  Search,
  MapPin,
  ShoppingBag,
  User,
  Heart,
  Clock,
  Menu,
  Leaf,
  Store,
  Bell,
  LogOut,
  Settings,
  BarChart3,
  Package,
} from "lucide-react";

const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // Customer navigation links
  const CustomerNavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link
        to="/shops"
        className={`${
          mobile ? "block py-2 px-4" : "inline-flex items-center"
        } text-sm font-medium transition-colors hover:text-primary ${
          isActive("/shops") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Store className="w-4 h-4 mr-1" />
        Shops
      </Link>
      <Link
        to="/orders"
        className={`${
          mobile ? "block py-2 px-4" : "inline-flex items-center"
        } text-sm font-medium transition-colors hover:text-primary ${
          isActive("/orders") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <ShoppingBag className="w-4 h-4 mr-1" />
        My Orders
      </Link>
      <Link
        to="/sustainability"
        className={`${
          mobile ? "block py-2 px-4" : "inline-flex items-center"
        } text-sm font-medium transition-colors hover:text-primary ${
          isActive("/sustainability") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Leaf className="w-4 h-4 mr-1" />
        Sustainability
      </Link>
    </>
  );

  // Shop owner navigation links
  const ShopOwnerNavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link
        to="/shop-owner-dashboard"
        className={`${
          mobile ? "block py-2 px-4" : "inline-flex items-center"
        } text-sm font-medium transition-colors hover:text-primary ${
          isActive("/shop-owner-dashboard")
            ? "text-primary"
            : "text-muted-foreground"
        }`}
      >
        <BarChart3 className="w-4 h-4 mr-1" />
        Dashboard
      </Link>
    </>
  );

  // Public navigation links
  const PublicNavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link
        to="/"
        className={`${
          mobile ? "block py-2 px-4" : "inline-flex items-center"
        } text-sm font-medium transition-colors hover:text-primary ${
          isActive("/") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        Home
      </Link>
    </>
  );

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
    if (!isAuthenticated) {
      return <PublicNavLinks mobile={mobile} />;
    }

    if (user?.type === "customer") {
      return <CustomerNavLinks mobile={mobile} />;
    }

    if (user?.type === "shop_owner") {
      return <ShopOwnerNavLinks mobile={mobile} />;
    }

    return <PublicNavLinks mobile={mobile} />;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to={
              isAuthenticated
                ? user?.type === "shop_owner"
                  ? "/shop-owner-dashboard"
                  : "/shops"
                : "/"
            }
            className="flex items-center space-x-2"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Near me
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLinks />
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-2">
            {/* Location - Only show for customers */}
            {isAuthenticated && user?.type === "customer" && (
              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>Downtown, 2.3km</span>
              </div>
            )}

            {/* Search - Only show for customers */}
            {isAuthenticated && user?.type === "customer" && (
              <>
                <div className="relative hidden lg:flex">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for fresh products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 w-64 focus:w-80 transition-all duration-200"
                  />
                </div>

                {/* Search Mobile */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search className="w-5 h-5" />
                </Button>
              </>
            )}

            {/* Notifications - Show for both user types */}
            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/notifications">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Link>
              </Button>
            )}

            {/* Cart - Only show for customers */}
            {isAuthenticated && user?.type === "customer" && (
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/cart">
                  <ShoppingBag className="w-5 h-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500">
                    2
                  </Badge>
                </Link>
              </Button>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {user?.type === "customer" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/account">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/orders">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Order History
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Heart className="mr-2 h-4 w-4" />
                        Favorites
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="mr-2 h-4 w-4" />
                        Schedule Delivery
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Leaf className="mr-2 h-4 w-4" />
                        Loyalty Points: 450
                      </DropdownMenuItem>
                    </>
                  )}

                  {user?.type === "shop_owner" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/shop-owner-dashboard">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Package className="mr-2 h-4 w-4" />
                        Inventory
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Orders
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  asChild
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-md flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span>Near me</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {/* Mobile Search - Only for customers */}
                  {isAuthenticated && user?.type === "customer" && (
                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Search products..."
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}

                  <nav className="space-y-1">
                    <NavLinks mobile />
                  </nav>

                  {/* User Info for Mobile */}
                  {isAuthenticated && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-sm">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">{user?.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {user?.type === "customer" ? "Customer" : "Shop Owner"}
                      </p>
                    </div>
                  )}

                  {/* Loyalty Points - Only for customers */}
                  {isAuthenticated && user?.type === "customer" && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-sm">
                        <Leaf className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Loyalty Points</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        450
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Next reward at 500 points
                      </p>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search - Only for customers */}
        {isSearchOpen && isAuthenticated && user?.type === "customer" && (
          <div className="lg:hidden py-3 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for fresh products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
