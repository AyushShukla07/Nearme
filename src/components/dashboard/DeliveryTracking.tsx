import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  MapPin,
  Truck,
  Phone,
  Clock,
  Navigation,
  User,
  Package,
  CheckCircle,
  AlertCircle,
  Zap,
  Route,
  Timer,
  MessageCircle,
  Smartphone,
  Star,
  RefreshCw,
} from "lucide-react";

// Mock delivery agent data
const mockDeliveryData = {
  "ORD-095": {
    orderId: "ORD-095",
    agentName: "Ravi Kumar",
    agentPhone: "+91 98765 43210",
    agentId: "DA001",
    vehicleNumber: "MH 12 AB 1234",
    vehicleType: "Electric Scooter",
    rating: 4.8,
    deliveriesCompleted: 145,
    currentLocation: {
      lat: 19.076,
      lng: 72.8777,
      address: "Linking Road, Bandra West",
    },
    destinationLocation: {
      lat: 19.084,
      lng: 72.885,
      address: "Hill Road, Bandra West",
    },
    estimatedTime: "12 minutes",
    distance: "2.3 km",
    route: [
      { lat: 19.076, lng: 72.8777, time: "Started pickup" },
      { lat: 19.078, lng: 72.879, time: "On SV Road" },
      { lat: 19.08, lng: 72.882, time: "Turner Road junction" },
      { lat: 19.084, lng: 72.885, time: "Destination" },
    ],
    status: "in_transit",
    startTime: new Date(Date.now() - 18 * 60 * 1000), // 18 minutes ago
    estimatedDelivery: new Date(Date.now() + 12 * 60 * 1000), // 12 minutes from now
  },
  "ORD-094": {
    orderId: "ORD-094",
    agentName: "Priya Sharma",
    agentPhone: "+91 87654 32109",
    agentId: "DA002",
    vehicleNumber: "MH 12 CD 5678",
    vehicleType: "Electric Bike",
    rating: 4.9,
    deliveriesCompleted: 203,
    currentLocation: { lat: 19.084, lng: 72.885, address: "Customer Location" },
    destinationLocation: {
      lat: 19.084,
      lng: 72.885,
      address: "Customer Location",
    },
    estimatedTime: "Delivered",
    distance: "3.1 km",
    status: "delivered",
    startTime: new Date(Date.now() - 45 * 60 * 1000),
    deliveredTime: new Date(Date.now() - 5 * 60 * 1000),
  },
  "ORD-096": {
    orderId: "ORD-096",
    agentName: "Amit Patel",
    agentPhone: "+91 76543 21098",
    agentId: "DA003",
    vehicleNumber: "MH 12 EF 9012",
    vehicleType: "Electric Scooter",
    rating: 4.7,
    deliveriesCompleted: 89,
    currentLocation: { lat: 19.065, lng: 72.868, address: "Shop Location" },
    destinationLocation: {
      lat: 19.072,
      lng: 72.875,
      address: "Juhu Beach Road",
    },
    estimatedTime: "8 minutes",
    distance: "1.8 km",
    status: "picking_up",
    startTime: new Date(Date.now() - 5 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 8 * 60 * 1000),
  },
};

const DeliveryTracking = ({ isOpen, onClose, initialOrderId = "" }) => {
  const [searchOrderId, setSearchOrderId] = useState(initialOrderId);
  const [deliveryData, setDeliveryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [liveLocation, setLiveLocation] = useState(null);

  // Simulate live location updates
  useEffect(() => {
    if (deliveryData && deliveryData.status === "in_transit") {
      const interval = setInterval(() => {
        setLiveLocation((prev) => ({
          ...deliveryData.currentLocation,
          timestamp: new Date(),
          speed: Math.random() * 20 + 15, // 15-35 km/h
        }));
      }, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
    }
  }, [deliveryData]);

  const handleTrackOrder = async () => {
    if (!searchOrderId.trim()) {
      setError("Please enter an Order ID");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      const data = mockDeliveryData[searchOrderId.toUpperCase()];
      if (data) {
        setDeliveryData(data);
        setLiveLocation(data.currentLocation);
      } else {
        setError("Order not found or no delivery agent assigned yet");
        setDeliveryData(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "picking_up":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_transit":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "delayed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "picking_up":
        return <Package className="w-4 h-4" />;
      case "in_transit":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "delayed":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatStatusText = (status) => {
    switch (status) {
      case "picking_up":
        return "Picking up from shop";
      case "in_transit":
        return "On the way to customer";
      case "delivered":
        return "Successfully delivered";
      case "delayed":
        return "Delivery delayed";
      default:
        return "Unknown status";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Truck className="w-6 h-6 mr-2 text-blue-600" />
            Delivery Agent Tracking
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Section */}
          <Card>
            <CardContent className="p-4">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <Input
                    placeholder="Enter Order ID (e.g., ORD-095)"
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleTrackOrder()}
                    className="font-mono"
                  />
                </div>
                <Button
                  onClick={handleTrackOrder}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 mr-2" />
                      Track Order
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <Alert className="mt-3 bg-red-50 border-red-200">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Quick Order Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                Recent Out-for-Delivery Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Object.keys(mockDeliveryData).map((orderId) => (
                  <Button
                    key={orderId}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchOrderId(orderId);
                      handleTrackOrder();
                    }}
                    className="font-mono"
                  >
                    {orderId}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <AnimatePresence>
            {deliveryData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Delivery Status */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Order {deliveryData.orderId}
                        </h3>
                        <Badge className={getStatusColor(deliveryData.status)}>
                          {getStatusIcon(deliveryData.status)}
                          <span className="ml-1">
                            {formatStatusText(deliveryData.status)}
                          </span>
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Estimated Delivery
                        </p>
                        <p className="font-semibold text-green-600">
                          {deliveryData.estimatedTime}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3">
                        <Route className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Distance</p>
                          <p className="font-medium">{deliveryData.distance}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Timer className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="text-sm text-gray-600">Started</p>
                          <p className="font-medium">
                            {deliveryData.startTime.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Zap className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-600">Vehicle</p>
                          <p className="font-medium">
                            {deliveryData.vehicleType}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Agent Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-green-600" />
                      Delivery Agent Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              {deliveryData.agentName}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Agent ID: {deliveryData.agentId}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Rating:
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-medium">
                                {deliveryData.rating}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Deliveries:
                            </span>
                            <span className="font-medium">
                              {deliveryData.deliveriesCompleted}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Vehicle:
                            </span>
                            <span className="font-medium">
                              {deliveryData.vehicleNumber}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() =>
                            window.open(`tel:${deliveryData.agentPhone}`)
                          }
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Agent: {deliveryData.agentPhone}
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() =>
                            window.open(
                              `https://wa.me/${deliveryData.agentPhone.replace(/\D/g, "")}`,
                            )
                          }
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp Agent
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Smartphone className="w-4 h-4 mr-2" />
                          Share Location with Customer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Live Location */}
                {liveLocation && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Navigation className="w-5 h-5 mr-2 text-purple-600" />
                          Live Location
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                        </motion.div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-100 rounded-lg p-6 text-center">
                        <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Current Location</h4>
                        <p className="text-gray-600 mb-4">
                          {liveLocation.address}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Coordinates:</span>
                            <p className="font-mono">
                              {liveLocation.lat.toFixed(4)},{" "}
                              {liveLocation.lng.toFixed(4)}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Last Updated:</span>
                            <p>
                              {liveLocation.timestamp
                                ? liveLocation.timestamp.toLocaleTimeString()
                                : "Just now"}
                            </p>
                          </div>
                        </div>
                        {liveLocation.speed && (
                          <div className="mt-4 p-3 bg-white rounded-lg">
                            <span className="text-gray-500">
                              Current Speed:
                            </span>
                            <p className="font-semibold text-blue-600">
                              {liveLocation.speed.toFixed(1)} km/h
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps?q=${liveLocation.lat},${liveLocation.lng}`,
                            )
                          }
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          View on Maps
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            const route = `https://www.google.com/maps/dir/${liveLocation.lat},${liveLocation.lng}/${deliveryData.destinationLocation.lat},${deliveryData.destinationLocation.lng}`;
                            window.open(route);
                          }}
                        >
                          <Route className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Delivery Timeline */}
                {deliveryData.status === "delivered" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                        Delivery Completed
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-green-800 font-medium">
                          Order delivered successfully at{" "}
                          {deliveryData.deliveredTime?.toLocaleTimeString()}
                        </p>
                        <p className="text-green-700 text-sm mt-1">
                          Total delivery time:{" "}
                          {Math.round(
                            (deliveryData.deliveredTime -
                              deliveryData.startTime) /
                              (1000 * 60),
                          )}{" "}
                          minutes
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryTracking;
