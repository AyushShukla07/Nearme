import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Store,
  User,
  ArrowRight,
  Loader2,
  AlertCircle,
  Shield,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
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

    try {
      await login(formData);
      // Navigation will be handled by App.tsx based on user type
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error when user starts typing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Near me
            </span>
          </Link>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert className="bg-red-50 border-red-200 animate-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {/* Identifier Input */}
            <div className="space-y-2">
              <Label
                htmlFor="identifier"
                className="text-sm font-medium text-gray-700"
              >
                Email, Phone, or Shop ID
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {formData.identifier.startsWith("SHOP_") ||
                  formData.identifier.includes("GVG") ? (
                    <Store className="h-5 w-5 text-gray-400" />
                  ) : formData.identifier.includes("@") ? (
                    <Mail className="h-5 w-5 text-gray-400" />
                  ) : (
                    <User className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your email, phone, or Shop ID"
                  value={formData.identifier}
                  onChange={(e) =>
                    handleInputChange("identifier", e.target.value)
                  }
                  className={cn(
                    "pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-400 transition-all duration-200",
                    error &&
                      "border-red-300 focus:border-red-400 focus:ring-red-400",
                  )}
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-gray-500">
                Customers use email/phone • Shop owners use Shop ID
              </p>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
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
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
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
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          {/* Sign Up Links */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Don't have an account?
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                onClick={() => navigate("/signup")}
                disabled={isLoading}
              >
                <User className="w-4 h-4 mr-2" />
                Customer Signup
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-green-200 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all duration-200"
                onClick={() => navigate("/shop-owner-signup")}
                disabled={isLoading}
              >
                <Store className="w-4 h-4 mr-2" />
                Shop Signup
              </Button>
            </div>
          </div>
        </form>

        {/* Security Notice */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Shield className="w-3 h-3" />
            <span>Protected by 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
