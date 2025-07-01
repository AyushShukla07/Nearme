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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Plus,
  Trash2,
  Star,
  Heart,
  Calendar,
  CreditCard,
  Bell,
  Shield,
  Globe,
  LogOut,
  Camera,
  Save,
  X,
  Clock,
  Store,
  Package,
  ChevronRight,
  Award,
  Gift,
  Settings,
  Home,
  Truck,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Crown,
  Zap,
  Target,
} from "lucide-react";

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Ayush Shukla",
    email: "sarah.johnson@email.com",
    phone: "+91 98765 43210",
    profileImage: "/api/placeholder/100/100",
    joinedDate: "March 2024",
    loyaltyTier: "Gold",
    loyaltyPoints: 1240,
    addresses: [
      {
        id: 1,
        type: "Home",
        address: "123 Green Street, Downtown Area",
        city: "Mumbai",
        pincode: "400001",
        isDefault: true,
      },
      {
        id: 2,
        type: "Office",
        address: "456 Business Park, Tech Hub",
        city: "Mumbai",
        pincode: "400070",
        isDefault: false,
      },
    ],
    paymentMethods: [
      {
        id: 1,
        type: "credit",
        lastFour: "4532",
        brand: "Visa",
        expiryMonth: "12",
        expiryYear: "25",
        isDefault: true,
      },
      {
        id: 2,
        type: "debit",
        lastFour: "7890",
        brand: "Mastercard",
        expiryMonth: "08",
        expiryYear: "26",
        isDefault: false,
      },
    ],
  });

  const favoriteShops = [
    {
      id: 1,
      name: "Green Valley Grocers",
      category: "Grocery",
      rating: 4.8,
      deliveryTime: "8-12 min",
      lastOrdered: "2 days ago",
      image: "/api/placeholder/60/60",
    },
    {
      id: 2,
      name: "Artisan Bakery Corner",
      category: "Bakery",
      rating: 4.9,
      deliveryTime: "5-8 min",
      lastOrdered: "1 week ago",
      image: "/api/placeholder/60/60",
    },
    {
      id: 3,
      name: "Urban Organic Market",
      category: "Organic",
      rating: 4.7,
      deliveryTime: "10-15 min",
      lastOrdered: "3 days ago",
      image: "/api/placeholder/60/60",
    },
  ];

  const favoriteItems = [
    {
      id: 1,
      name: "Organic Bananas",
      shop: "Green Valley Grocers",
      price: 45,
      image: "/api/placeholder/50/50",
      orderCount: 12,
    },
    {
      id: 2,
      name: "Sourdough Bread",
      shop: "Artisan Bakery Corner",
      price: 80,
      image: "/api/placeholder/50/50",
      orderCount: 8,
    },
    {
      id: 3,
      name: "Fresh Spinach",
      shop: "Urban Organic Market",
      price: 30,
      image: "/api/placeholder/50/50",
      orderCount: 15,
    },
  ];

  const scheduledDeliveries = [
    {
      id: 1,
      orderNumber: "ORD-2024-045",
      shopName: "Green Valley Grocers",
      scheduledDate: "Tomorrow, 10:00 AM",
      items: 5,
      total: 320,
      status: "confirmed",
    },
    {
      id: 2,
      orderNumber: "ORD-2024-046",
      shopName: "Artisan Bakery Corner",
      scheduledDate: "Sunday, 8:00 AM",
      items: 3,
      total: 180,
      status: "confirmed",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-2024-043",
      date: "Yesterday",
      shop: "Green Valley Grocers",
      total: 275,
      status: "delivered",
    },
    {
      id: "ORD-2024-042",
      date: "Dec 20",
      shop: "Urban Organic Market",
      total: 450,
      status: "delivered",
    },
    {
      id: "ORD-2024-041",
      date: "Dec 18",
      shop: "Artisan Bakery Corner",
      total: 120,
      status: "delivered",
    },
  ];

  const loyaltyTiers = [
    { name: "Bronze", minPoints: 0, benefits: "5% cashback" },
    { name: "Silver", minPoints: 500, benefits: "8% cashback + Free delivery" },
    {
      name: "Gold",
      minPoints: 1000,
      benefits: "12% cashback + Priority support",
    },
    {
      name: "Platinum",
      minPoints: 2000,
      benefits: "15% cashback + Exclusive offers",
    },
  ];

  const getCurrentTierProgress = () => {
    const currentTier = loyaltyTiers.find(
      (tier) => tier.name === userData.loyaltyTier,
    );
    const nextTier = loyaltyTiers.find(
      (tier) => tier.minPoints > userData.loyaltyPoints,
    );

    if (!nextTier) return { progress: 100, pointsNeeded: 0, nextTier: null };

    const currentTierPoints =
      currentTier?.minPoints || loyaltyTiers[0].minPoints;
    const pointsInCurrentTier = userData.loyaltyPoints - currentTierPoints;
    const pointsNeededForNext = nextTier.minPoints - currentTierPoints;
    const progress = (pointsInCurrentTier / pointsNeededForNext) * 100;

    return {
      progress,
      pointsNeeded: nextTier.minPoints - userData.loyaltyPoints,
      nextTier,
    };
  };

  const tierProgress = getCurrentTierProgress();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userData.profileImage} />
                <AvatarFallback className="text-xl">
                  <p>AS</p>
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-medium text-gray-900">
                  <p>Ayush Shukla</p>
                </h1>
                <p className="text-gray-600">
                  Member since {userData.joinedDate}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    <Crown className="w-3 h-3 mr-1" />
                    {userData.loyaltyTier} Member
                  </Badge>
                  <Badge variant="outline">
                    {userData.loyaltyPoints} Points
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="loyalty">Rewards</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Personal Information</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? (
                            <>
                              <X className="w-4 h-4 mr-1" />
                              Cancel
                            </>
                          ) : (
                            <>
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={userData.name}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userData.email}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={userData.phone}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label>Profile Picture</Label>
                          <div className="flex items-center space-x-3 mt-1">
                            <Avatar>
                              <AvatarImage src={userData.profileImage} />
                              <AvatarFallback>
                                {userData.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {isEditing && (
                              <Button variant="outline" size="sm">
                                <Camera className="w-4 h-4 mr-1" />
                                Change
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      {isEditing && (
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700">
                            <Save className="w-4 h-4 mr-1" />
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Delivery Addresses */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Delivery Addresses</CardTitle>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Address
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {userData.addresses.map((address) => (
                        <div
                          key={address.id}
                          className="border rounded-lg p-4 flex items-start justify-between"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge
                                variant={
                                  address.type === "Home"
                                    ? "default"
                                    : "outline"
                                }
                              >
                                <Home className="w-3 h-3 mr-1" />
                                {address.type}
                              </Badge>
                              {address.isDefault && (
                                <Badge variant="secondary">Default</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-700">
                              {address.address}
                            </p>
                            <p className="text-sm text-gray-500">
                              {address.city} - {address.pincode}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Order History
                        <Button variant="ghost" size="sm" asChild>
                          <a href="/orders">
                            View All
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </a>
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between py-2 border-b last:border-b-0"
                        >
                          <div>
                            <p className="font-medium text-sm">{order.shop}</p>
                            <p className="text-xs text-gray-500">
                              {order.date} • ₹{order.total}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-green-600 border-green-200"
                          >
                            {order.status}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Total Orders
                        </span>
                        <span className="font-semibold">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Money Saved
                        </span>
                        <span className="font-semibold text-green-600">
                          ₹2,340
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">CO₂ Saved</span>
                        <span className="font-semibold text-blue-600">
                          15.2 kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Favorite Shops
                        </span>
                        <span className="font-semibold">
                          {favoriteShops.length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Favorite Shops */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Store className="w-5 h-5 mr-2" />
                      Favorite Shops ({favoriteShops.length})
                    </CardTitle>
                    <CardDescription>
                      Your most loved shops for quick reordering
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {favoriteShops.map((shop) => (
                      <div
                        key={shop.id}
                        className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <img
                          src={shop.image}
                          alt={shop.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{shop.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{shop.category}</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                              {shop.rating}
                            </div>
                            <span>•</span>
                            <span>{shop.deliveryTime}</span>
                          </div>
                          <p className="text-xs text-gray-400">
                            Last ordered: {shop.lastOrdered}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            Order Again
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Favorite Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Favorite Items ({favoriteItems.length})
                    </CardTitle>
                    <CardDescription>
                      Your frequently ordered products
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {favoriteItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.shop}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-lg font-semibold text-green-600">
                              ₹{item.price}
                            </span>
                            <span className="text-xs text-gray-400">
                              Ordered {item.orderCount} times
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Add to Cart
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Scheduled Deliveries Tab */}
            <TabsContent value="scheduled" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Scheduled Deliveries
                      </CardTitle>
                      <CardDescription>
                        Manage your upcoming pre-scheduled orders
                      </CardDescription>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-1" />
                      Schedule New Order
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {scheduledDeliveries.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No scheduled deliveries
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Plan ahead by scheduling your regular orders
                      </p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        Schedule Your First Order
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {scheduledDeliveries.map((delivery) => (
                        <div
                          key={delivery.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-semibold">
                                  {delivery.shopName}
                                </h4>
                                <Badge className="bg-blue-100 text-blue-800">
                                  {delivery.status}
                                </Badge>
                              </div>
                              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {delivery.scheduledDate}
                                </div>
                                <div className="flex items-center">
                                  <Package className="w-4 h-4 mr-1" />
                                  {delivery.items} items
                                </div>
                                <div className="flex items-center">
                                  <span className="font-semibold text-gray-900">
                                    ₹{delivery.total}
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 mt-2">
                                Order #{delivery.orderNumber}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Modify
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                              >
                                <X className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Loyalty Points Tab */}
            <TabsContent value="loyalty" className="mt-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Current Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Crown className="w-5 h-5 mr-2 text-yellow-600" />
                        {userData.loyaltyTier} Member Status
                      </CardTitle>
                      <CardDescription>
                        You have {userData.loyaltyPoints} loyalty points
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Progress to{" "}
                            {tierProgress.nextTier?.name || "Max Level"}
                          </span>
                          <span className="text-sm text-gray-500">
                            {tierProgress.pointsNeeded > 0
                              ? `${tierProgress.pointsNeeded} points to go`
                              : "Max level reached!"}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${tierProgress.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Loyalty Tiers */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Loyalty Tiers</CardTitle>
                      <CardDescription>
                        Unlock more benefits as you earn points
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {loyaltyTiers.map((tier, index) => (
                          <div
                            key={tier.name}
                            className={`p-4 rounded-lg border ${
                              tier.name === userData.loyaltyTier
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    tier.minPoints <= userData.loyaltyPoints
                                      ? "bg-yellow-500"
                                      : "bg-gray-300"
                                  }`}
                                ></div>
                                <div>
                                  <h4 className="font-semibold">{tier.name}</h4>
                                  <p className="text-sm text-gray-600">
                                    {tier.benefits}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  {tier.minPoints}+ points
                                </p>
                                {tier.name === userData.loyaltyTier && (
                                  <Badge className="bg-yellow-100 text-yellow-800 mt-1">
                                    Current
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* How to Earn Points */}
                  <Card>
                    <CardHeader>
                      <CardTitle>How to Earn Points</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <Target className="w-8 h-8 text-green-600" />
                          <div>
                            <h4 className="font-medium">Every Order</h4>
                            <p className="text-sm text-gray-600">
                              Earn 1 point per ₹10 spent
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <Star className="w-8 h-8 text-blue-600" />
                          <div>
                            <h4 className="font-medium">Reviews</h4>
                            <p className="text-sm text-gray-600">
                              Get 25 points for each review
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                          <Gift className="w-8 h-8 text-purple-600" />
                          <div>
                            <h4 className="font-medium">Referrals</h4>
                            <p className="text-sm text-gray-600">
                              Earn 100 points per referral
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                          <Zap className="w-8 h-8 text-orange-600" />
                          <div>
                            <h4 className="font-medium">Challenges</h4>
                            <p className="text-sm text-gray-600">
                              Complete weekly sustainability goals
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Redemption Options */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Redeem Points</CardTitle>
                      <CardDescription>
                        Use your {userData.loyaltyPoints} points
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">₹50 Off</h4>
                          <span className="text-sm text-gray-500">
                            250 points
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          disabled={userData.loyaltyPoints < 250}
                        >
                          Redeem
                        </Button>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Free Delivery</h4>
                          <span className="text-sm text-gray-500">
                            100 points
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          disabled={userData.loyaltyPoints < 100}
                        >
                          Redeem
                        </Button>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">₹200 Off</h4>
                          <span className="text-sm text-gray-500">
                            1000 points
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          disabled={userData.loyaltyPoints < 1000}
                        >
                          Redeem
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Point History</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Order completed</span>
                        <span className="text-green-600 font-medium">+45</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Review posted</span>
                        <span className="text-green-600 font-medium">+25</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Redeemed discount</span>
                        <span className="text-red-600 font-medium">-250</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Referral bonus</span>
                        <span className="text-green-600 font-medium">+100</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <div className="space-y-6">
                {/* Notification Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose how you want to be notified about your orders and
                      updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Order Updates</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="order-push">
                              Push notifications
                            </Label>
                            <Switch id="order-push" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="order-email">Email</Label>
                            <Switch id="order-email" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="order-sms">SMS</Label>
                            <Switch id="order-sms" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Promotions</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="promo-push">
                              Push notifications
                            </Label>
                            <Switch id="promo-push" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="promo-email">Email</Label>
                            <Switch id="promo-email" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="promo-sms">SMS</Label>
                            <Switch id="promo-sms" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Community</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="community-push">New shops</Label>
                            <Switch id="community-push" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="sustainability">
                              Sustainability updates
                            </Label>
                            <Switch id="sustainability" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="weekly">Weekly newsletter</Label>
                            <Switch id="weekly" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <CreditCard className="w-5 h-5 mr-2" />
                          Payment Methods
                        </CardTitle>
                        <CardDescription>
                          Manage your saved payment methods
                        </CardDescription>
                      </div>
                      <Button variant="outline">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Card
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userData.paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="border rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-sm font-bold">
                            {method.brand}
                          </div>
                          <div>
                            <p className="font-medium">
                              •••• •••• •••• {method.lastFour}
                            </p>
                            <p className="text-sm text-gray-500">
                              Expires {method.expiryMonth}/{method.expiryYear}
                            </p>
                          </div>
                          {method.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* App Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      App Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Language</Label>
                        <p className="text-sm text-gray-500">
                          Choose your preferred language
                        </p>
                      </div>
                      <Select defaultValue="en">
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="mr">Marathi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Dark mode</Label>
                        <p className="text-sm text-gray-500">
                          Switch to dark theme
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Location services</Label>
                        <p className="text-sm text-gray-500">
                          Allow location access for better shop discovery
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="mt-6">
              <div className="space-y-6">
                {/* Password & Security */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Password & Security
                    </CardTitle>
                    <CardDescription>Keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700">
                        Update Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Two-Factor Authentication */}
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Authentication</p>
                        <p className="text-sm text-gray-500">
                          Receive verification codes via SMS
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                {/* Privacy Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Profile visibility</Label>
                        <p className="text-sm text-gray-500">
                          Control who can see your profile information
                        </p>
                      </div>
                      <Select defaultValue="private">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Data collection</Label>
                        <p className="text-sm text-gray-500">
                          Allow us to collect usage data to improve our service
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Marketing communications</Label>
                        <p className="text-sm text-gray-500">
                          Receive promotional emails and offers
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                {/* Account Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>
                      Irreversible actions for your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                      <div>
                        <p className="font-medium text-red-600">
                          Delete Account
                        </p>
                        <p className="text-sm text-gray-500">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Sign Out */}
                <Card>
                  <CardContent className="pt-6">
                    <Button variant="outline" className="w-full" size="lg">
                      <LogOut className="w-5 h-5 mr-2" />
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
