import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import {
  MapPin,
  Clock,
  Truck,
  Package,
  CheckCircle,
  Star,
  Phone,
  MessageCircle,
  Receipt,
  RotateCcw,
  Download,
  User,
  Store,
  Navigation as NavigationIcon,
  AlertCircle,
  Calendar,
  CreditCard,
  Leaf,
  Timer,
} from "lucide-react";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("current");
  const [trackingExpanded, setTrackingExpanded] = useState<string | null>(null);

  // Mock current orders data
  const currentOrders = [
    {
      id: "ORD-2024-001",
      shopName: "Green Valley Grocers",
      shopAvatar: "/api/placeholder/40/40",
      status: "out_for_delivery",
      statusText: "Out for Delivery",
      estimatedTime: "8 min",
      items: [
        { name: "Organic Bananas", quantity: 2, price: 45 },
        { name: "Fresh Spinach", quantity: 1, price: 30 },
        { name: "Whole Milk", quantity: 1, price: 55 },
      ],
      total: 130,
      orderTime: "12:45 PM",
      deliveryAgent: {
        name: "Raj Kumar",
        phone: "+91 98765 43210",
        vehicle: "EV-042",
        location: { lat: 28.6139, lng: 77.209 },
      },
      trackingSteps: [
        { status: "confirmed", time: "12:45 PM", completed: true },
        { status: "preparing", time: "12:50 PM", completed: true },
        { status: "picked_up", time: "1:15 PM", completed: true },
        { status: "out_for_delivery", time: "1:20 PM", completed: true },
        { status: "delivered", time: "1:30 PM", completed: false },
      ],
    },
    {
      id: "ORD-2024-002",
      shopName: "Artisan Bakery Corner",
      shopAvatar: "/api/placeholder/40/40",
      status: "preparing",
      statusText: "Preparing",
      estimatedTime: "15 min",
      items: [
        { name: "Sourdough Bread", quantity: 1, price: 80 },
        { name: "Croissants", quantity: 4, price: 120 },
      ],
      total: 200,
      orderTime: "1:00 PM",
      deliveryAgent: null,
      trackingSteps: [
        { status: "confirmed", time: "1:00 PM", completed: true },
        { status: "preparing", time: "1:05 PM", completed: true },
        { status: "picked_up", time: "1:20 PM", completed: false },
        { status: "out_for_delivery", time: "-", completed: false },
        { status: "delivered", time: "-", completed: false },
      ],
    },
  ];

  // Mock order history data
  const orderHistory = [
    {
      id: "ORD-2024-003",
      shopName: "Urban Organic Market",
      date: "Yesterday, 3:30 PM",
      total: 450,
      items: 5,
      status: "delivered",
      rating: 5,
      canReorder: true,
    },
    {
      id: "ORD-2024-004",
      shopName: "Fresh & Local Butcher",
      date: "Dec 20, 2:15 PM",
      total: 650,
      items: 3,
      status: "delivered",
      rating: 4,
      canReorder: true,
    },
    {
      id: "ORD-2024-005",
      shopName: "Green Valley Grocers",
      date: "Dec 18, 11:00 AM",
      total: 320,
      items: 8,
      status: "delivered",
      rating: 5,
      canReorder: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "out_for_delivery":
        return "bg-orange-100 text-orange-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "preparing":
        return <Timer className="w-4 h-4" />;
      case "out_for_delivery":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <Package className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const TrackingCard = ({ order }: { order: any }) => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={order.shopAvatar} />
              <AvatarFallback>{order.shopName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{order.shopName}</CardTitle>
              <CardDescription>Order #{order.id}</CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {getStatusIcon(order.status)}
            {order.statusText}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Delivery Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Delivery Progress</h4>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              ETA: {order.estimatedTime}
            </div>
          </div>

          <div className="space-y-3">
            {order.trackingSteps.map((step: any, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${
                        step.completed ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.status === "confirmed" && "Order Confirmed"}
                      {step.status === "preparing" && "Preparing Your Order"}
                      {step.status === "picked_up" && "Picked Up"}
                      {step.status === "out_for_delivery" && "Out for Delivery"}
                      {step.status === "delivered" && "Delivered"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {step.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Tracking Map Placeholder */}
        {order.deliveryAgent && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Live Tracking</h4>
              <Button variant="outline" size="sm">
                <NavigationIcon className="w-4 h-4 mr-1" />
                View on Map
              </Button>
            </div>
            <div className="h-40 bg-green-100 rounded-lg flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {order.deliveryAgent.name} is 2.3 km away
                </p>
                <p className="text-xs text-muted-foreground">
                  Vehicle: {order.deliveryAgent.vehicle}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Items */}
        <div>
          <h4 className="font-medium mb-3">Order Items</h4>
          <div className="space-y-2">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>₹{item.price}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Communication */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Store className="w-4 h-4 mr-1" />
            Contact Shop
          </Button>
          {order.deliveryAgent && (
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="w-4 h-4 mr-1" />
              Call Agent
            </Button>
          )}
          <Button variant="outline" size="sm" className="flex-1">
            <MessageCircle className="w-4 h-4 mr-1" />
            Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const OrderHistoryCard = ({ order }: { order: any }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{order.shopName}</h4>
              <span className="text-lg font-semibold">₹{order.total}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{order.date}</span>
              <span>•</span>
              <span>{order.items} items</span>
              <span>•</span>
              <span>Order #{order.id}</span>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < order.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                {order.rating}/5
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-2 ml-4">
            <Button variant="outline" size="sm">
              <Receipt className="w-4 h-4 mr-1" />
              Receipt
            </Button>
            {order.canReorder && (
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <RotateCcw className="w-4 h-4 mr-1" />
                Reorder
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">
              Track your current orders and browse your order history
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current" className="flex items-center">
                <Truck className="w-4 h-4 mr-2" />
                Current Orders ({currentOrders.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Order History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-6">
              {currentOrders.length > 0 ? (
                <div>
                  {currentOrders.map((order) => (
                    <TrackingCard key={order.id} order={order} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Package className="w-12 h-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No current orders
                    </h3>
                    <p className="text-gray-600 text-center mb-4">
                      Start shopping from nearby stores to see your orders here
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Store className="w-4 h-4 mr-2" />
                      Browse Shops
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Order History</h2>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download All Receipts
                </Button>
              </div>

              {orderHistory.map((order) => (
                <OrderHistoryCard key={order.id} order={order} />
              ))}

              <div className="text-center mt-8">
                <Button variant="outline">Load More Orders</Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-16 flex-col">
                  <RotateCcw className="w-5 h-5 mb-1" />
                  <span className="text-xs">Reorder Favorites</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <Calendar className="w-5 h-5 mb-1" />
                  <span className="text-xs">Schedule Delivery</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <CreditCard className="w-5 h-5 mb-1" />
                  <span className="text-xs">Payment Methods</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col">
                  <Leaf className="w-5 h-5 mb-1" />
                  <span className="text-xs">Sustainability</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rating Modal would go here */}
          <Dialog>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rate Your Experience</DialogTitle>
                <DialogDescription>
                  Help us improve by rating your shop and delivery experience
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Shop Rating
                  </label>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Button key={i} variant="ghost" size="sm">
                        <Star className="w-5 h-5 text-gray-300" />
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Delivery Rating
                  </label>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Button key={i} variant="ghost" size="sm">
                        <Star className="w-5 h-5 text-gray-300" />
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Additional Comments
                  </label>
                  <Textarea placeholder="Share your experience..." />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Submit Rating
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Orders;
