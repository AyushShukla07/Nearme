import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import BrandedLoading from "@/components/BrandedLoading";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import OrderManagement from "@/components/dashboard/OrderManagement";
import InventoryManagement from "@/components/dashboard/InventoryManagement";
import Analytics from "@/components/dashboard/Analytics";
import PromotionalTools from "@/components/dashboard/PromotionalTools";
import Communication from "@/components/dashboard/Communication";
import OrderModificationModal from "@/components/dashboard/OrderModificationModal";
import SettingsModal from "@/components/dashboard/SettingsModal";
import DeliveryTracking from "@/components/dashboard/DeliveryTracking";
import Profile from "@/components/dashboard/Profile";
import { useAuth } from "@/hooks/useAuth";
import {
  BarChart3,
  Package,
  ShoppingCart,
  MessageCircle,
  Megaphone,
  Store,
  Bell,
  Settings,
  MapPin,
  Star,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle,
  Phone,
  Volume2,
  VolumeX,
  Plus,
  Gift,
  Eye,
  Headphones,
  Truck,
  Zap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for new orders
const mockNewOrders = [
  {
    id: "ORD-001",
    customerName: "Sarah Johnson",
    customerPhone: "+91 98765 43210",
    items: [
      {
        id: 1,
        name: "Organic Bananas",
        requestedQty: 6,
        price: 40,
        available: true,
      },
      {
        id: 2,
        name: "Fresh Milk",
        requestedQty: 2,
        price: 60,
        available: true,
      },
      {
        id: 3,
        name: "Whole Wheat Bread",
        requestedQty: 1,
        price: 45,
        available: false,
      },
      {
        id: 4,
        name: "Free Range Eggs",
        requestedQty: 12,
        price: 120,
        available: true,
      },
    ],
    estimatedTotal: 265,
    orderTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    status: "new",
  },
  {
    id: "ORD-002",
    customerName: "Rahul Sharma",
    customerPhone: "+91 87654 32109",
    items: [
      {
        id: 5,
        name: "Basmati Rice",
        requestedQty: 5,
        price: 250,
        available: true,
      },
      { id: 6, name: "Tomatoes", requestedQty: 2, price: 40, available: true },
    ],
    estimatedTotal: 290,
    orderTime: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    status: "new",
  },
];

const ShopOwnerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState(5);
  const [newOrders, setNewOrders] = useState(mockNewOrders);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedOrderForModification, setSelectedOrderForModification] =
    useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDeliveryTrackingOpen, setIsDeliveryTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState("");
  const [shopStatus, setShopStatus] = useState("open");

  const shopInfo = {
    name: user?.shopName || "Green Valley Grocers",
    address: "123 Main Street, Downtown",
    status: shopStatus,
    rating: 4.8,
    totalOrders: 247,
    todayOrders: 23,
    todayRevenue: 12450,
    pendingOrders: newOrders.length,
  };

  // Simulate post-login loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Simulate new order notifications
  useEffect(() => {
    if (newOrders.length > 0 && soundEnabled) {
      // Play notification sound (placeholder)
      console.log("🔔 New order notification sound");
    }
  }, [newOrders.length, soundEnabled]);

  const handleOrderModification = (orderId) => {
    const order = newOrders.find((o) => o.id === orderId);
    setSelectedOrderForModification(order);
  };

  const handleOrderStatusUpdate = (orderId, newStatus) => {
    setNewOrders((prev) => prev.filter((order) => order.id !== orderId));
    setNotifications((prev) => Math.max(0, prev - 1));
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "add-product":
        setActiveTab("inventory");
        break;
      case "create-offer":
        setActiveTab("promotions");
        break;
      case "whatsapp":
        setActiveTab("communication");
        break;
      case "view-reviews":
        setActiveTab("communication");
        setTimeout(() => {
          // Focus on reviews tab within communication
        }, 100);
        break;
      case "analytics":
        setActiveTab("analytics");
        break;
      case "support":
        window.open("tel:+918000000000");
        break;
      case "track-delivery":
        setIsDeliveryTrackingOpen(true);
        break;
      default:
        break;
    }
  };

  const handleShopStatusToggle = (newStatus) => {
    setShopStatus(newStatus ? "open" : "closed");
    // In real app, this would sync with backend
  };

  if (isLoading) {
    return <BrandedLoading message="Loading your dashboard..." fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Primary Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Near me</h1>
                <p className="text-xs text-gray-600">Shop Owner Dashboard</p>
              </div>
            </div>

            {/* Primary Navigation Items */}
            <div className="flex items-center space-x-1">
              {/* Shop Status Toggle */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Store className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Shop:</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={shopStatus === "open"}
                    onCheckedChange={handleShopStatusToggle}
                    className="data-[state=checked]:bg-green-600"
                  />
                  <Badge
                    variant={shopStatus === "open" ? "default" : "secondary"}
                    className={
                      shopStatus === "open"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-red-100 text-red-800 border-red-200"
                    }
                  >
                    {shopStatus === "open" ? "OPEN" : "CLOSED"}
                  </Badge>
                </div>
              </div>

              {/* Volume Toggle */}
              <motion.button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={soundEnabled ? "Disable Sound" : "Enable Sound"}
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-green-600" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-400" />
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Bell className="w-5 h-5 text-gray-600" />
                    {notifications > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white"
                      >
                        {notifications}
                      </motion.div>
                    )}
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("orders")}>
                    <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" />
                    <div>
                      <p className="font-medium">
                        {newOrders.length} New Orders
                      </p>
                      <p className="text-sm text-gray-500">
                        Pending review and modification
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageCircle className="mr-2 h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">3 WhatsApp Messages</p>
                      <p className="text-sm text-gray-500">
                        Customer inquiries
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="font-medium">2 New Reviews</p>
                      <p className="text-sm text-gray-500">Customer feedback</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setActiveTab("communication")}
                  >
                    View All Notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings */}
              <motion.button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Dashboard Settings"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </motion.button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user?.name?.charAt(0) || "S"}
                      </span>
                    </div>
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
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
                  <DropdownMenuItem onClick={() => setActiveTab("profile")}>
                    <Users className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("inventory")}>
                    <Package className="mr-2 h-4 w-4" />
                    Inventory
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("orders")}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleQuickAction("support")}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Support
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <motion.h2
                    className="text-2xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Welcome back, {user?.name}! 👋
                  </motion.h2>
                  <motion.p
                    className="text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Manage your {shopInfo.name} efficiently with our streamlined
                    dashboard.
                  </motion.p>
                </div>

                <div className="flex items-center space-x-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
                      <Clock className="w-5 h-5 mr-2" />
                      {shopInfo.todayOrders}
                    </div>
                    <p className="text-sm text-gray-600">Today's Orders</p>
                  </div>

                  <div>
                    <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
                      <span className="text-lg mr-1">₹</span>
                      {shopInfo.todayRevenue.toLocaleString("en-IN")}
                    </div>
                    <p className="text-sm text-gray-600">Today's Revenue</p>
                  </div>

                  <div>
                    <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      {shopInfo.rating}
                    </div>
                    <p className="text-sm text-gray-600">Shop Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced New Order Notifications with Near me Branding */}
          <AnimatePresence>
            {newOrders.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                className="mb-6"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 4px 6px -1px rgba(251, 146, 60, 0.1)",
                      "0 10px 15px -3px rgba(251, 146, 60, 0.3)",
                      "0 4px 6px -1px rgba(251, 146, 60, 0.1)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative"
                >
                  <Alert className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 shadow-lg overflow-hidden">
                    {/* Animated background pulse */}
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.1, 0.3, 0.1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-orange-200 to-yellow-200"
                    />

                    {/* Near me branded pin animation */}
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="relative z-10"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="text-orange-600 font-bold"
                        >
                          New Order Alert!
                        </motion.div>
                      </div>
                    </motion.div>

                    <AlertDescription className="relative z-10 mt-2">
                      <div className="flex items-center justify-between">
                        <span>
                          <motion.span
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            className="font-bold text-orange-800 text-lg"
                          >
                            🎯 {newOrders.length} New Order
                            {newOrders.length > 1 ? "s" : ""} via Near me!
                          </motion.span>
                          <br />
                          <span className="text-orange-700 text-sm mt-1 inline-flex items-center">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="mr-2"
                            >
                              🔄
                            </motion.span>
                            Click "Review & Modify" to process orders and adjust
                            stock availability.
                          </span>
                        </span>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="ml-4"
                        >
                          <Button
                            onClick={() => setActiveTab("orders")}
                            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Review Orders
                          </Button>
                        </motion.span>
                      </div>
                    </AlertDescription>
                  </Alert>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Dashboard Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-7 h-14 bg-white shadow-lg rounded-xl">
                <TabsTrigger
                  value="overview"
                  className="flex flex-col items-center gap-1 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden md:inline text-xs">Overview</span>
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="flex flex-col items-center gap-1 data-[state=active]:bg-green-100 data-[state=active]:text-green-700 relative"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden md:inline text-xs">Orders</span>
                  {newOrders.length > 0 && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="inventory"
                  className="flex flex-col items-center gap-1 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                >
                  <Package className="w-4 h-4" />
                  <span className="hidden md:inline text-xs">Inventory</span>
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="flex flex-col items-center gap-1 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden md:inline text-xs">Analytics</span>
                </TabsTrigger>
                <TabsTrigger
                  value="promotions"
                  className="flex flex-col items-center gap-1 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                >
                  <Megaphone className="w-4 h-4" />
                  <span className="hidden md:inline text-xs">Promotions</span>
                </TabsTrigger>
                <TabsTrigger
                  value="communication"
                  className="flex flex-col items-center gap-1 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden md:inline text-xs">Messages</span>
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="flex flex-col items-center gap-1 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden md:inline text-xs">Profile</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-8">
                <TabsContent value="overview" className="mt-0">
                  <DashboardOverview />

                  {/* Functional Quick Actions - Only in Overview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Zap className="w-5 h-5 mr-2 text-orange-600" />
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-200"
                              onClick={() => handleQuickAction("add-product")}
                            >
                              <Plus className="w-6 h-6 text-blue-600" />
                              <span className="text-xs font-medium">
                                Add Product
                              </span>
                            </Button>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-200"
                              onClick={() => handleQuickAction("create-offer")}
                            >
                              <Gift className="w-6 h-6 text-purple-600" />
                              <span className="text-xs font-medium">
                                Create Offer
                              </span>
                            </Button>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-200"
                              onClick={() => handleQuickAction("whatsapp")}
                            >
                              <MessageCircle className="w-6 h-6 text-green-600" />
                              <span className="text-xs font-medium">
                                WhatsApp
                              </span>
                            </Button>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:bg-yellow-50 hover:border-yellow-200"
                              onClick={() => handleQuickAction("view-reviews")}
                            >
                              <Star className="w-6 h-6 text-yellow-600" />
                              <span className="text-xs font-medium">
                                View Reviews
                              </span>
                            </Button>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-200"
                              onClick={() => handleQuickAction("analytics")}
                            >
                              <TrendingUp className="w-6 h-6 text-orange-600" />
                              <span className="text-xs font-medium">
                                Analytics
                              </span>
                            </Button>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:bg-red-50 hover:border-red-200"
                              onClick={() => handleQuickAction("support")}
                            >
                              <Headphones className="w-6 h-6 text-red-600" />
                              <span className="text-xs font-medium">
                                Support
                              </span>
                            </Button>
                          </motion.div>
                        </div>

                        {/* Delivery Tracking Quick Access */}
                        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Truck className="w-6 h-6 text-blue-600" />
                              <div>
                                <h4 className="font-medium text-blue-800">
                                  Delivery Agent Tracking
                                </h4>
                                <p className="text-sm text-blue-600">
                                  Track delivery agents in real-time by Order ID
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={() => setIsDeliveryTrackingOpen(true)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <MapPin className="w-4 h-4 mr-2" />
                              Track Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="orders" className="mt-0">
                  <OrderManagement
                    newOrders={newOrders}
                    onOrderModification={handleOrderModification}
                    onOrderStatusUpdate={handleOrderStatusUpdate}
                  />
                </TabsContent>

                <TabsContent value="inventory" className="mt-0">
                  <InventoryManagement />
                </TabsContent>

                <TabsContent value="analytics" className="mt-0">
                  <Analytics />
                </TabsContent>

                <TabsContent value="promotions" className="mt-0">
                  <PromotionalTools />
                </TabsContent>

                <TabsContent value="communication" className="mt-0">
                  <Communication />
                </TabsContent>

                <TabsContent value="profile" className="mt-0">
                  <Profile
                    onNavigateToTab={setActiveTab}
                    onOpenSettings={() => setIsSettingsOpen(true)}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <OrderModificationModal
        order={selectedOrderForModification}
        isOpen={!!selectedOrderForModification}
        onClose={() => setSelectedOrderForModification(null)}
        onOrderUpdate={handleOrderStatusUpdate}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <DeliveryTracking
        isOpen={isDeliveryTrackingOpen}
        onClose={() => setIsDeliveryTrackingOpen(false)}
        initialOrderId={trackingOrderId}
      />
    </div>
  );
};

export default ShopOwnerDashboard;
