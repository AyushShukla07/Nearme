import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  type: "customer" | "shop_owner";
  shopId?: string;
  shopName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  signup: (userData: SignupData) => Promise<void>;
}

interface LoginCredentials {
  identifier: string; // email, phone, or shop ID
  password: string;
  rememberMe?: boolean;
}

interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: "customer" | "shop_owner";
  shopData?: any; // For shop owner signup
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on app load
    const storedUser = localStorage.getItem("nearme_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("nearme_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call with realistic timing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock authentication logic
      let mockUser: User;

      // Check if it's a shop owner login (starts with "SHOP_" or contains shop ID pattern)
      if (
        credentials.identifier.startsWith("SHOP_") ||
        credentials.identifier.includes("GVG") ||
        credentials.identifier.includes("shop")
      ) {
        mockUser = {
          id: "shop_001",
          name: "Green Valley Grocers",
          email: "owner@greenvalley.com",
          type: "shop_owner",
          shopId: credentials.identifier,
          shopName: "Green Valley Grocers",
        };
      } else {
        // Regular customer login
        mockUser = {
          id: "user_001",
          name: "Ayush Shukla",
          email: credentials.identifier,
          type: "customer",
        };
      }

      setUser(mockUser);
      localStorage.setItem("nearme_user", JSON.stringify(mockUser));
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call with appropriate timing for signup process
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const newUser: User = {
        id: userData.type === "shop_owner" ? "shop_new" : "user_new",
        name: userData.name,
        email: userData.email,
        type: userData.type,
        ...(userData.type === "shop_owner" && {
          shopId: `SHOP_${Date.now()}`,
          shopName: userData.shopData?.shopName,
        }),
      };

      setUser(newUser);
      localStorage.setItem("nearme_user", JSON.stringify(newUser));
    } catch (error) {
      throw new Error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nearme_user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
