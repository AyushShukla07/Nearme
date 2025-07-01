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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Tag,
  Gift,
  Leaf,
  Clock,
  MapPin,
  CreditCard,
  ArrowRight,
  ShoppingBag,
  Store,
  AlertCircle,
  CheckCircle,
  Percent,
  Star,
  Timer,
  Truck,
} from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Organic Bananas",
      shopName: "Green Valley Grocers",
      image: "/api/placeholder/80/80",
      price: 45,
      originalPrice: 50,
      quantity: 2,
      unit: "dozen",
      inStock: true,
      isOrganic: true,
      deliveryTime: "8-12 min",
    },
    {
      id: 2,
      name: "Fresh Spinach",
      shopName: "Green Valley Grocers",
      image: "/api/placeholder/80/80",
      price: 30,
      quantity: 1,
      unit: "bunch",
      inStock: true,
      isOrganic: true,
      deliveryTime: "8-12 min",
    },
    {
      id: 3,
      name: "Sourdough Bread",
      shopName: "Artisan Bakery Corner",
      image: "/api/placeholder/80/80",
      price: 80,
      quantity: 1,
      unit: "loaf",
      inStock: true,
      isFresh: true,
      deliveryTime: "15-20 min",
    },
    {
      id: 4,
      name: "Whole Milk",
      shopName: "Urban Organic Market",
      image: "/api/placeholder/80/80",
      price: 55,
      quantity: 1,
      unit: "liter",
      inStock: false,
      isOrganic: true,
      deliveryTime: "10-15 min",
    },
  ]);

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(450);
  const [usePoints, setUsePoints] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal > 300 ? 0 : 40;
  const discountAmount = appliedDiscount
    ? Math.round((subtotal * appliedDiscount.percentage) / 100)
    : 0;
  const pointsDiscount = usePoints;
  const total = subtotal + deliveryFee - discountAmount - pointsDiscount;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyDiscountCode = () => {
    const validCodes = {
      FIRST10: { percentage: 10, description: "First Order Discount" },
      ORGANIC15: { percentage: 15, description: "Organic Products Discount" },
      LOCAL5: { percentage: 5, description: "Local Shop Support" },
    };

    const discount =
      validCodes[discountCode.toUpperCase() as keyof typeof validCodes];
    if (discount) {
      setAppliedDiscount({ ...discount, code: discountCode.toUpperCase() });
      setIsDiscountApplied(true);
      setDiscountCode("");
    } else {
      setIsDiscountApplied(false);
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setIsDiscountApplied(false);
  };

  const maxPointsUsable = Math.min(loyaltyPoints, Math.floor(subtotal * 0.2));

  const groupedItems = cartItems.reduce(
    (groups, item) => {
      const shop = item.shopName;
      if (!groups[shop]) {
        groups[shop] = [];
      }
      groups[shop].push(item);
      return groups;
    },
    {} as Record<string, typeof cartItems>,
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <ShoppingCart className="w-8 h-8 mr-3 text-green-600" />
              Your Cart
            </h1>
            <p className="text-gray-600">
              {cartItems.length} items from {Object.keys(groupedItems).length}{" "}
              shops
            </p>
          </div>

          {cartItems.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Discover fresh products from local shops in your neighborhood
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Store className="w-4 h-4 mr-2" />
                  Browse Shops
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {Object.entries(groupedItems).map(([shopName, items]) => (
                  <Card key={shopName}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Store className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {shopName}
                            </CardTitle>
                            <CardDescription className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {items[0].deliveryTime} delivery
                            </CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-200"
                        >
                          <Leaf className="w-3 h-3 mr-1" />
                          Eco-friendly
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 py-4 border-b last:border-b-0"
                        >
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            {!item.inStock && (
                              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-white" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Per {item.unit}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  {item.isOrganic && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      <Leaf className="w-2 h-2 mr-1" />
                                      Organic
                                    </Badge>
                                  )}
                                  {item.isFresh && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      <Timer className="w-2 h-2 mr-1" />
                                      Fresh Daily
                                    </Badge>
                                  )}
                                  {!item.inStock && (
                                    <Badge
                                      variant="destructive"
                                      className="text-xs"
                                    >
                                      Out of Stock
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="flex items-center space-x-2">
                                  {item.originalPrice &&
                                    item.originalPrice > item.price && (
                                      <span className="text-sm text-gray-500 line-through">
                                        ₹{item.originalPrice}
                                      </span>
                                    )}
                                  <span className="font-semibold text-lg">
                                    ₹{item.price}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={!item.inStock}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  disabled={!item.inStock}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">
                                  ₹{item.price * item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}

                {/* Special Instructions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Gift className="w-5 h-5 mr-2" />
                      Special Instructions
                    </CardTitle>
                    <CardDescription>
                      Add any special requests or notes for the shops
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="e.g., Please select ripe bananas, extra eco-friendly packaging, leave at door..."
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      className="min-h-20"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Maximum 200 characters. Instructions will be shared with
                      relevant shops.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal ({cartItems.length} items)</span>
                        <span>₹{subtotal}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="flex items-center">
                          Delivery Fee
                          {deliveryFee === 0 && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              Free
                            </Badge>
                          )}
                        </span>
                        <span>
                          {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
                        </span>
                      </div>

                      {appliedDiscount && (
                        <div className="flex justify-between text-green-600">
                          <span className="flex items-center">
                            <Tag className="w-4 h-4 mr-1" />
                            {appliedDiscount.description}
                          </span>
                          <span>-₹{discountAmount}</span>
                        </div>
                      )}

                      {pointsDiscount > 0 && (
                        <div className="flex justify-between text-orange-600">
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            Loyalty Points
                          </span>
                          <span>-₹{pointsDiscount}</span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>

                      {deliveryFee > 0 && (
                        <div className="text-xs text-gray-600 bg-green-50 p-2 rounded">
                          Add ₹{300 - subtotal} more for free delivery
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Discount & Loyalty */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Percent className="w-5 h-5 mr-2" />
                        Discounts & Rewards
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Discount Code */}
                      <div>
                        <Label
                          htmlFor="discount"
                          className="text-sm font-medium"
                        >
                          Discount Code
                        </Label>
                        <div className="flex space-x-2 mt-1">
                          <Input
                            id="discount"
                            placeholder="Enter code"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            disabled={!!appliedDiscount}
                          />
                          {appliedDiscount ? (
                            <Button
                              variant="outline"
                              onClick={removeDiscount}
                              className="px-3"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button
                              onClick={applyDiscountCode}
                              disabled={!discountCode.trim()}
                              className="px-6"
                            >
                              Apply
                            </Button>
                          )}
                        </div>
                        {isDiscountApplied === false && discountCode && (
                          <p className="text-xs text-red-500 mt-1">
                            Invalid discount code
                          </p>
                        )}
                      </div>

                      {/* Loyalty Points */}
                      <div>
                        <Label className="text-sm font-medium">
                          Use Loyalty Points ({loyaltyPoints} available)
                        </Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input
                            type="number"
                            placeholder="Points to use"
                            value={usePoints || ""}
                            onChange={(e) =>
                              setUsePoints(
                                Math.min(
                                  Number(e.target.value) || 0,
                                  maxPointsUsable,
                                ),
                              )
                            }
                            max={maxPointsUsable}
                            min={0}
                          />
                          <Button
                            variant="outline"
                            onClick={() => setUsePoints(maxPointsUsable)}
                            className="px-4"
                            disabled={maxPointsUsable === 0}
                          >
                            Max
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Max ₹{maxPointsUsable} (20% of subtotal)
                        </p>
                      </div>

                      {/* Available Offers */}
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <h4 className="font-medium text-orange-800 mb-2">
                          Available Offers
                        </h4>
                        <div className="space-y-1 text-xs text-orange-700">
                          <p>• FIRST10: 10% off first order</p>
                          <p>• ORGANIC15: 15% off organic products</p>
                          <p>• LOCAL5: 5% off local shop support</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Delivery Info */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Truck className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Eco-Friendly Delivery</h4>
                          <p className="text-sm text-gray-600">
                            Electric vehicles • Zero emissions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        Delivering to Downtown Area
                      </div>
                    </CardContent>
                  </Card>

                  {/* Checkout Button */}
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                    disabled={cartItems.some((item) => !item.inStock)}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  {cartItems.some((item) => !item.inStock) && (
                    <div className="text-center text-sm text-red-600 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Remove out-of-stock items to continue
                    </div>
                  )}

                  <div className="text-center">
                    <Button variant="outline" className="w-full">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
