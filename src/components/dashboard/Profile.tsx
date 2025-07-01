import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Store,
  Phone,
  Mail,
  MapPin,
  Edit,
  Camera,
  Shield,
  Package,
  ShoppingCart,
  Settings,
  FileText,
  CreditCard,
  Bell,
  LogOut,
  Upload,
  Eye,
  CheckCircle,
  AlertCircle,
  Building,
  Hash,
  Calendar,
  Clock,
} from "lucide-react";
import ProfileEditModal from "./ProfileEditModal";
import ShopDetailsModal from "./ShopDetailsModal";
import AccountSettingsModal from "./AccountSettingsModal";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = ({ onNavigateToTab, onOpenSettings }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isShopDetailsOpen, setIsShopDetailsOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // Mock data - in real app this would come from user context/API
  const profileData = {
    name: user?.name || "Rajesh Kumar",
    shopName: user?.shopName || "Green Valley Grocers",
    shopId: user?.shopId || "GVG-12345",
    email: user?.email || "rajesh@greenvalley.com",
    phone: "+91 98765 43210",
    role: "Shop Owner",
    shopCategory: "Grocery & General Store",
    address: "123 Main Street, Downtown, Mumbai - 400001",
    businessType: "Sole Proprietorship",
    joinDate: "March 2023",
    documentsStatus: {
      aadhar: { status: "verified", uploadDate: "15 Mar 2023" },
      gst: { status: "verified", uploadDate: "16 Mar 2023" },
      pan: { status: "pending", uploadDate: "20 Mar 2023" },
    },
    shopDescription:
      "Fresh groceries, organic vegetables, and daily essentials delivered with care to your doorstep.",
    totalOrders: 2847,
    rating: 4.8,
    totalReviews: 156,
  };

  const quickLinks = [
    {
      title: "Inventory Management",
      description: "Manage products, stock levels, and pricing",
      icon: Package,
      color: "blue",
      action: () => onNavigateToTab("inventory"),
    },
    {
      title: "Order Management",
      description: "Review, modify, and track customer orders",
      icon: ShoppingCart,
      color: "green",
      action: () => onNavigateToTab("orders"),
    },
    {
      title: "Dashboard Settings",
      description: "Comprehensive dashboard management",
      icon: Settings,
      color: "purple",
      action: () => onOpenSettings(),
    },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignOut = () => {
    if (
      window.confirm(
        "Are you sure you want to sign out of your shop dashboard?",
      )
    ) {
      try {
        // Clear any local data and logout
        logout();

        // Show brief loading state and redirect
        setTimeout(() => {
          // Redirect to main login page
          navigate("/");
        }, 500);
      } catch (error) {
        console.error("Error signing out:", error);
        // Still redirect even if there's an error
        navigate("/");
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Picture */}
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={profileImage} alt={profileData.name} />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-2xl font-bold">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <Camera className="w-4 h-4 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {profileData.name}
                    </h1>
                    <div className="flex items-center space-x-2 mb-2">
                      <Store className="w-5 h-5 text-green-600" />
                      <span className="text-xl font-semibold text-green-700">
                        {profileData.shopName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Hash className="w-4 h-4" />
                        <span>Shop ID: {profileData.shopId}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Since {profileData.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsProfileEditOpen(true)}
                    className="bg-green-600 hover:bg-green-700 mt-4 md:mt-0"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-green-600">
                      {profileData.totalOrders.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-yellow-600">
                      {profileData.rating}★
                    </div>
                    <div className="text-sm text-gray-600">
                      {profileData.totalReviews} Reviews
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-lg font-bold text-blue-600">
                      {profileData.shopCategory}
                    </div>
                    <div className="text-sm text-gray-600">Category</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Person</p>
                    <p className="font-semibold">
                      {profileData.name} ({profileData.role})
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Primary Phone</p>
                    <p className="font-semibold">{profileData.phone}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="font-semibold">{profileData.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Shop Address</p>
                    <p className="font-semibold">{profileData.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Links to Core Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all"
                  onClick={link.action}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 bg-${link.color}-100 rounded-lg flex items-center justify-center`}
                    >
                      <link.icon className={`w-6 h-6 text-${link.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {link.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Shop Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2 text-green-600" />
                My Shop Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Business Type</p>
                  <p className="font-semibold">{profileData.businessType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Shop Description</p>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {profileData.shopDescription}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-3">
                    Document Status
                  </p>
                  <div className="space-y-2">
                    {Object.entries(profileData.documentsStatus).map(
                      ([doc, info]) => (
                        <div
                          key={doc}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(info.status)}
                            <span className="text-sm capitalize">
                              {doc} Card
                            </span>
                          </div>
                          <Badge className={getStatusColor(info.status)}>
                            {info.status}
                          </Badge>
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => setIsShopDetailsOpen(true)}
                  variant="outline"
                  className="w-full"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Manage Shop Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* My Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                My Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">
                      Security Status
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Password Protection</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Two-Factor Authentication</span>
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setIsAccountSettingsOpen(true)}
                  variant="outline"
                  className="w-full"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>

                <Separator />

                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modals */}
      <ProfileEditModal
        isOpen={isProfileEditOpen}
        onClose={() => setIsProfileEditOpen(false)}
        profileData={profileData}
      />

      <ShopDetailsModal
        isOpen={isShopDetailsOpen}
        onClose={() => setIsShopDetailsOpen(false)}
        shopData={profileData}
      />

      <AccountSettingsModal
        isOpen={isAccountSettingsOpen}
        onClose={() => setIsAccountSettingsOpen(false)}
        profileData={profileData}
      />
    </div>
  );
};

export default Profile;
