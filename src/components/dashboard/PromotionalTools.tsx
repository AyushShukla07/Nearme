import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Megaphone,
  Plus,
  Gift,
  Calendar as CalendarIcon,
  Clock,
  Target,
  TrendingUp,
  Users,
  Star,
  Share2,
  Edit,
  Trash2,
  Play,
  Pause,
  Eye,
  MessageSquare,
  Heart,
  Sparkles,
  Zap,
  Crown,
  Sun,
  Moon,
} from "lucide-react";

// Festival templates for Indian market
const festivalTemplates = [
  {
    id: 1,
    name: "Diwali Special",
    festival: "Diwali",
    type: "discount",
    discount: 25,
    description: "Festival of Lights celebration discount",
    icon: "🪔",
    color: "from-yellow-400 to-orange-500",
    items: ["Sweets", "Dry Fruits", "Decorative Items"],
  },
  {
    id: 2,
    name: "Holi Colors",
    festival: "Holi",
    type: "bundle",
    discount: 20,
    description: "Festival of Colors special bundle",
    icon: "🎨",
    color: "from-pink-400 to-purple-500",
    items: ["Organic Colors", "Sweets", "Snacks"],
  },
  {
    id: 3,
    name: "Eid Mubarak",
    festival: "Eid",
    type: "special",
    discount: 30,
    description: "Eid celebration special offers",
    icon: "🌙",
    color: "from-green-400 to-teal-500",
    items: ["Dates", "Sweets", "Festive Foods"],
  },
  {
    id: 4,
    name: "Raksha Bandhan",
    festival: "Raksha Bandhan",
    type: "combo",
    discount: 15,
    description: "Brother-Sister love celebration",
    icon: "🎗️",
    color: "from-red-400 to-pink-500",
    items: ["Sweets", "Dry Fruits", "Gifts"],
  },
  {
    id: 5,
    name: "Karva Chauth",
    festival: "Karva Chauth",
    type: "premium",
    discount: 35,
    description: "Special day for married couples",
    icon: "🌙",
    color: "from-purple-400 to-indigo-500",
    items: ["Premium Sweets", "Dry Fruits", "Decoration"],
  },
  {
    id: 6,
    name: "Navratri Special",
    festival: "Navratri",
    type: "fasting",
    discount: 20,
    description: "9 days of devotion special",
    icon: "🎭",
    color: "from-orange-400 to-red-500",
    items: ["Fasting Foods", "Fruits", "Milk Products"],
  },
];

// Existing promotions mock data
const existingPromotions = [
  {
    id: 1,
    title: "Monsoon Fresh Vegetables",
    type: "percentage",
    value: 15,
    status: "active",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    usageCount: 45,
    maxUsage: 100,
    applicableProducts: ["Vegetables", "Fruits"],
    revenue: 12500,
  },
  {
    id: 2,
    title: "Weekend Grocery Bundle",
    type: "buy_x_get_y",
    value: "Buy 3 Get 1 Free",
    status: "scheduled",
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    usageCount: 0,
    maxUsage: 50,
    applicableProducts: ["Groceries"],
    revenue: 0,
  },
  {
    id: 3,
    title: "First Order Special",
    type: "fixed",
    value: 50,
    status: "paused",
    startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    usageCount: 25,
    maxUsage: 200,
    applicableProducts: ["All Products"],
    revenue: 8750,
  },
];

const PromotionalTools = () => {
  const [promotions, setPromotions] = useState(existingPromotions);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [newPromotion, setNewPromotion] = useState({
    title: "",
    type: "percentage",
    value: "",
    description: "",
    startDate: undefined,
    endDate: undefined,
    maxUsage: "",
    applicableProducts: [],
    isActive: true,
  });

  const handleCreateFromTemplate = (template) => {
    setSelectedTemplate(template);
    setNewPromotion({
      title: template.name,
      type: template.type,
      value: template.discount.toString(),
      description: template.description,
      startDate: undefined,
      endDate: undefined,
      maxUsage: "100",
      applicableProducts: template.items,
      isActive: true,
    });
    setIsCreateModalOpen(true);
  };

  const handleCreatePromotion = () => {
    const promotion = {
      id: Date.now(),
      ...newPromotion,
      status: newPromotion.isActive ? "active" : "scheduled",
      usageCount: 0,
      revenue: 0,
    };
    setPromotions([...promotions, promotion]);
    setIsCreateModalOpen(false);
    setSelectedTemplate(null);
    setNewPromotion({
      title: "",
      type: "percentage",
      value: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      maxUsage: "",
      applicableProducts: [],
      isActive: true,
    });
  };

  const togglePromotionStatus = (id) => {
    setPromotions(
      promotions.map((promo) =>
        promo.id === id
          ? {
              ...promo,
              status:
                promo.status === "active"
                  ? "paused"
                  : promo.status === "paused"
                    ? "active"
                    : "active",
            }
          : promo,
      ),
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatPromotionValue = (type, value) => {
    switch (type) {
      case "percentage":
        return `${value}% OFF`;
      case "fixed":
        return `₹${value} OFF`;
      case "buy_x_get_y":
        return value;
      default:
        return value;
    }
  };

  return (
    <div className="space-y-6">
      {/* Promotion Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Active Promotions</p>
                <p className="text-2xl font-bold text-green-700">
                  {promotions.filter((p) => p.status === "active").length}
                </p>
              </div>
              <Megaphone className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Usage</p>
                <p className="text-2xl font-bold text-blue-700">
                  {promotions.reduce((sum, p) => sum + p.usageCount, 0)}
                </p>
              </div>
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Revenue Generated</p>
                <p className="text-2xl font-bold text-purple-700">
                  ₹
                  {promotions
                    .reduce((sum, p) => sum + p.revenue, 0)
                    .toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">Avg. Discount</p>
                <p className="text-2xl font-bold text-orange-700">18%</p>
              </div>
              <Target className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="active" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="active">Active Promotions</TabsTrigger>
            <TabsTrigger value="templates">Festival Templates</TabsTrigger>
            <TabsTrigger value="analytics">Performance</TabsTrigger>
          </TabsList>

          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Promotion
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  {selectedTemplate && (
                    <span className="mr-2 text-2xl">
                      {selectedTemplate.icon}
                    </span>
                  )}
                  {selectedTemplate
                    ? `Create ${selectedTemplate.name}`
                    : "Create New Promotion"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Promotion Title</Label>
                    <Input
                      id="title"
                      value={newPromotion.title}
                      onChange={(e) =>
                        setNewPromotion({
                          ...newPromotion,
                          title: e.target.value,
                        })
                      }
                      placeholder="Enter promotion title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Promotion Type</Label>
                    <Select
                      value={newPromotion.type}
                      onValueChange={(value) =>
                        setNewPromotion({ ...newPromotion, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">
                          Percentage Discount
                        </SelectItem>
                        <SelectItem value="fixed">Fixed Amount Off</SelectItem>
                        <SelectItem value="buy_x_get_y">Buy X Get Y</SelectItem>
                        <SelectItem value="bundle">Bundle Offer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newPromotion.description}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe your promotion"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="value">Discount Value</Label>
                    <Input
                      id="value"
                      value={newPromotion.value}
                      onChange={(e) =>
                        setNewPromotion({
                          ...newPromotion,
                          value: e.target.value,
                        })
                      }
                      placeholder={
                        newPromotion.type === "percentage" ? "25" : "100"
                      }
                    />
                  </div>

                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newPromotion.startDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newPromotion.startDate ? (
                            format(newPromotion.startDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newPromotion.startDate}
                          onSelect={(date) =>
                            setNewPromotion({
                              ...newPromotion,
                              startDate: date,
                            })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newPromotion.endDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newPromotion.endDate ? (
                            format(newPromotion.endDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newPromotion.endDate}
                          onSelect={(date) =>
                            setNewPromotion({ ...newPromotion, endDate: date })
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={newPromotion.isActive}
                    onCheckedChange={(checked) =>
                      setNewPromotion({ ...newPromotion, isActive: checked })
                    }
                  />
                  <Label htmlFor="active">Activate immediately</Label>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setSelectedTemplate(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreatePromotion}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Create Promotion
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="active" className="space-y-4">
          <AnimatePresence>
            {promotions.map((promotion, index) => (
              <motion.div
                key={promotion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                          <Megaphone className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {promotion.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(promotion.status)}>
                              {promotion.status}
                            </Badge>
                            <Badge variant="outline">
                              {formatPromotionValue(
                                promotion.type,
                                promotion.value,
                              )}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePromotionStatus(promotion.id)}
                        >
                          {promotion.status === "active" ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Usage</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-green-500 rounded-full"
                              style={{
                                width: `${(promotion.usageCount / promotion.maxUsage) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {promotion.usageCount}/{promotion.maxUsage}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">
                          Revenue Generated
                        </p>
                        <p className="font-semibold text-green-600">
                          ₹{promotion.revenue.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="text-sm font-medium">
                          {format(promotion.startDate, "MMM dd")} -{" "}
                          {format(promotion.endDate, "MMM dd")}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Products</p>
                        <p className="text-sm font-medium">
                          {promotion.applicableProducts.join(", ")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {festivalTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div
                        className={cn(
                          "w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl",
                          `bg-gradient-to-br ${template.color}`,
                        )}
                      >
                        {template.icon}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {template.description}
                        </p>
                        <Badge className="bg-purple-100 text-purple-800">
                          {template.discount}% OFF
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Applicable Items:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.items.map((item) => (
                            <Badge
                              key={item}
                              variant="outline"
                              className="text-xs"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={() => handleCreateFromTemplate(template)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 group-hover:scale-105 transition-transform"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-yellow-800">
                    Premium Festival Templates
                  </h3>
                  <p className="text-sm text-yellow-700">
                    Unlock regional festival templates like Onam, Durga Puja,
                    Baisakhi, and more with localized content
                  </p>
                </div>
                <Button className="bg-yellow-600 hover:bg-yellow-700">
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Promotion Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {promotions.slice(0, 3).map((promo) => (
                    <div
                      key={promo.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{promo.title}</h4>
                        <p className="text-sm text-gray-600">
                          {promo.usageCount} uses • ₹
                          {promo.revenue.toLocaleString()} revenue
                        </p>
                      </div>
                      <Badge className={getStatusColor(promo.status)}>
                        {promo.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Performing Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vegetables & Fruits</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-14 h-2 bg-green-500 rounded-full" />
                      </div>
                      <span className="text-sm">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dairy Products</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-12 h-2 bg-blue-500 rounded-full" />
                      </div>
                      <span className="text-sm">70%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Snacks & Beverages</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-10 h-2 bg-purple-500 rounded-full" />
                      </div>
                      <span className="text-sm">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Household Items</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-8 h-2 bg-orange-500 rounded-full" />
                      </div>
                      <span className="text-sm">45%</span>
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

export default PromotionalTools;
