import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  Target,
  Percent,
  Gift,
  Tag,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  X,
  Eye,
  Share2,
  Copy,
  Star,
  Zap,
  Sparkles,
} from "lucide-react";

interface Promotion {
  id: string;
  name: string;
  type: "discount" | "bogo" | "free_delivery" | "bundle";
  description: string;
  discountValue: number;
  discountType: "percentage" | "fixed";
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  targetAudience: "all" | "new" | "returning" | "vip";
  minOrderValue?: number;
  usageLimit?: number;
  usedCount: number;
  productsApplied: string[];
  performance: {
    views: number;
    clicks: number;
    conversions: number;
    revenue: number;
  };
}

const PromotionalTools = () => {
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const [isCreatingPromo, setIsCreatingPromo] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: "1",
      name: "Weekend Fresh Sale",
      type: "discount",
      description: "20% off on all fresh fruits and vegetables",
      discountValue: 20,
      discountType: "percentage",
      startDate: new Date("2024-01-20"),
      endDate: new Date("2024-01-22"),
      isActive: true,
      targetAudience: "all",
      minOrderValue: 200,
      usageLimit: 100,
      usedCount: 34,
      productsApplied: ["Fruits", "Vegetables"],
      performance: {
        views: 256,
        clicks: 89,
        conversions: 34,
        revenue: 8500,
      },
    },
    {
      id: "2",
      name: "New Customer Welcome",
      type: "free_delivery",
      description: "Free delivery for first-time customers",
      discountValue: 0,
      discountType: "fixed",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-01-31"),
      isActive: true,
      targetAudience: "new",
      usageLimit: 50,
      usedCount: 18,
      productsApplied: [],
      performance: {
        views: 145,
        clicks: 42,
        conversions: 18,
        revenue: 2700,
      },
    },
    {
      id: "3",
      name: "Buy 2 Get 1 Free",
      type: "bogo",
      description: "Buy 2 dairy products, get 1 free",
      discountValue: 0,
      discountType: "percentage",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-01-25"),
      isActive: false,
      targetAudience: "all",
      usageLimit: 75,
      usedCount: 23,
      productsApplied: ["Dairy"],
      performance: {
        views: 189,
        clicks: 67,
        conversions: 23,
        revenue: 4200,
      },
    },
  ]);

  const [newPromo, setNewPromo] = useState<Partial<Promotion>>({
    name: "",
    type: "discount",
    description: "",
    discountValue: 0,
    discountType: "percentage",
    targetAudience: "all",
    isActive: true,
    productsApplied: [],
    usageLimit: 0,
    minOrderValue: 0,
  });

  const promoTemplates = [
    {
      name: "Flash Sale",
      type: "discount",
      description: "Limited time discount on selected items",
      discountValue: 25,
      discountType: "percentage",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      name: "Free Delivery",
      type: "free_delivery",
      description: "Free delivery on orders above minimum value",
      discountValue: 0,
      discountType: "fixed",
      icon: <Gift className="w-5 h-5" />,
    },
    {
      name: "Buy One Get One",
      type: "bogo",
      description: "Buy one item, get another free",
      discountValue: 0,
      discountType: "percentage",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      name: "Bundle Deal",
      type: "bundle",
      description: "Special price for product bundles",
      discountValue: 15,
      discountType: "percentage",
      icon: <Target className="w-5 h-5" />,
    },
  ];

  const getPromoTypeColor = (type: string) => {
    switch (type) {
      case "discount":
        return "bg-blue-100 text-blue-800";
      case "bogo":
        return "bg-purple-100 text-purple-800";
      case "free_delivery":
        return "bg-green-100 text-green-800";
      case "bundle":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPromoIcon = (type: string) => {
    switch (type) {
      case "discount":
        return <Percent className="w-4 h-4" />;
      case "bogo":
        return <Gift className="w-4 h-4" />;
      case "free_delivery":
        return <Zap className="w-4 h-4" />;
      case "bundle":
        return <Tag className="w-4 h-4" />;
      default:
        return <Megaphone className="w-4 h-4" />;
    }
  };

  const handleCreatePromo = () => {
    const promo: Promotion = {
      ...newPromo,
      id: Date.now().toString(),
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      usedCount: 0,
      performance: {
        views: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
      },
    } as Promotion;

    setPromotions([...promotions, promo]);
    setNewPromo({
      name: "",
      type: "discount",
      description: "",
      discountValue: 0,
      discountType: "percentage",
      targetAudience: "all",
      isActive: true,
      productsApplied: [],
      usageLimit: 0,
      minOrderValue: 0,
    });
    setStartDate(undefined);
    setEndDate(undefined);
    setIsCreatingPromo(false);
  };

  const handleTogglePromo = (promoId: string) => {
    setPromotions(
      promotions.map((promo) =>
        promo.id === promoId ? { ...promo, isActive: !promo.isActive } : promo,
      ),
    );
  };

  const PromoCard = ({ promo }: { promo: Promotion }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              {getPromoIcon(promo.type)}
            </div>
            <div>
              <h4 className="font-medium">{promo.name}</h4>
              <Badge className={getPromoTypeColor(promo.type)}>
                {promo.type.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={promo.isActive}
              onCheckedChange={() => handleTogglePromo(promo.id)}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedPromo(promo)}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-3">{promo.description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Usage</p>
            <p className="font-medium">
              {promo.usedCount} / {promo.usageLimit || "∞"}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Revenue</p>
            <p className="font-medium">
              ₹{promo.performance.revenue.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Conversions</p>
            <p className="font-medium">{promo.performance.conversions}</p>
          </div>
          <div>
            <p className="text-gray-600">Valid Until</p>
            <p className="font-medium">{format(promo.endDate, "MMM dd")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PromoForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="promoName">Promotion Name</Label>
          <Input
            id="promoName"
            value={newPromo.name || ""}
            onChange={(e) => setNewPromo({ ...newPromo, name: e.target.value })}
            placeholder="Enter promotion name"
          />
        </div>
        <div>
          <Label htmlFor="promoType">Promotion Type</Label>
          <Select
            value={newPromo.type}
            onValueChange={(value) =>
              setNewPromo({ ...newPromo, type: value as any })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discount">Discount</SelectItem>
              <SelectItem value="bogo">Buy One Get One</SelectItem>
              <SelectItem value="free_delivery">Free Delivery</SelectItem>
              <SelectItem value="bundle">Bundle Deal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={newPromo.description || ""}
          onChange={(e) =>
            setNewPromo({ ...newPromo, description: e.target.value })
          }
          placeholder="Describe your promotion..."
          rows={3}
        />
      </div>

      {newPromo.type === "discount" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="discountValue">Discount Value</Label>
            <Input
              id="discountValue"
              type="number"
              value={newPromo.discountValue || ""}
              onChange={(e) =>
                setNewPromo({
                  ...newPromo,
                  discountValue: parseInt(e.target.value) || 0,
                })
              }
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="discountType">Discount Type</Label>
            <Select
              value={newPromo.discountType}
              onValueChange={(value) =>
                setNewPromo({ ...newPromo, discountType: value as any })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage (%)</SelectItem>
                <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
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
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="targetAudience">Target Audience</Label>
          <Select
            value={newPromo.targetAudience}
            onValueChange={(value) =>
              setNewPromo({ ...newPromo, targetAudience: value as any })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="new">New Customers</SelectItem>
              <SelectItem value="returning">Returning Customers</SelectItem>
              <SelectItem value="vip">VIP Customers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="usageLimit">Usage Limit</Label>
          <Input
            id="usageLimit"
            type="number"
            value={newPromo.usageLimit || ""}
            onChange={(e) =>
              setNewPromo({
                ...newPromo,
                usageLimit: parseInt(e.target.value) || 0,
              })
            }
            placeholder="0 for unlimited"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="minOrderValue">Minimum Order Value (₹)</Label>
        <Input
          id="minOrderValue"
          type="number"
          value={newPromo.minOrderValue || ""}
          onChange={(e) =>
            setNewPromo({
              ...newPromo,
              minOrderValue: parseInt(e.target.value) || 0,
            })
          }
          placeholder="0"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={newPromo.isActive || false}
          onCheckedChange={(checked) =>
            setNewPromo({ ...newPromo, isActive: checked })
          }
        />
        <Label htmlFor="isActive">Activate promotion immediately</Label>
      </div>

      <div className="flex space-x-3">
        <Button onClick={handleCreatePromo} className="flex-1">
          Create Promotion
        </Button>
        <Button variant="outline" onClick={() => setIsCreatingPromo(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Promotional Tools</h2>
          <p className="text-gray-600">
            Create and manage promotions to boost sales and customer engagement
          </p>
        </div>
        <Dialog open={isCreatingPromo} onOpenChange={setIsCreatingPromo}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Promotion
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Promotion</DialogTitle>
              <DialogDescription>
                Set up a new promotion to attract customers and increase sales
              </DialogDescription>
            </DialogHeader>
            <PromoForm />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">
            Active Promotions ({promotions.filter((p) => p.isActive).length})
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            Scheduled (
            {
              promotions.filter((p) => !p.isActive && p.startDate > new Date())
                .length
            }
            )
          </TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions
              .filter((promo) => promo.isActive)
              .map((promo) => (
                <PromoCard key={promo.id} promo={promo} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions
              .filter((promo) => !promo.isActive)
              .map((promo) => (
                <PromoCard key={promo.id} promo={promo} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {promoTemplates.map((template, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setNewPromo({
                    ...newPromo,
                    ...template,
                    name: template.name,
                  });
                  setIsCreatingPromo(true);
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {template.icon}
                  </div>
                  <h4 className="font-medium mb-2">{template.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {template.description}
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold">
                      ₹
                      {promotions
                        .reduce((sum, p) => sum + p.performance.revenue, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Conversions
                    </p>
                    <p className="text-2xl font-bold">
                      {promotions.reduce(
                        (sum, p) => sum + p.performance.conversions,
                        0,
                      )}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Avg Conversion Rate
                    </p>
                    <p className="text-2xl font-bold">
                      {(
                        (promotions.reduce(
                          (sum, p) => sum + p.performance.conversions,
                          0,
                        ) /
                          promotions.reduce(
                            (sum, p) => sum + p.performance.views,
                            1,
                          )) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                  <Percent className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Active Promotions
                    </p>
                    <p className="text-2xl font-bold">
                      {promotions.filter((p) => p.isActive).length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Promotion Performance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        {getPromoIcon(promo.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{promo.name}</h4>
                        <p className="text-sm text-gray-600">
                          {format(promo.startDate, "MMM dd")} -{" "}
                          {format(promo.endDate, "MMM dd")}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-8 text-center">
                      <div>
                        <p className="text-lg font-bold">
                          {promo.performance.views}
                        </p>
                        <p className="text-xs text-gray-600">Views</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">
                          {promo.performance.clicks}
                        </p>
                        <p className="text-xs text-gray-600">Clicks</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">
                          {promo.performance.conversions}
                        </p>
                        <p className="text-xs text-gray-600">Conversions</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">
                          ₹{promo.performance.revenue.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600">Revenue</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Promotion Details Modal */}
      {selectedPromo && (
        <Dialog
          open={!!selectedPromo}
          onOpenChange={() => setSelectedPromo(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <span>{selectedPromo.name}</span>
                <Badge className={getPromoTypeColor(selectedPromo.type)}>
                  {selectedPromo.type.replace("_", " ").toUpperCase()}
                </Badge>
              </DialogTitle>
              <DialogDescription>{selectedPromo.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Promotion Details */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Promotion Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span>
                        {selectedPromo.type.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount:</span>
                      <span>
                        {selectedPromo.discountValue}
                        {selectedPromo.discountType === "percentage"
                          ? "%"
                          : "₹"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span>
                        {format(selectedPromo.startDate, "MMM dd")} -{" "}
                        {format(selectedPromo.endDate, "MMM dd")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target:</span>
                      <span>
                        {selectedPromo.targetAudience.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Performance Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Views:</span>
                      <span>{selectedPromo.performance.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Clicks:</span>
                      <span>{selectedPromo.performance.clicks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conversions:</span>
                      <span>{selectedPromo.performance.conversions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue:</span>
                      <span>
                        ₹{selectedPromo.performance.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Promotion
                </Button>
                <Button variant="outline" className="flex-1">
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setPromotions(
                      promotions.filter((p) => p.id !== selectedPromo.id),
                    )
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PromotionalTools;
