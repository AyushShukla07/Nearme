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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import {
  Bell,
  Package,
  Truck,
  Store,
  Gift,
  Star,
  CheckCircle,
  Clock,
  Trash2,
  Settings,
  Filter,
  Mail,
  AlertCircle,
  Leaf,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  Megaphone,
  Zap,
  Heart,
  ShoppingBag,
  CreditCard,
  X,
  ChevronRight,
  Dot,
} from "lucide-react";

interface Notification {
  id: string;
  type: "order" | "promotion" | "loyalty" | "announcement" | "shop" | "system";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
  actionRequired?: boolean;
  shopName?: string;
  shopLogo?: string;
  orderNumber?: string;
  relatedEntity?: string;
  actionButton?: {
    text: string;
    action: string;
  };
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "n1",
      type: "order",
      title: "Order Out for Delivery",
      message:
        "Your order from Green Valley Grocers is out for delivery. Expected arrival: 8 minutes.",
      timestamp: "2 minutes ago",
      isRead: false,
      isImportant: true,
      actionRequired: true,
      shopName: "Green Valley Grocers",
      orderNumber: "ORD-2024-001",
      actionButton: { text: "Track Order", action: "track" },
    },
    {
      id: "n2",
      type: "loyalty",
      title: "Reward Unlocked! 🎉",
      message:
        "Congratulations! You've earned 25 points from your recent order. You now have 475 points total.",
      timestamp: "1 hour ago",
      isRead: false,
      isImportant: false,
      actionButton: { text: "View Rewards", action: "rewards" },
    },
    {
      id: "n3",
      type: "promotion",
      title: "15% Off Organic Products",
      message:
        "Special weekend offer: Get 15% off on all organic products. Use code ORGANIC15. Valid until Sunday.",
      timestamp: "3 hours ago",
      isRead: true,
      isImportant: false,
      shopName: "Urban Organic Market",
      actionButton: { text: "Shop Now", action: "shop" },
    },
    {
      id: "n4",
      type: "order",
      title: "Order Delivered Successfully",
      message:
        "Your order from Artisan Bakery Corner has been delivered. Hope you enjoy your fresh bread!",
      timestamp: "Yesterday, 6:30 PM",
      isRead: true,
      isImportant: false,
      shopName: "Artisan Bakery Corner",
      orderNumber: "ORD-2024-002",
      actionButton: { text: "Rate Order", action: "rate" },
    },
    {
      id: "n5",
      type: "announcement",
      title: "New Shop Joined Near You!",
      message:
        "Fresh Fish Market just joined Near me and is now delivering to your area. Discover fresh seafood options.",
      timestamp: "Yesterday, 2:15 PM",
      isRead: false,
      isImportant: false,
      shopName: "Fresh Fish Market",
      actionButton: { text: "Explore Shop", action: "explore" },
    },
    {
      id: "n6",
      type: "system",
      title: "Scheduled Maintenance",
      message:
        "The app will be under maintenance tonight from 2:00 AM to 4:00 AM. All services will resume normally afterward.",
      timestamp: "Yesterday, 10:00 AM",
      isRead: true,
      isImportant: true,
      actionRequired: false,
    },
    {
      id: "n7",
      type: "loyalty",
      title: "Weekly Challenge Complete!",
      message:
        "You've completed this week's sustainability challenge! Earned 50 bonus points for choosing eco-friendly packaging.",
      timestamp: "2 days ago",
      isRead: true,
      isImportant: false,
      actionButton: { text: "View Profile", action: "profile" },
    },
    {
      id: "n8",
      type: "promotion",
      title: "Free Delivery Weekend",
      message:
        "Enjoy free delivery on all orders this weekend. No minimum order required. Perfect time to try new shops!",
      timestamp: "3 days ago",
      isRead: false,
      isImportant: false,
      actionButton: { text: "Start Shopping", action: "shop" },
    },
  ]);

  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    [],
  );
  const [showBulkActions, setShowBulkActions] = useState(false);

  const getNotificationIcon = (type: string, isImportant: boolean) => {
    const iconClass = `w-5 h-5 ${isImportant ? "text-orange-600" : "text-gray-600"}`;

    switch (type) {
      case "order":
        return <Package className={iconClass} />;
      case "promotion":
        return <Gift className={iconClass} />;
      case "loyalty":
        return <Star className={iconClass} />;
      case "announcement":
        return <Megaphone className={iconClass} />;
      case "shop":
        return <Store className={iconClass} />;
      case "system":
        return <Settings className={iconClass} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  const getNotificationColor = (type: string, isImportant: boolean) => {
    if (isImportant) return "border-l-orange-500 bg-orange-50";

    switch (type) {
      case "order":
        return "border-l-green-500 bg-green-50";
      case "promotion":
        return "border-l-purple-500 bg-purple-50";
      case "loyalty":
        return "border-l-yellow-500 bg-yellow-50";
      case "announcement":
        return "border-l-blue-500 bg-blue-50";
      case "shop":
        return "border-l-emerald-500 bg-emerald-50";
      case "system":
        return "border-l-gray-500 bg-gray-50";
      default:
        return "border-l-gray-400 bg-gray-50";
    }
  };

  const filterNotifications = (notifications: Notification[]) => {
    switch (selectedTab) {
      case "unread":
        return notifications.filter((n) => !n.isRead);
      case "important":
        return notifications.filter((n) => n.isImportant || n.actionRequired);
      case "orders":
        return notifications.filter((n) => n.type === "order");
      case "promotions":
        return notifications.filter((n) => n.type === "promotion");
      default:
        return notifications;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: false } : n)),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedNotifications((prev) => prev.filter((nId) => nId !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteSelected = () => {
    setNotifications((prev) =>
      prev.filter((n) => !selectedNotifications.includes(n.id)),
    );
    setSelectedNotifications([]);
    setShowBulkActions(false);
  };

  const markSelectedAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        selectedNotifications.includes(n.id) ? { ...n, isRead: true } : n,
      ),
    );
    setSelectedNotifications([]);
    setShowBulkActions(false);
  };

  const toggleSelectNotification = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id],
    );
  };

  const filteredNotifications = filterNotifications(notifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const importantCount = notifications.filter(
    (n) => n.isImportant || n.actionRequired,
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Bell className="w-8 h-8 mr-3 text-green-600" />
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-3 bg-red-500 hover:bg-red-500">
                    {unreadCount}
                  </Badge>
                )}
              </h1>
              <p className="text-gray-600">
                Stay updated with your orders and Near me community
              </p>
            </div>

            <div className="flex items-center space-x-2">
              {showBulkActions && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markSelectedAsRead}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Mark Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={deleteSelected}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowBulkActions(false);
                      setSelectedNotifications([]);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <Button variant="outline" onClick={markAllAsRead} size="sm">
                <CheckCircle className="w-4 h-4 mr-1" />
                Mark All Read
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkActions(!showBulkActions)}
              >
                <Filter className="w-4 h-4 mr-1" />
                Bulk Actions
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">
                All ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="important">
                Important ({importantCount})
              </TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="promotions">Offers</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-6">
              {filteredNotifications.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Bell className="w-16 h-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      No notifications
                    </h3>
                    <p className="text-gray-600 text-center">
                      {selectedTab === "unread"
                        ? "All caught up! No unread notifications."
                        : "No notifications in this category."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`transition-colors border-l-4 ${getNotificationColor(notification.type, notification.isImportant)} ${
                        !notification.isRead
                          ? "bg-opacity-100"
                          : "bg-opacity-30"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          {showBulkActions && (
                            <Checkbox
                              checked={selectedNotifications.includes(
                                notification.id,
                              )}
                              onCheckedChange={() =>
                                toggleSelectNotification(notification.id)
                              }
                              className="mt-1"
                            />
                          )}

                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(
                              notification.type,
                              notification.isImportant,
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4
                                    className={`font-medium ${
                                      !notification.isRead
                                        ? "text-gray-900"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {notification.title}
                                  </h4>
                                  {!notification.isRead && (
                                    <Dot className="w-4 h-4 text-blue-600 fill-current" />
                                  )}
                                  {notification.isImportant && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs bg-orange-100 text-orange-800"
                                    >
                                      Important
                                    </Badge>
                                  )}
                                  {notification.actionRequired && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs bg-red-100 text-red-800"
                                    >
                                      Action Required
                                    </Badge>
                                  )}
                                </div>

                                <p
                                  className={`text-sm leading-relaxed ${
                                    !notification.isRead
                                      ? "text-gray-800"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {notification.message}
                                </p>

                                <div className="flex items-center justify-between mt-3">
                                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <span className="flex items-center">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {notification.timestamp}
                                    </span>
                                    {notification.shopName && (
                                      <span className="flex items-center">
                                        <Store className="w-3 h-3 mr-1" />
                                        {notification.shopName}
                                      </span>
                                    )}
                                    {notification.orderNumber && (
                                      <span className="flex items-center">
                                        <Package className="w-3 h-3 mr-1" />
                                        {notification.orderNumber}
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    {notification.actionButton && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {notification.actionButton.text}
                                        <ChevronRight className="w-3 h-3 ml-1" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-1 ml-4">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    notification.isRead
                                      ? markAsUnread(notification.id)
                                      : markAsRead(notification.id)
                                  }
                                >
                                  {notification.isRead ? (
                                    <Mail className="w-4 h-4" />
                                  ) : (
                                    <CheckCircle className="w-4 h-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-700"
                                  onClick={() =>
                                    deleteNotification(notification.id)
                                  }
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Notification Settings */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Customize which notifications you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Order Updates</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Order confirmations</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Delivery updates</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Order completed</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Promotions & Rewards</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Special offers</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Loyalty point updates</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox />
                      <span className="text-sm">Weekly newsletters</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Community Updates</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">New shops nearby</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox />
                      <span className="text-sm">App feature updates</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">
                        Sustainability achievements
                      </span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Delivery Preferences</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">
                        Delivery agent approaching
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Delivery reminders</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox />
                      <span className="text-sm">Rate order reminders</span>
                    </label>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-600">
                    Get instant notifications on your device
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
