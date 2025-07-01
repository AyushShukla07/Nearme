import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Star,
  Calendar,
  DollarSign,
  Clock,
  Package,
  Target,
  Award,
  MapPin,
  Smartphone,
  CreditCard,
  MessageCircle,
  Gift,
  Sun,
  Moon,
} from "lucide-react";

// Mock data for Indian market analytics
const salesData = [
  { month: "Jan", sales: 35000, orders: 180, customers: 45 },
  { month: "Feb", sales: 42000, orders: 210, customers: 52 },
  { month: "Mar", sales: 38000, orders: 195, customers: 48 },
  { month: "Apr", sales: 45000, orders: 230, customers: 58 },
  { month: "May", sales: 52000, orders: 275, customers: 65 },
  { month: "Jun", sales: 48000, orders: 250, customers: 60 },
];

const dailySalesData = [
  { day: "Mon", morning: 1200, afternoon: 2500, evening: 1800 },
  { day: "Tue", morning: 1100, afternoon: 2200, evening: 1600 },
  { day: "Wed", morning: 1400, afternoon: 2800, evening: 2100 },
  { day: "Thu", morning: 1300, afternoon: 2600, evening: 1900 },
  { day: "Fri", morning: 1500, afternoon: 3200, evening: 2400 },
  { day: "Sat", morning: 1800, afternoon: 3800, evening: 2800 },
  { day: "Sun", morning: 1600, afternoon: 3500, evening: 2600 },
];

const paymentMethodData = [
  { name: "UPI", value: 45, color: "#22c55e" },
  { name: "Cash on Delivery", value: 30, color: "#f59e0b" },
  { name: "Digital Wallet", value: 15, color: "#3b82f6" },
  { name: "Card Payment", value: 10, color: "#8b5cf6" },
];

const topProductsData = [
  { name: "Organic Vegetables", sales: 2500, profit: 875, trend: "up" },
  { name: "Fresh Fruits", sales: 2200, profit: 770, trend: "up" },
  { name: "Dairy Products", sales: 1800, profit: 540, trend: "down" },
  { name: "Grains & Pulses", sales: 1600, profit: 480, trend: "up" },
  { name: "Bakery Items", sales: 1400, profit: 420, trend: "up" },
];

const customerInsights = [
  { timeSlot: "6-9 AM", customers: 25, preference: "Fresh Vegetables" },
  { timeSlot: "9-12 PM", customers: 35, preference: "Fruits & Snacks" },
  { timeSlot: "12-3 PM", customers: 45, preference: "Lunch Items" },
  { timeSlot: "3-6 PM", customers: 40, preference: "Tea & Snacks" },
  { timeSlot: "6-9 PM", customers: 55, preference: "Dinner Essentials" },
  { timeSlot: "9-11 PM", customers: 20, preference: "Late Night Items" },
];

const festivalSeasons = [
  {
    festival: "Diwali",
    impact: "+85%",
    color: "bg-yellow-100 text-yellow-800",
  },
  { festival: "Holi", impact: "+65%", color: "bg-pink-100 text-pink-800" },
  {
    festival: "Karva Chauth",
    impact: "+45%",
    color: "bg-red-100 text-red-800",
  },
  {
    festival: "Raksha Bandhan",
    impact: "+55%",
    color: "bg-orange-100 text-orange-800",
  },
  { festival: "Eid", impact: "+70%", color: "bg-green-100 text-green-800" },
];

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const currentStats = {
    todayRevenue: 4250,
    todayOrders: 28,
    avgOrderValue: 152,
    customerSatisfaction: 4.6,
    repeatCustomers: 68,
    peakHour: "6-7 PM",
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Today's Revenue</p>
                <p className="text-xl font-bold text-green-700">
                  ₹{currentStats.todayRevenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Today's Orders</p>
                <p className="text-xl font-bold text-blue-700">
                  {currentStats.todayOrders}
                </p>
              </div>
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Avg Order Value</p>
                <p className="text-xl font-bold text-purple-700">
                  ₹{currentStats.avgOrderValue}
                </p>
              </div>
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Customer Rating</p>
                <p className="text-xl font-bold text-yellow-700 flex items-center">
                  {currentStats.customerSatisfaction}
                  <Star className="w-4 h-4 ml-1 fill-current" />
                </p>
              </div>
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">Repeat Customers</p>
                <p className="text-xl font-bold text-orange-700">
                  {currentStats.repeatCustomers}%
                </p>
              </div>
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-600">Peak Hour</p>
                <p className="text-lg font-bold text-indigo-700">
                  {currentStats.peakHour}
                </p>
              </div>
              <Clock className="w-6 h-6 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Period Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
            <div className="flex space-x-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">7 Days</SelectItem>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="90days">3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="sales">Sales Trends</TabsTrigger>
          <TabsTrigger value="customers">Customer Insights</TabsTrigger>
          <TabsTrigger value="products">Top Products</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="festivals">Festival Seasons</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Sales Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Monthly Sales Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "sales" ? `₹${value}` : value,
                        name === "sales"
                          ? "Revenue"
                          : name === "orders"
                            ? "Orders"
                            : "Customers",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Daily Peak Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Daily Sales by Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailySalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, ""]} />
                    <Bar
                      dataKey="morning"
                      stackId="a"
                      fill="#fbbf24"
                      name="Morning"
                    />
                    <Bar
                      dataKey="afternoon"
                      stackId="a"
                      fill="#3b82f6"
                      name="Afternoon"
                    />
                    <Bar
                      dataKey="evening"
                      stackId="a"
                      fill="#8b5cf6"
                      name="Evening"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Peak Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  Customer Peak Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerInsights.map((insight, index) => (
                    <motion.div
                      key={insight.timeSlot}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full" />
                        <div>
                          <p className="font-medium">{insight.timeSlot}</p>
                          <p className="text-sm text-gray-600">
                            {insight.preference}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {insight.customers} customers
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">68%</div>
                    <p className="text-sm text-blue-700">Repeat Customers</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      4.6★
                    </div>
                    <p className="text-sm text-green-700">Avg Rating</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      185
                    </div>
                    <p className="text-sm text-orange-700">Monthly Active</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      ₹152
                    </div>
                    <p className="text-sm text-purple-700">Avg Order Value</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Top Customer Locations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Within 200m</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-16 h-2 bg-green-500 rounded-full" />
                        </div>
                        <span className="text-sm">80%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">200-400m</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-3 h-2 bg-blue-500 rounded-full" />
                        </div>
                        <span className="text-sm">15%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">400-500m</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-1 h-2 bg-orange-500 rounded-full" />
                        </div>
                        <span className="text-sm">5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-orange-600" />
                Top Performing Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProductsData.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-green-600">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600">
                          ₹{product.sales.toLocaleString()} sales
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium text-green-600">
                          ₹{product.profit.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">profit</p>
                      </div>
                      {product.trend === "up" ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                  Payment Method Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {paymentMethodData.map((method, index) => (
                    <div
                      key={method.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: method.color }}
                        />
                        <span className="text-sm font-medium">
                          {method.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${method.value * 0.8}%`,
                              backgroundColor: method.color,
                            }}
                          />
                        </div>
                        <span className="text-sm">{method.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Payment Trends</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>UPI Growth (vs last month)</span>
                      <span className="text-green-600 flex items-center">
                        +12% <TrendingUp className="w-3 h-3 ml-1" />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average UPI Transaction</span>
                      <span className="font-medium">₹148</span>
                    </div>
                    <div className="flex justify-between">
                      <span>COD Orders (Weekly)</span>
                      <span className="font-medium">45 orders</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="festivals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="w-5 h-5 mr-2 text-purple-600" />
                Festival Season Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {festivalSeasons.map((festival, index) => (
                  <motion.div
                    key={festival.festival}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{festival.festival}</h4>
                      <Badge className={festival.color}>
                        {festival.impact}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Expected sales boost during festival season</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">
                  Upcoming Festivals
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Navratri (Oct 15-24)</span>
                    <Badge className="bg-orange-100 text-orange-800">
                      12 days left
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Diwali (Nov 12)</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      40 days left
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="mt-3 bg-yellow-600 hover:bg-yellow-700"
                >
                  Plan Festival Promotions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
