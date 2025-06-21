import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import OrderManagement from "@/components/dashboard/OrderManagement";
import InventoryManagement from "@/components/dashboard/InventoryManagement";
import Analytics from "@/components/dashboard/Analytics";
import PromotionalTools from "@/components/dashboard/PromotionalTools";
import Communication from "@/components/dashboard/Communication";
import {
  BarChart3,
  Package,
  ShoppingCart,
  MessageCircle,
  Megaphone,
  Store,
  Bell,
  Settings,
} from "lucide-react";

const ShopOwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState(3);

  const shopInfo = {
    name: "Green Valley Grocers",
    address: "123 Main Street, Downtown",
    status: "open",
    rating: 4.8,
    totalOrders: 247,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Shop Owner Dashboard
                </h1>
                <p className="text-gray-600">
                  Welcome back! Manage your shop operations efficiently.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  variant={shopInfo.status === "open" ? "default" : "secondary"}
                  className={
                    shopInfo.status === "open"
                      ? "bg-green-100 text-green-800"
                      : ""
                  }
                >
                  <Store className="w-3 h-3 mr-1" />
                  {shopInfo.status === "open" ? "Shop Open" : "Shop Closed"}
                </Badge>
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-600" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {notifications}
                    </Badge>
                  )}
                </div>
                <Settings className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
              </div>
            </div>

            {/* Shop Info Card */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {shopInfo.name}
                    </h3>
                    <p className="text-sm text-gray-600">{shopInfo.address}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {shopInfo.rating}★
                    </div>
                    <p className="text-sm text-gray-600">
                      {shopInfo.totalOrders} orders
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-6 h-12">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden md:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden md:inline">Orders</span>
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className="flex items-center gap-2"
              >
                <Package className="w-4 h-4" />
                <span className="hidden md:inline">Inventory</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden md:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger
                value="promotions"
                className="flex items-center gap-2"
              >
                <Megaphone className="w-4 h-4" />
                <span className="hidden md:inline">Promotions</span>
              </TabsTrigger>
              <TabsTrigger
                value="communication"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden md:inline">Messages</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="overview">
                <DashboardOverview />
              </TabsContent>

              <TabsContent value="orders">
                <OrderManagement />
              </TabsContent>

              <TabsContent value="inventory">
                <InventoryManagement />
              </TabsContent>

              <TabsContent value="analytics">
                <Analytics />
              </TabsContent>

              <TabsContent value="promotions">
                <PromotionalTools />
              </TabsContent>

              <TabsContent value="communication">
                <Communication />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerDashboard;
