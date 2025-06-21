import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  User,
  Phone,
  MessageCircle,
  CheckCircle,
  X,
  AlertTriangle,
  Send,
  Eye,
  Package,
  Truck,
  ShoppingCart,
  RefreshCw,
  Filter,
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  isAvailable: boolean;
  isStrikedOff: boolean;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAvatar?: string;
  orderTime: string;
  estimatedTime?: string;
  status:
    | "new"
    | "reviewing"
    | "waiting_approval"
    | "approved"
    | "rejected"
    | "preparing"
    | "ready"
    | "completed";
  items: OrderItem[];
  total: number;
  notes?: string;
  customerResponse?: "approved" | "rejected";
  rejectionReason?: string;
}

const OrderManagement = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Raj Kumar",
      customerPhone: "+91 98765 43210",
      orderTime: "10:30 AM",
      estimatedTime: "15 min",
      status: "new",
      items: [
        {
          id: "1",
          name: "Organic Bananas",
          quantity: 2,
          price: 45,
          isAvailable: true,
          isStrikedOff: false,
        },
        {
          id: "2",
          name: "Fresh Spinach",
          quantity: 1,
          price: 30,
          isAvailable: true,
          isStrikedOff: false,
        },
        {
          id: "3",
          name: "Whole Milk",
          quantity: 2,
          price: 110,
          isAvailable: false,
          isStrikedOff: false,
        },
        {
          id: "4",
          name: "Tomatoes",
          quantity: 1,
          price: 25,
          isAvailable: true,
          isStrikedOff: false,
        },
      ],
      total: 210,
      notes: "Please deliver fresh vegetables only. Ring doorbell twice.",
    },
    {
      id: "ORD-002",
      customerName: "Priya Sharma",
      customerPhone: "+91 87654 32109",
      orderTime: "10:45 AM",
      status: "waiting_approval",
      items: [
        {
          id: "5",
          name: "Brown Bread",
          quantity: 2,
          price: 80,
          isAvailable: true,
          isStrikedOff: false,
        },
        {
          id: "6",
          name: "Greek Yogurt",
          quantity: 1,
          price: 75,
          isAvailable: false,
          isStrikedOff: true,
        },
        {
          id: "7",
          name: "Honey",
          quantity: 1,
          price: 150,
          isAvailable: true,
          isStrikedOff: false,
        },
      ],
      total: 305,
      notes: "Revised order sent to customer for approval.",
    },
    {
      id: "ORD-003",
      customerName: "Amit Singh",
      customerPhone: "+91 76543 21098",
      orderTime: "11:00 AM",
      status: "approved",
      customerResponse: "approved",
      items: [
        {
          id: "8",
          name: "Chicken Breast",
          quantity: 1,
          price: 200,
          isAvailable: true,
          isStrikedOff: false,
        },
        {
          id: "9",
          name: "Bell Peppers",
          quantity: 3,
          price: 90,
          isAvailable: true,
          isStrikedOff: false,
        },
        {
          id: "10",
          name: "Olive Oil",
          quantity: 1,
          price: 180,
          isAvailable: false,
          isStrikedOff: true,
        },
      ],
      total: 470,
    },
  ]);

  const [modifiedOrder, setModifiedOrder] = useState<Order | null>(null);
  const [customerMessage, setCustomerMessage] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "reviewing":
        return "bg-yellow-100 text-yellow-800";
      case "waiting_approval":
        return "bg-orange-100 text-orange-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "preparing":
        return "bg-purple-100 text-purple-800";
      case "ready":
        return "bg-indigo-100 text-indigo-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <ShoppingCart className="w-4 h-4" />;
      case "reviewing":
        return <Eye className="w-4 h-4" />;
      case "waiting_approval":
        return <Clock className="w-4 h-4" />;
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <X className="w-4 h-4" />;
      case "preparing":
        return <Package className="w-4 h-4" />;
      case "ready":
        return <Truck className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const handleItemStrikeOff = (order: Order, itemId: string) => {
    const updatedOrder = {
      ...order,
      items: order.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              isStrikedOff: !item.isStrikedOff,
              isAvailable: item.isStrikedOff,
            }
          : item,
      ),
      status: "reviewing" as const,
    };

    setModifiedOrder(updatedOrder);
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? updatedOrder : o)),
    );
  };

  const handleSendRevisedOrder = (order: Order) => {
    const revisedOrder = {
      ...order,
      status: "waiting_approval" as const,
      total: order.items
        .filter((item) => !item.isStrikedOff)
        .reduce((sum, item) => sum + item.price, 0),
      notes: "Revised order sent to customer for approval.",
    };

    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? revisedOrder : o)),
    );
    setModifiedOrder(null);
    setSelectedOrder(null);
  };

  const handleCustomerResponse = (
    orderId: string,
    response: "approved" | "rejected",
    reason?: string,
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: response === "approved" ? "approved" : "rejected",
            customerResponse: response,
            rejectionReason: reason,
          };
        }
        return order;
      }),
    );
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  const getOrdersByStatus = (status: string[]) => {
    return orders.filter((order) => status.includes(order.status));
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card
      className="mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setSelectedOrder(order)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={order.customerAvatar} />
              <AvatarFallback>{order.customerName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{order.customerName}</h4>
              <p className="text-sm text-gray-600">Order #{order.id}</p>
            </div>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {getStatusIcon(order.status)}
            {order.status.replace("_", " ").toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            {order.items.length} items
          </span>
          <span className="font-semibold">₹{order.total}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Ordered: {order.orderTime}</span>
          {order.estimatedTime && (
            <span className="text-green-600">ETA: {order.estimatedTime}</span>
          )}
        </div>
        {order.status === "waiting_approval" && (
          <div className="mt-3 flex space-x-2">
            <Button
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={(e) => {
                e.stopPropagation();
                handleCustomerResponse(order.id, "approved");
              }}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Customer Approved
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                handleCustomerResponse(
                  order.id,
                  "rejected",
                  "Customer rejected the revised order",
                );
              }}
            >
              <X className="w-4 h-4 mr-1" />
              Customer Rejected
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const OrderDetailsModal = ({ order }: { order: Order }) => (
    <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Order #{order.id}</span>
            <Badge className={getStatusColor(order.status)}>
              {getStatusIcon(order.status)}
              {order.status.replace("_", " ").toUpperCase()}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Manage order items and customer communication
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <Avatar>
              <AvatarImage src={order.customerAvatar} />
              <AvatarFallback>{order.customerName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-medium">{order.customerName}</h4>
              <p className="text-sm text-gray-600">{order.customerPhone}</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Order Items with Strike-off Feature */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Order Items</h4>
              {order.status === "new" || order.status === "reviewing" ? (
                <p className="text-sm text-gray-600">
                  Mark unavailable items by checking the box
                </p>
              ) : null}
            </div>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    item.isStrikedOff
                      ? "bg-red-50 border-red-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {(order.status === "new" ||
                      order.status === "reviewing") && (
                      <Checkbox
                        checked={item.isStrikedOff}
                        onCheckedChange={() =>
                          handleItemStrikeOff(order, item.id)
                        }
                        className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                      />
                    )}
                    <div
                      className={
                        item.isStrikedOff ? "line-through text-gray-500" : ""
                      }
                    >
                      <span className="font-medium">{item.name}</span>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-right ${item.isStrikedOff ? "line-through text-gray-500" : ""}`}
                  >
                    <span className="font-medium">₹{item.price}</span>
                    {item.isStrikedOff && (
                      <p className="text-xs text-red-600">Unavailable</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount:</span>
              <div className="text-right">
                {order.status === "reviewing" ||
                order.status === "waiting_approval" ? (
                  <div>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{order.items.reduce((sum, item) => sum + item.price, 0)}
                    </span>
                    <br />
                    <span className="text-lg font-bold text-green-600">
                      ₹
                      {order.items
                        .filter((item) => !item.isStrikedOff)
                        .reduce((sum, item) => sum + item.price, 0)}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold">₹{order.total}</span>
                )}
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          {order.notes && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-1">
                Customer Notes:
              </h5>
              <p className="text-sm text-blue-800">{order.notes}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {order.status === "reviewing" && (
              <>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleSendRevisedOrder(order)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Revised Order to Customer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleCancelOrder(order.id)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel Order
                </Button>
              </>
            )}

            {order.status === "new" && (
              <>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    const hasUnavailable = order.items.some(
                      (item) => item.isStrikedOff,
                    );
                    if (hasUnavailable) {
                      handleSendRevisedOrder(order);
                    } else {
                      handleCustomerResponse(order.id, "approved");
                    }
                  }}
                >
                  {order.items.some((item) => item.isStrikedOff) ? (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Revised Order
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Order
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleCancelOrder(order.id)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Decline Order
                </Button>
              </>
            )}

            {order.status === "approved" && (
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  setOrders((prev) =>
                    prev.map((o) =>
                      o.id === order.id ? { ...o, status: "preparing" } : o,
                    ),
                  );
                  setSelectedOrder(null);
                }}
              >
                <Package className="w-4 h-4 mr-2" />
                Start Preparing
              </Button>
            )}

            {order.status === "preparing" && (
              <Button
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                onClick={() => {
                  setOrders((prev) =>
                    prev.map((o) =>
                      o.id === order.id ? { ...o, status: "ready" } : o,
                    ),
                  );
                  setSelectedOrder(null);
                }}
              >
                <Truck className="w-4 h-4 mr-2" />
                Mark as Ready
              </Button>
            )}

            {order.status === "rejected" && (
              <div className="w-full">
                <div className="p-3 bg-red-50 rounded-lg mb-3">
                  <p className="text-sm text-red-800">
                    <strong>Rejection Reason:</strong> {order.rejectionReason}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleCancelOrder(order.id)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove from List
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Order Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">
            Active Orders (
            {
              getOrdersByStatus([
                "new",
                "reviewing",
                "waiting_approval",
                "approved",
              ]).length
            }
            )
          </TabsTrigger>
          <TabsTrigger value="preparing">
            In Progress ({getOrdersByStatus(["preparing", "ready"]).length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({getOrdersByStatus(["completed"]).length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({getOrdersByStatus(["rejected"]).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getOrdersByStatus([
              "new",
              "reviewing",
              "waiting_approval",
              "approved",
            ]).map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preparing" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getOrdersByStatus(["preparing", "ready"]).map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getOrdersByStatus(["completed"]).map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getOrdersByStatus(["rejected"]).map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedOrder && <OrderDetailsModal order={selectedOrder} />}
    </div>
  );
};

export default OrderManagement;
