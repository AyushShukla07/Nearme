import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Clock,
  Package,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const DashboardOverview = () => {
  const todayStats = {
    sales: { value: 3240, change: 12.5, isUp: true },
    orders: { value: 28, change: 8.3, isUp: true },
    customers: { value: 24, change: -5.2, isUp: false },
    avgOrder: { value: 115, change: 15.7, isUp: true },
  };

  const pendingOrders = [
    {
      id: "ORD-001",
      customer: "Raj Kumar",
      items: 5,
      total: 285,
      time: "2 min ago",
      status: "new",
    },
    {
      id: "ORD-002",
      customer: "Priya Sharma",
      items: 3,
      total: 180,
      time: "5 min ago",
      status: "preparing",
    },
    {
      id: "ORD-003",
      customer: "Amit Singh",
      items: 7,
      total: 420,
      time: "8 min ago",
      status: "ready",
    },
  ];

  const lowStockItems = [
    { name: "Organic Bananas", current: 2, minimum: 10, unit: "kg" },
    { name: "Fresh Milk", current: 5, minimum: 15, unit: "L" },
    { name: "Whole Wheat Bread", current: 3, minimum: 12, unit: "pcs" },
  ];

  const weeklyGoals = {
    sales: { current: 18500, target: 25000 },
    orders: { current: 142, target: 200 },
    newCustomers: { current: 18, target: 25 },
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const StatCard = ({ title, value, change, isUp, icon: Icon }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold">₹{value.toLocaleString()}</p>
          </div>
          <div className="flex flex-col items-end">
            <Icon className="w-8 h-8 text-green-600 mb-2" />
            <div
              className={`flex items-center text-sm ${
                isUp ? "text-green-600" : "text-red-600"
              }`}
            >
              {isUp ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              {Math.abs(change)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Today's Stats */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Today's Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Today's Sales"
            value={todayStats.sales.value}
            change={todayStats.sales.change}
            isUp={todayStats.sales.isUp}
            icon={DollarSign}
          />
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Orders</p>
                  <p className="text-2xl font-bold">
                    {todayStats.orders.value}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <ShoppingCart className="w-8 h-8 text-green-600 mb-2" />
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    {todayStats.orders.change}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Customers</p>
                  <p className="text-2xl font-bold">
                    {todayStats.customers.value}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <Users className="w-8 h-8 text-green-600 mb-2" />
                  <div className="flex items-center text-sm text-red-600">
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                    {Math.abs(todayStats.customers.change)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order</p>
                  <p className="text-2xl font-bold">
                    ₹{todayStats.avgOrder.value}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    {todayStats.avgOrder.change}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-600" />
                Pending Orders
              </CardTitle>
              <Badge variant="secondary">{pendingOrders.length} pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{order.customer}</span>
                      <Badge
                        variant={
                          order.status === "new"
                            ? "default"
                            : order.status === "preparing"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          order.status === "new"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "preparing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.items} items • ₹{order.total} • {order.time}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                View All Orders
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{item.name}</span>
                      <span className="text-sm text-gray-600">
                        {item.current}/{item.minimum} {item.unit}
                      </span>
                    </div>
                    <Progress
                      value={(item.current / item.minimum) * 100}
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Manage Inventory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-600" />
            Weekly Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Sales Target</span>
                <span className="text-sm text-gray-600">
                  ₹{weeklyGoals.sales.current.toLocaleString()} / ₹
                  {weeklyGoals.sales.target.toLocaleString()}
                </span>
              </div>
              <Progress
                value={
                  (weeklyGoals.sales.current / weeklyGoals.sales.target) * 100
                }
                className="h-3"
              />
              <p className="text-xs text-gray-600 mt-1">
                74% completed • ���
                {(
                  weeklyGoals.sales.target - weeklyGoals.sales.current
                ).toLocaleString()}{" "}
                remaining
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Orders Target</span>
                <span className="text-sm text-gray-600">
                  {weeklyGoals.orders.current} / {weeklyGoals.orders.target}
                </span>
              </div>
              <Progress
                value={
                  (weeklyGoals.orders.current / weeklyGoals.orders.target) * 100
                }
                className="h-3"
              />
              <p className="text-xs text-gray-600 mt-1">
                71% completed •{" "}
                {weeklyGoals.orders.target - weeklyGoals.orders.current}{" "}
                remaining
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">New Customers</span>
                <span className="text-sm text-gray-600">
                  {weeklyGoals.newCustomers.current} /{" "}
                  {weeklyGoals.newCustomers.target}
                </span>
              </div>
              <Progress
                value={
                  (weeklyGoals.newCustomers.current /
                    weeklyGoals.newCustomers.target) *
                  100
                }
                className="h-3"
              />
              <p className="text-xs text-gray-600 mt-1">
                72% completed •{" "}
                {weeklyGoals.newCustomers.target -
                  weeklyGoals.newCustomers.current}{" "}
                remaining
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-green-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Package className="w-6 h-6 mb-2" />
              <span className="text-sm">Add Product</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <CheckCircle className="w-6 h-6 mb-2" />
              <span className="text-sm">Process Orders</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <TrendingUp className="w-6 h-6 mb-2" />
              <span className="text-sm">View Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="w-6 h-6 mb-2" />
              <span className="text-sm">Schedule Promo</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
