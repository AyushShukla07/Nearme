import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  User,
  Phone,
  Search,
  Filter,
  Eye,
  Edit3,
  CheckCircle,
  XCircle,
  Package,
  Truck,
  Star,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

// Mock order data for different statuses
const mockOrderHistory = [
  {
    id: "ORD-098",
    customerName: "Priya Patel",
    customerPhone: "+91 98765 43210",
    status: "awaiting-customer-approval",
    originalTotal: 320,
    modifiedTotal: 280,
    orderTime: new Date(Date.now() - 30 * 60 * 1000),
    items: [
      { name: "Organic Apples", quantity: 3, price: 120 },
      { name: "Fresh Bread", quantity: 1, price: 45, unavailable: true },
      { name: "Milk", quantity: 2, price: 115 },
    ],
  },
  {
    id: "ORD-097",
    customerName: "Amit Kumar",
    customerPhone: "+91 87654 32109",
    status: "preparing",
    originalTotal: 450,
    modifiedTotal: 450,
    orderTime: new Date(Date.now() - 45 * 60 * 1000),
    items: [
      { name: "Basmati Rice", quantity: 5, price: 250 },
      { name: "Tomatoes", quantity: 3, price: 90 },
      { name: "Onions", quantity: 2, price: 40 },
    ],
  },
  {
    id: "ORD-096",
    customerName: "Sneha Sharma",
    customerPhone: "+91 76543 21098",
    status: "ready-for-pickup",
    originalTotal: 180,
    modifiedTotal: 160,
    orderTime: new Date(Date.now() - 60 * 60 * 1000),
    items: [
      { name: "Yogurt", quantity: 2, price: 80 },
      { name: "Bananas", quantity: 6, price: 60 },
      { name: "Eggs", quantity: 1, price: 20, modified: true },
    ],
  },
  {
    id: "ORD-095",
    customerName: "Raj Verma",
    customerPhone: "+91 65432 10987",
    status: "out-for-delivery",
    originalTotal: 540,
    modifiedTotal: 540,
    orderTime: new Date(Date.now() - 90 * 60 * 1000),
    deliveryTime: new Date(Date.now() + 15 * 60 * 1000),
    items: [
      { name: "Vegetables Pack", quantity: 1, price: 200 },
      { name: "Fruits Pack", quantity: 1, price: 150 },
      { name: "Dairy Pack", quantity: 1, price: 190 },
    ],
  },
  {
    id: "ORD-094",
    customerName: "Maya Singh",
    customerPhone: "+91 54321 09876",
    status: "delivered",
    originalTotal: 280,
    modifiedTotal: 280,
    orderTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    deliveredTime: new Date(Date.now() - 30 * 60 * 1000),
    rating: 5,
    items: [
      { name: "Fresh Vegetables", quantity: 1, price: 150 },
      { name: "Fruits", quantity: 1, price: 130 },
    ],
  },
];

const OrderManagement = ({
  newOrders,
  onOrderModification,
  onOrderStatusUpdate,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const allOrders = [
    ...newOrders.map((order) => ({ ...order, category: "new" })),
    ...mockOrderHistory.map((order) => ({ ...order, category: "history" })),
  ];

  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-orange-100 text-orange-800 border-orange-200",
      "awaiting-customer-approval":
        "bg-yellow-100 text-yellow-800 border-yellow-200",
      preparing: "bg-blue-100 text-blue-800 border-blue-200",
      "ready-for-pickup": "bg-purple-100 text-purple-800 border-purple-200",
      "out-for-delivery": "bg-indigo-100 text-indigo-800 border-indigo-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusIcon = (status) => {
    const icons = {
      new: <AlertTriangle className="w-4 h-4" />,
      "awaiting-customer-approval": <Clock className="w-4 h-4" />,
      preparing: <Package className="w-4 h-4" />,
      "ready-for-pickup": <CheckCircle className="w-4 h-4" />,
      "out-for-delivery": <Truck className="w-4 h-4" />,
      delivered: <CheckCircle className="w-4 h-4" />,
      cancelled: <XCircle className="w-4 h-4" />,
    };
    return icons[status] || <Clock className="w-4 h-4" />;
  };

  const orderStats = {
    new: newOrders.length,
    awaiting: allOrders.filter((o) => o.status === "awaiting-customer-approval")
      .length,
    preparing: allOrders.filter((o) => o.status === "preparing").length,
    ready: allOrders.filter((o) => o.status === "ready-for-pickup").length,
    delivered: allOrders.filter((o) => o.status === "delivered").length,
  };

  return (
    <div className="space-y-6">
      {/* Order Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {orderStats.new}
            </div>
            <p className="text-sm text-orange-700">New Orders</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {orderStats.awaiting}
            </div>
            <p className="text-sm text-yellow-700">Awaiting Approval</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {orderStats.preparing}
            </div>
            <p className="text-sm text-blue-700">Preparing</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {orderStats.ready}
            </div>
            <p className="text-sm text-purple-700">Ready for Pickup</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {orderStats.delivered}
            </div>
            <p className="text-sm text-green-700">Delivered Today</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by customer name or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="new">New Orders</SelectItem>
                <SelectItem value="awaiting-customer-approval">
                  Awaiting Approval
                </SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready-for-pickup">
                  Ready for Pickup
                </SelectItem>
                <SelectItem value="out-for-delivery">
                  Out for Delivery
                </SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`hover:shadow-lg transition-all duration-200 ${
                  order.status === "new"
                    ? "ring-2 ring-orange-200 bg-orange-50"
                    : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {order.customerName}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(order.orderTime).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">
                          {order.status.replace("-", " ")}
                        </span>
                      </Badge>
                      <Badge variant="outline" className="font-mono">
                        {order.id}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Items</p>
                      <div className="text-sm">
                        {order.items.slice(0, 2).map((item) => (
                          <span key={item.name} className="block">
                            {item.quantity}x {item.name}
                          </span>
                        ))}
                        {order.items.length > 2 && (
                          <span className="text-gray-500">
                            +{order.items.length - 2} more items
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-green-600">
                          ₹{order.modifiedTotal || order.estimatedTotal}
                        </span>
                        {order.modifiedTotal &&
                          order.modifiedTotal !== order.estimatedTotal && (
                            <span className="text-xs text-gray-500 line-through">
                              ₹{order.estimatedTotal}
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-2">
                    {order.status === "new" && (
                      <>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            onOrderStatusUpdate(order.id, "rejected")
                          }
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button
                          onClick={() => onOrderModification(order.id)}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <Edit3 className="w-4 h-4 mr-1" />
                          Review & Modify
                        </Button>
                      </>
                    )}

                    {order.status === "awaiting-customer-approval" && (
                      <Badge className="bg-yellow-100 text-yellow-800 px-3 py-1">
                        <Clock className="w-4 h-4 mr-1" />
                        Waiting for customer response
                      </Badge>
                    )}

                    {order.status === "preparing" && (
                      <Button
                        onClick={() =>
                          onOrderStatusUpdate(order.id, "ready-for-pickup")
                        }
                        className="bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Ready
                      </Button>
                    )}

                    {order.status === "ready-for-pickup" && (
                      <Button
                        onClick={() =>
                          onOrderStatusUpdate(order.id, "out-for-delivery")
                        }
                        className="bg-purple-600 hover:bg-purple-700"
                        size="sm"
                      >
                        <Truck className="w-4 h-4 mr-1" />
                        Start Delivery
                      </Button>
                    )}

                    {order.status === "out-for-delivery" && (
                      <Button
                        onClick={() =>
                          onOrderStatusUpdate(order.id, "delivered")
                        }
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Delivered
                      </Button>
                    )}

                    {order.status === "delivered" && order.rating && (
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span className="text-sm font-medium">
                          {order.rating}/5
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "New orders will appear here when customers place them"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
