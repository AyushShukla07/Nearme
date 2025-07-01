import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Star,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Gift,
  Target,
  Award,
  Zap,
  Smartphone,
  CreditCard,
  Package,
  Truck,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Sun,
  Moon,
} from "lucide-react";

// Mock data for dashboard
const todayStats = {
  revenue: 4250,
  orders: 28,
  customers: 22,
  avgOrderValue: 152,
  completionRate: 96,
  rating: 4.6,
};

const weeklyData = [
  { day: "Mon", revenue: 3200, orders: 18, customers: 15 },
  { day: "Tue", revenue: 2800, orders: 16, customers: 14 },
  { day: "Wed", revenue: 4100, orders: 24, customers: 20 },
  { day: "Thu", revenue: 3600, orders: 21, customers: 18 },
  { day: "Fri", revenue: 4800, orders: 32, customers: 26 },
  { day: "Sat", revenue: 5200, orders: 35, customers: 28 },
  { day: "Sun", revenue: 4250, orders: 28, customers: 22 },
];

const hourlyOrderData = [
  { hour: "6AM", orders: 2 },
  { hour: "8AM", orders: 5 },
  { hour: "10AM", orders: 8 },
  { hour: "12PM", orders: 12 },
  { hour: "2PM", orders: 10 },
  { hour: "4PM", orders: 8 },
  { hour: "6PM", orders: 15 },
  { hour: "8PM", orders: 12 },
  { hour: "10PM", orders: 6 },
];

const paymentMethodData = [
  { name: "UPI", value: 45, color: "#22c55e" },
  { name: "COD", value: 30, color: "#f59e0b" },
  { name: "Digital Wallet", value: 15, color: "#3b82f6" },
  { name: "Cards", value: 10, color: "#8b5cf6" },
];

const topProducts = [
  { name: "Organic Vegetables", sales: 85, trend: "up" },
  { name: "Fresh Fruits", sales: 72, trend: "up" },
  { name: "Dairy Products", sales: 65, trend: "down" },
  { name: "Grains & Pulses", sales: 58, trend: "up" },
  { name: "Snacks & Beverages", sales: 45, trend: "up" },
];

const recentActivities = [
  {
    id: 1,
    type: "order",
    message: "New order from Priya Sharma",
    time: "2 min ago",
    amount: "₹285",
  },
  {
    id: 2,
    type: "review",
    message: "5-star review from Rajesh Kumar",
    time: "15 min ago",
    amount: null,
  },
  {
    id: 3,
    type: "payment",
    message: "Payment received via UPI",
    time: "1 hour ago",
    amount: "₹450",
  },
  {
    id: 4,
    type: "delivery",
    message: "Order delivered to Anjali Patel",
    time: "2 hours ago",
    amount: "₹320",
  },
];

const upcomingEvents = [
  {
    id: 1,
    event: "Navratri Festival",
    date: "Oct 15-24",
    impact: "+85% sales expected",
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: 2,
    event: "Weekend Grocery Rush",
    date: "This Saturday",
    impact: "+40% orders expected",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    event: "Monsoon Season",
    date: "Next month",
    impact: "Vegetable demand ↑",
    color: "bg-green-100 text-green-800",
  },
];

const DashboardOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const getActivityIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="w-4 h-4 text-blue-600" />;
      case "review":
        return <Star className="w-4 h-4 text-yellow-600" />;
      case "payment":
        return <CreditCard className="w-4 h-4 text-green-600" />;
      case "delivery":
        return <Truck className="w-4 h-4 text-purple-600" />;
      default:
        return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Today's Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Today's Revenue</p>
                <p className="text-2xl font-bold text-green-700">
                  ₹{todayStats.revenue.toLocaleString()}
                </p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% vs yesterday
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Orders</p>
                <p className="text-2xl font-bold text-blue-700">
                  {todayStats.orders}
                </p>
                <div className="flex items-center text-xs text-blue-600 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% vs yesterday
                </div>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Customers</p>
                <p className="text-2xl font-bold text-purple-700">
                  {todayStats.customers}
                </p>
                <div className="flex items-center text-xs text-purple-600 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5% vs yesterday
                </div>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Avg Order</p>
                <p className="text-2xl font-bold text-yellow-700">
                  ₹{todayStats.avgOrderValue}
                </p>
                <div className="flex items-center text-xs text-yellow-600 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +3% vs yesterday
                </div>
              </div>
              <Target className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">Rating</p>
                <p className="text-2xl font-bold text-orange-700">
                  {todayStats.rating}★
                </p>
                <div className="flex items-center text-xs text-orange-600 mt-1">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  89 reviews
                </div>
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-600">Completion</p>
                <p className="text-2xl font-bold text-indigo-700">
                  {todayStats.completionRate}%
                </p>
                <div className="flex items-center text-xs text-indigo-600 mt-1">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  26/27 orders
                </div>
              </div>
              <Zap className="w-8 h-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Weekly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === "revenue" ? `₹${value}` : value,
                    name === "revenue"
                      ? "Revenue"
                      : name === "orders"
                        ? "Orders"
                        : "Customers",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={(entry) => `${entry.value}%`}
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {paymentMethodData.map((method) => (
                <div
                  key={method.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: method.color }}
                    />
                    <span>{method.name}</span>
                  </div>
                  <span className="font-medium">{method.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              Today's Order Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={hourlyOrderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2 text-orange-600" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-600">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{product.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-orange-500 rounded-full"
                        style={{ width: `${product.sales}%` }}
                      />
                    </div>
                    {product.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  {activity.amount && (
                    <Badge variant="outline" className="font-mono">
                      {activity.amount}
                    </Badge>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events & Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Upcoming Events & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{event.event}</h4>
                    <Badge className={event.color}>{event.date}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{event.impact}</p>
                </motion.div>
              ))}

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    WhatsApp Business
                  </span>
                </div>
                <p className="text-sm text-blue-700">
                  12 unread messages • Quick responses enabled
                </p>
                <Button
                  size="sm"
                  className="mt-2 bg-blue-600 hover:bg-blue-700"
                >
                  View Messages
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
