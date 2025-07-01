import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import BrandedLoading from "@/components/BrandedLoading";
import BrandedLoginAnimation from "@/components/BrandedLoginAnimation";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Eye,
  EyeOff,
  Store,
  User,
  ArrowRight,
  AlertCircle,
  Shield,
  Building,
  BarChart3,
} from "lucide-react";

const ShopOwnerLogin = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showLoginAnimation, setShowLoginAnimation] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.identifier || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    setShowLoginAnimation(true);

    try {
      await login(formData);
      // Keep animation visible for a minimum duration
      setTimeout(() => {
        setShowLoginAnimation(false);
        // Navigation will be handled by App.tsx based on user type
      }, 1500);
    } catch (err) {
      setShowLoginAnimation(false);
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error when user starts typing
  };

  if (isLoading && !showLoginAnimation) {
    return <BrandedLoading message="Accessing your dashboard..." fullScreen />;
  }

  return (
    <>
      <AnimatePresence>
        <BrandedLoginAnimation
          isVisible={showLoginAnimation}
          userType="shop_owner"
        />
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
        >
          {/* Logo and Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center space-y-4"
          >
            <Link to="/" className="inline-flex items-center space-x-2 group">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Near me
              </span>
            </Link>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Partner Login
              </h1>
              <p className="text-gray-600">Access your shop owner dashboard</p>
            </div>
          </motion.div>

          {/* Business Features Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100"
          >
            <div className="flex items-center space-x-3 text-sm">
              <Building className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">
                Business Dashboard
              </span>
            </div>
            <p className="text-green-700 text-xs mt-1">
              Manage orders, inventory, and grow your business
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert className="bg-red-50 border-red-200">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <div className="space-y-4">
              {/* Shop ID Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="identifier"
                  className="text-sm font-medium text-gray-700"
                >
                  Shop ID
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="Enter your Shop ID (e.g., SHOP_GVG_A1B2)"
                    value={formData.identifier}
                    onChange={(e) =>
                      handleInputChange("identifier", e.target.value)
                    }
                    className={cn(
                      "pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-400 transition-all duration-200 font-mono",
                      error &&
                        "border-red-300 focus:border-red-400 focus:ring-red-400",
                    )}
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Use the unique Shop ID provided during registration
                </p>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={cn(
                      "pr-12 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-400 transition-all duration-200",
                      error &&
                        "border-red-300 focus:border-red-400 focus:ring-red-400",
                    )}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </motion.div>

              {/* Remember Me and Forgot Password */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleInputChange("rememberMe", checked as boolean)
                    }
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-sm text-green-600 hover:text-green-700"
                  disabled={isLoading}
                >
                  Forgot password?
                </Button>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                disabled={isLoading}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Access Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            {/* Sign Up Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="space-y-4 pt-4 border-t border-gray-200"
            >
              <p className="text-sm text-gray-600 text-center">
                Want to register your shop?
              </p>

              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 rounded-xl border-green-200 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all duration-200"
                  onClick={() => navigate("/shop-owner-signup")}
                  disabled={isLoading}
                >
                  <Store className="w-4 h-4 mr-2" />
                  Become a Near me Partner
                </Button>

                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    Are you a customer?
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm text-green-600 hover:text-green-700 p-0 h-auto"
                    onClick={() => navigate("/customer-login")}
                    disabled={isLoading}
                  >
                    <User className="w-4 h-4 mr-1" />
                    Customer Login
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.form>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="pt-4 border-t border-gray-200"
          >
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <Shield className="w-3 h-3" />
              <span>Business-grade security and encryption</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ShopOwnerLogin;
