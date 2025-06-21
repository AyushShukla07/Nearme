import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
  Download,
  Star,
  Clock,
  Package,
  MapPin,
  Target,
  Zap,
  Award,
} from "lucide-react";

const Analytics = () => {
  const salesData = {
    today: { revenue: 3240, orders: 28, customers: 24 },
    yesterday: { revenue: 2890, orders: 25, customers: 22 },
    thisWeek: { revenue: 18500, orders: 142, customers: 118 },
    lastWeek: { revenue: 16200, orders: 128, customers: 105 },
    thisMonth: { revenue: 78900, orders: 583, customers: 425 },
    lastMonth: { revenue: 72100, orders: 541, customers: 398 },
  };

  const topProducts = [
    {
      name: "Organic Bananas",
      category: "Fruits",
      sold: 125,
      revenue: 5625,
      trend: "up",
      percentage: 12.5,
    },
    {
      name: "Fresh Milk",
      category: "Dairy",
      sold: 89,
      revenue: 4895,
      trend: "up",
      percentage: 8.3,
    },
    {
      name: "Whole Wheat Bread",
      category: "Bakery",
      sold: 76,
      revenue: 3040,
      trend: "down",
      percentage: -3.2,
    },
    {
      name: "Chicken Breast",
      category: "Meat",
      sold: 45,
      revenue: 9000,
      trend: "up",
      percentage: 15.7,
    },
    {
      name: "Fresh Spinach",
      category: "Vegetables",
      sold: 62,
      revenue: 1860,
      trend: "up",
      percentage: 5.1,
    },
  ];

  const customerInsights = {
    newCustomers: 18,
    returningCustomers: 106,
    averageOrderValue: 142,
    customerSatisfaction: 4.8,
    totalReviews: 89,
    deliveryTime: "12 min",
  };

  const peakHours = [
    { time: "8:00 AM", orders: 12, revenue: 1680 },
    { time: "12:00 PM", orders: 25, revenue: 3500 },
    { time: "4:00 PM", orders: 18, revenue: 2520 },
    { time: "7:00 PM", orders: 32, revenue: 4480 },
    { time: "9:00 PM", orders: 15, revenue: 2100 },
  ];

  const weeklyComparison = [
    { day: "Mon", thisWeek: 2400, lastWeek: 2100 },
    { day: "Tue", thisWeek: 2800, lastWeek: 2300 },
    { day: "Wed", thisWeek: 3200, lastWeek: 2800 },
    { day: "Thu", thisWeek: 2900, lastWeek: 2600 },
    { day: "Fri", thisWeek: 3600, lastWeek: 3100 },
    { day: "Sat", thisWeek: 4100, lastWeek: 3800 },
    { day: "Sun", thisWeek: 3500, lastWeek: 3300 },
  ];

  const getPercentageChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0,
    };
  };

  const MetricCard = ({
    title,
    value,
    previousValue,
    icon: Icon,
    prefix = "",
    suffix = "",
  }: any) => {
    const change = getPercentageChange(value, previousValue);
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold">
                {prefix}
                {typeof value === "number" ? value.toLocaleString() : value}
                {suffix}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <Icon className="w-8 h-8 text-green-600 mb-2" />
              <div
                className={`flex items-center text-sm ${
                  change.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {change.isPositive ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {change.value}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Analytics & Insights</h2>
          <p className="text-gray-600">
            Track your shop's performance and customer trends
          </p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="this-week">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Today's Revenue"
              value={salesData.today.revenue}
              previousValue={salesData.yesterday.revenue}
              icon={DollarSign}
              prefix="₹"
            />
            <MetricCard
              title="Today's Orders"
              value={salesData.today.orders}
              previousValue={salesData.yesterday.orders}
              icon={ShoppingCart}
            />
            <MetricCard
              title="New Customers"
              value={salesData.today.customers}
              previousValue={salesData.yesterday.customers}
              icon={Users}
            />
            <MetricCard
              title="Avg Order Value"
              value={Math.round(
                salesData.today.revenue / salesData.today.orders,
              )}
              previousValue={Math.round(
                salesData.yesterday.revenue / salesData.yesterday.orders,
              )}
              icon={TrendingUp}
              prefix="₹"
            />
          </div>

          {/* Weekly Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                  Weekly Sales Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyComparison.map((day, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{day.day}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>This Week</span>
                          <span>₹{day.thisWeek.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${Math.min((day.thisWeek / 5000) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>Last Week</span>
                          <span>₹{day.lastWeek.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-gray-400 h-1 rounded-full"
                            style={{
                              width: `${Math.min((day.lastWeek / 5000) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-green-600" />
                  Peak Hours Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {peakHours.map((hour, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{hour.time}</p>
                        <p className="text-sm text-gray-600">
                          {hour.orders} orders
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{hour.revenue.toLocaleString()}
                        </p>
                        <div
                          className={`text-xs px-2 py-1 rounded ${
                            hour.orders > 20
                              ? "bg-green-100 text-green-800"
                              : hour.orders > 15
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {hour.orders > 20
                            ? "Peak"
                            : hour.orders > 15
                              ? "High"
                              : "Normal"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-green-600" />
                  Top Selling Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-green-600">
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            {product.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{product.revenue.toLocaleString()}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            {product.sold} sold
                          </span>
                          <div
                            className={`flex items-center text-xs ${
                              product.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {product.trend === "up" ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {Math.abs(product.percentage)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  Category Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Fruits", revenue: 8500, percentage: 28 },
                    { name: "Dairy", revenue: 6200, percentage: 22 },
                    { name: "Vegetables", revenue: 4800, percentage: 18 },
                    { name: "Meat", revenue: 9000, percentage: 32 },
                  ].map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-gray-600">
                          ₹{category.revenue.toLocaleString()} (
                          {category.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Customer Satisfaction
                    </p>
                    <p className="text-2xl font-bold">
                      {customerInsights.customerSatisfaction}★
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Based on {customerInsights.totalReviews} reviews
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Avg Delivery Time
                    </p>
                    <p className="text-2xl font-bold">
                      {customerInsights.deliveryTime}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  15% faster than area average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Avg Order Value
                    </p>
                    <p className="text-2xl font-bold">
                      ₹{customerInsights.averageOrderValue}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  8% higher than last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Customer Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">New Customers</p>
                      <p className="text-sm text-gray-600">This week</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {customerInsights.newCustomers}
                      </p>
                      <p className="text-sm text-blue-600">+15% vs last week</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Returning Customers</p>
                      <p className="text-sm text-gray-600">This week</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        {customerInsights.returningCustomers}
                      </p>
                      <p className="text-sm text-green-600">+8% vs last week</p>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Customer Retention</span>
                      <span className="text-purple-600 font-bold">85%</span>
                    </div>
                    <div className="w-full bg-purple-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  Delivery Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { area: "Downtown", orders: 45, percentage: 35 },
                    { area: "Sector 15", orders: 32, percentage: 25 },
                    { area: "Green Valley", orders: 28, percentage: 22 },
                    { area: "Park View", orders: 23, percentage: 18 },
                  ].map((area, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-20 text-sm font-medium">
                        {area.area}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{area.orders} orders</span>
                          <span>{area.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${area.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-600" />
                  Monthly Growth Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "January", revenue: 78900, growth: 12.5 },
                    { month: "December", revenue: 72100, growth: 8.3 },
                    { month: "November", revenue: 66500, growth: 15.2 },
                    { month: "October", revenue: 57800, growth: 6.7 },
                  ].map((month, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{month.month}</p>
                        <p className="text-sm text-gray-600">
                          ₹{month.revenue.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          <TrendingUp className="w-3 h-3 mr-1" />+{month.growth}
                          %
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-green-600" />
                  Performance Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Fast Delivery Champion</p>
                      <p className="text-sm text-gray-600">
                        Avg delivery time under 15 minutes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Customer Favorite</p>
                      <p className="text-sm text-gray-600">
                        4.8+ star rating for 3 months
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Growth Leader</p>
                      <p className="text-sm text-gray-600">
                        20%+ monthly growth achieved
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">Inventory Master</p>
                      <p className="text-sm text-gray-600">
                        Zero stockouts this month
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
