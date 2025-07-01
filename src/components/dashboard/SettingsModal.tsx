import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Store,
  Bell,
  CreditCard,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Shield,
  Smartphone,
  Volume2,
  Eye,
  FileText,
  Users,
  Truck,
  MessageCircle,
  Save,
  X,
  LogOut,
} from "lucide-react";

const SettingsModal = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    // Shop Details
    shopName: "Green Valley Grocers",
    shopDescription: "Fresh organic vegetables and fruits from local farms",
    shopAddress: "123 Main Street, Downtown, Mumbai, Maharashtra 400001",
    shopPhone: "+91 98765 43210",
    shopEmail: "owner@greenvalley.com",
    openingTime: "06:00",
    closingTime: "22:00",
    shopStatus: "open",

    // Business Hours
    monday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
    tuesday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
    wednesday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
    thursday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
    friday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
    saturday: { isOpen: true, openTime: "06:00", closeTime: "23:00" },
    sunday: { isOpen: true, openTime: "07:00", closeTime: "21:00" },

    // Notifications
    newOrderNotifications: true,
    orderStatusNotifications: true,
    paymentNotifications: true,
    reviewNotifications: true,
    promotionNotifications: true,
    soundNotifications: true,
    whatsappNotifications: true,
    emailNotifications: true,

    // Payment & Settlement
    bankAccountName: "Green Valley Grocers Pvt Ltd",
    bankAccountNumber: "123456789012",
    ifscCode: "HDFC0001234",
    upiId: "greenvalley@paytm",
    gstNumber: "27AAAAA0000A1Z5",
    panNumber: "AAAAA1234A",

    // Delivery Settings
    deliveryRadius: "500", // meters
    deliveryCharges: "30", // INR
    freeDeliveryMinOrder: "500", // INR
    estimatedDeliveryTime: "30", // minutes

    // Language & Localization
    primaryLanguage: "english",
    secondaryLanguage: "hindi",
    currencyDisplay: "INR",
    priceFormat: "₹{amount}",

    // Privacy & Security
    profileVisibility: "public",
    dataSharing: false,
    analyticsTracking: true,
    twoFactorAuth: false,
  });

  const handleSave = () => {
    // Save settings logic here
    console.log("Saving settings:", settings);
    onClose();
  };

  const handleSignOut = () => {
    if (
      window.confirm(
        "Are you sure you want to sign out of your shop dashboard?",
      )
    ) {
      try {
        onClose();
        logout();
        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch (error) {
        console.error("Error signing out:", error);
        navigate("/");
      }
    }
  };

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updateBusinessHours = (day, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Settings className="w-6 h-6 mr-2 text-green-600" />
            Dashboard Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="shop" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="shop" className="flex items-center gap-1">
              <Store className="w-4 h-4" />
              <span className="hidden md:inline">Shop</span>
            </TabsTrigger>
            <TabsTrigger value="hours" className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="hidden md:inline">Hours</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-1"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden md:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-1">
              <CreditCard className="w-4 h-4" />
              <span className="hidden md:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="delivery" className="flex items-center gap-1">
              <Truck className="w-4 h-4" />
              <span className="hidden md:inline">Delivery</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span className="hidden md:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="shop" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shop Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shopName">Shop Name</Label>
                      <Input
                        id="shopName"
                        value={settings.shopName}
                        onChange={(e) =>
                          updateSetting("shopName", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="shopPhone">Phone Number</Label>
                      <Input
                        id="shopPhone"
                        value={settings.shopPhone}
                        onChange={(e) =>
                          updateSetting("shopPhone", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shopDescription">Shop Description</Label>
                    <Textarea
                      id="shopDescription"
                      value={settings.shopDescription}
                      onChange={(e) =>
                        updateSetting("shopDescription", e.target.value)
                      }
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="shopAddress">Complete Address</Label>
                    <Textarea
                      id="shopAddress"
                      value={settings.shopAddress}
                      onChange={(e) =>
                        updateSetting("shopAddress", e.target.value)
                      }
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shopEmail">Email Address</Label>
                      <Input
                        id="shopEmail"
                        type="email"
                        value={settings.shopEmail}
                        onChange={(e) =>
                          updateSetting("shopEmail", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="shopStatus">Current Status</Label>
                      <Select
                        value={settings.shopStatus}
                        onValueChange={(value) =>
                          updateSetting("shopStatus", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                          <SelectItem value="break">On Break</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hours" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {days.map((day) => (
                      <div
                        key={day.key}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Switch
                            checked={settings[day.key].isOpen}
                            onCheckedChange={(checked) =>
                              updateBusinessHours(day.key, "isOpen", checked)
                            }
                          />
                          <span className="font-medium w-20">{day.label}</span>
                        </div>

                        {settings[day.key].isOpen && (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="time"
                              value={settings[day.key].openTime}
                              onChange={(e) =>
                                updateBusinessHours(
                                  day.key,
                                  "openTime",
                                  e.target.value,
                                )
                              }
                              className="w-24"
                            />
                            <span>to</span>
                            <Input
                              type="time"
                              value={settings[day.key].closeTime}
                              onChange={(e) =>
                                updateBusinessHours(
                                  day.key,
                                  "closeTime",
                                  e.target.value,
                                )
                              }
                              className="w-24"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>New Order Alerts</Label>
                        <p className="text-sm text-gray-600">
                          Get notified for new orders
                        </p>
                      </div>
                      <Switch
                        checked={settings.newOrderNotifications}
                        onCheckedChange={(checked) =>
                          updateSetting("newOrderNotifications", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Order Status Updates</Label>
                        <p className="text-sm text-gray-600">
                          Order status changes
                        </p>
                      </div>
                      <Switch
                        checked={settings.orderStatusNotifications}
                        onCheckedChange={(checked) =>
                          updateSetting("orderStatusNotifications", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Payment Notifications</Label>
                        <p className="text-sm text-gray-600">
                          Payment confirmations
                        </p>
                      </div>
                      <Switch
                        checked={settings.paymentNotifications}
                        onCheckedChange={(checked) =>
                          updateSetting("paymentNotifications", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Review Alerts</Label>
                        <p className="text-sm text-gray-600">
                          New customer reviews
                        </p>
                      </div>
                      <Switch
                        checked={settings.reviewNotifications}
                        onCheckedChange={(checked) =>
                          updateSetting("reviewNotifications", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Sound Notifications</Label>
                        <p className="text-sm text-gray-600">Audio alerts</p>
                      </div>
                      <Switch
                        checked={settings.soundNotifications}
                        onCheckedChange={(checked) =>
                          updateSetting("soundNotifications", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>WhatsApp Notifications</Label>
                        <p className="text-sm text-gray-600">WhatsApp alerts</p>
                      </div>
                      <Switch
                        checked={settings.whatsappNotifications}
                        onCheckedChange={(checked) =>
                          updateSetting("whatsappNotifications", checked)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment & Settlement Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bankAccountName">Bank Account Name</Label>
                      <Input
                        id="bankAccountName"
                        value={settings.bankAccountName}
                        onChange={(e) =>
                          updateSetting("bankAccountName", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="bankAccountNumber">Account Number</Label>
                      <Input
                        id="bankAccountNumber"
                        value={settings.bankAccountNumber}
                        onChange={(e) =>
                          updateSetting("bankAccountNumber", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <Input
                        id="ifscCode"
                        value={settings.ifscCode}
                        onChange={(e) =>
                          updateSetting("ifscCode", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        value={settings.upiId}
                        onChange={(e) => updateSetting("upiId", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="gstNumber">GST Number</Label>
                      <Input
                        id="gstNumber"
                        value={settings.gstNumber}
                        onChange={(e) =>
                          updateSetting("gstNumber", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="panNumber">PAN Number</Label>
                      <Input
                        id="panNumber"
                        value={settings.panNumber}
                        onChange={(e) =>
                          updateSetting("panNumber", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delivery" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deliveryRadius">
                        Delivery Radius (meters)
                      </Label>
                      <Input
                        id="deliveryRadius"
                        type="number"
                        value={settings.deliveryRadius}
                        onChange={(e) =>
                          updateSetting("deliveryRadius", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryCharges">
                        Delivery Charges (₹)
                      </Label>
                      <Input
                        id="deliveryCharges"
                        type="number"
                        value={settings.deliveryCharges}
                        onChange={(e) =>
                          updateSetting("deliveryCharges", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="freeDeliveryMinOrder">
                        Free Delivery Above (₹)
                      </Label>
                      <Input
                        id="freeDeliveryMinOrder"
                        type="number"
                        value={settings.freeDeliveryMinOrder}
                        onChange={(e) =>
                          updateSetting("freeDeliveryMinOrder", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="estimatedDeliveryTime">
                        Est. Delivery Time (mins)
                      </Label>
                      <Input
                        id="estimatedDeliveryTime"
                        type="number"
                        value={settings.estimatedDeliveryTime}
                        onChange={(e) =>
                          updateSetting("estimatedDeliveryTime", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Language & Localization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Primary Language</Label>
                      <Select
                        value={settings.primaryLanguage}
                        onValueChange={(value) =>
                          updateSetting("primaryLanguage", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">हिंदी</SelectItem>
                          <SelectItem value="marathi">मर���ठी</SelectItem>
                          <SelectItem value="gujarati">ગુજરાતી</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Secondary Language</Label>
                      <Select
                        value={settings.secondaryLanguage}
                        onValueChange={(value) =>
                          updateSetting("secondaryLanguage", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hindi">हिंदी</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="marathi">मराठी</SelectItem>
                          <SelectItem value="gujarati">ગુજરાતી</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">
                        Extra security for your account
                      </p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        updateSetting("twoFactorAuth", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Analytics Tracking</Label>
                      <p className="text-sm text-gray-600">
                        Help improve our services
                      </p>
                    </div>
                    <Switch
                      checked={settings.analyticsTracking}
                      onCheckedChange={(checked) =>
                        updateSetting("analyticsTracking", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Sharing</Label>
                      <p className="text-sm text-gray-600">
                        Share data with partners
                      </p>
                    </div>
                    <Switch
                      checked={settings.dataSharing}
                      onCheckedChange={(checked) =>
                        updateSetting("dataSharing", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
