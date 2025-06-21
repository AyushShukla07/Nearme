import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shops from "./pages/Shops";
import Orders from "./pages/Orders";
import Sustainability from "./pages/Sustainability";
import Cart from "./pages/Cart";
import Notifications from "./pages/Notifications";
import Account from "./pages/Account";
import LoadingDemo from "./pages/LoadingDemo";
import ShopOwnerDashboard from "./pages/ShopOwnerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/shop-owner-dashboard"
            element={<ShopOwnerDashboard />}
          />
          <Route path="/loading-demo" element={<LoadingDemo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
