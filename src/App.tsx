import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/Login"; // Legacy unified login
import CustomerLogin from "./pages/CustomerLogin";
import ShopOwnerLogin from "./pages/ShopOwnerLogin";
import CustomerSignup from "./pages/CustomerSignup";
import ShopOwnerSignup from "./pages/ShopOwnerSignup";
import NotFound from "./pages/NotFound";

// Customer pages
import Shops from "./pages/Shops";
import Orders from "./pages/Orders";
import Sustainability from "./pages/Sustainability";
import Cart from "./pages/Cart";
import Notifications from "./pages/Notifications";
import Account from "./pages/Account";

// Shop owner pages
import ShopOwnerDashboard from "./pages/ShopOwnerDashboard";

// Demo page
import LoadingDemo from "./pages/LoadingDemo";

const queryClient = new QueryClient();

// Component to handle redirection based on user type after login
const AuthRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.type === "shop_owner") {
        navigate("/shop-owner-dashboard", { replace: true });
      } else if (user.type === "customer") {
        navigate("/shops", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  return null;
};

// Protected route wrapper for customers
const CustomerRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.type !== "customer") return <Navigate to="/login" replace />;

  return <>{children}</>;
};

// Protected route wrapper for shop owners
const ShopOwnerRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.type !== "shop_owner") return <Navigate to="/login" replace />;

  return <>{children}</>;
};

// Public route wrapper (redirects authenticated users)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated && user) {
    if (user.type === "shop_owner") {
      return <Navigate to="/shop-owner-dashboard" replace />;
    } else if (user.type === "customer") {
      return <Navigate to="/shops" replace />;
    }
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Index />
          </PublicRoute>
        }
      />

      {/* Legacy unified login (redirect to customer login) */}
      <Route
        path="/login"
        element={<Navigate to="/customer-login" replace />}
      />

      {/* Dedicated login pages */}
      <Route
        path="/customer-login"
        element={
          <PublicRoute>
            <CustomerLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/shop-owner-login"
        element={
          <PublicRoute>
            <ShopOwnerLogin />
          </PublicRoute>
        }
      />

      {/* Signup pages */}
      <Route
        path="/signup"
        element={<Navigate to="/customer-signup" replace />}
      />
      <Route
        path="/customer-signup"
        element={
          <PublicRoute>
            <CustomerSignup />
          </PublicRoute>
        }
      />
      <Route
        path="/shop-owner-signup"
        element={
          <PublicRoute>
            <ShopOwnerSignup />
          </PublicRoute>
        }
      />

      {/* Customer-only routes */}
      <Route
        path="/shops"
        element={
          <CustomerRoute>
            <Shops />
          </CustomerRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <CustomerRoute>
            <Orders />
          </CustomerRoute>
        }
      />
      <Route
        path="/sustainability"
        element={
          <CustomerRoute>
            <Sustainability />
          </CustomerRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <CustomerRoute>
            <Cart />
          </CustomerRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <CustomerRoute>
            <Notifications />
          </CustomerRoute>
        }
      />
      <Route
        path="/account"
        element={
          <CustomerRoute>
            <Account />
          </CustomerRoute>
        }
      />

      {/* Shop owner-only routes */}
      <Route
        path="/shop-owner-dashboard"
        element={
          <ShopOwnerRoute>
            <ShopOwnerDashboard />
          </ShopOwnerRoute>
        }
      />

      {/* Demo route (accessible to all) */}
      <Route path="/loading-demo" element={<LoadingDemo />} />

      {/* Auth redirect handler */}
      <Route path="/auth-redirect" element={<AuthRedirect />} />

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
