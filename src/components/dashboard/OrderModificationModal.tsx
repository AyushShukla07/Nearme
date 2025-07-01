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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Minus,
  Plus,
  X,
  Phone,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
  User,
  Clock,
  DollarSign,
  Edit3,
} from "lucide-react";

const OrderModificationModal = ({ order, isOpen, onClose, onOrderUpdate }) => {
  const [modifiedItems, setModifiedItems] = useState([]);
  const [modifiedTotal, setModifiedTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (order) {
      // Initialize modified items with original order data
      const items = order.items.map((item) => ({
        ...item,
        modifiedQty: item.requestedQty,
        isAvailable: item.available,
        note: "",
        originalPrice: item.price,
        subtotal: item.requestedQty * item.price,
      }));
      setModifiedItems(items);
      calculateTotal(items);
    }
  }, [order]);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      if (item.isAvailable && item.modifiedQty > 0) {
        return sum + item.modifiedQty * item.price;
      }
      return sum;
    }, 0);
    setModifiedTotal(total);
  };

  const handleQuantityChange = (itemId, newQty) => {
    const updatedItems = modifiedItems.map((item) => {
      if (item.id === itemId) {
        const qty = Math.max(0, parseInt(newQty) || 0);
        return {
          ...item,
          modifiedQty: qty,
          subtotal: qty * item.price,
        };
      }
      return item;
    });
    setModifiedItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const handleAvailabilityToggle = (itemId) => {
    const updatedItems = modifiedItems.map((item) => {
      if (item.id === itemId) {
        const newAvailability = !item.isAvailable;
        return {
          ...item,
          isAvailable: newAvailability,
          modifiedQty: newAvailability ? item.requestedQty : 0,
          subtotal: newAvailability ? item.requestedQty * item.price : 0,
        };
      }
      return item;
    });
    setModifiedItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const handleNoteChange = (itemId, note) => {
    const updatedItems = modifiedItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, note };
      }
      return item;
    });
    setModifiedItems(updatedItems);
  };

  const handleSendForApproval = async () => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      onOrderUpdate(order.id, "awaiting-customer-approval");
      setIsProcessing(false);
      onClose();
    }, 2000);
  };

  const hasChanges = () => {
    return modifiedItems.some(
      (item) =>
        item.modifiedQty !== item.requestedQty ||
        !item.isAvailable ||
        item.note,
    );
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Edit3 className="w-5 h-5 mr-2 text-green-600" />
            Review & Modify Order #{order.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {order.customerName}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(order.orderTime).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Message
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Order Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>

            {modifiedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  item.isAvailable
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.isAvailable ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <div>
                      <h4
                        className={`font-medium ${
                          !item.isAvailable
                            ? "line-through text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        ₹{item.price} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Availability Toggle */}
                    <Button
                      variant={item.isAvailable ? "destructive" : "default"}
                      size="sm"
                      onClick={() => handleAvailabilityToggle(item.id)}
                      className={
                        item.isAvailable
                          ? ""
                          : "bg-green-600 hover:bg-green-700"
                      }
                    >
                      {item.isAvailable ? (
                        <>
                          <X className="w-4 h-4 mr-1" />
                          Mark Unavailable
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Mark Available
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {item.isAvailable && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Quantity Adjustment */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity (Requested: {item.requestedQty})
                      </label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(item.id, item.modifiedQty - 1)
                          }
                          disabled={item.modifiedQty <= 0}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.modifiedQty}
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          className="w-20 text-center"
                          min="0"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(item.id, item.modifiedQty + 1)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Subtotal Display */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subtotal
                      </label>
                      <div className="p-2 bg-white rounded-lg border text-center font-medium">
                        ₹{item.subtotal}
                      </div>
                    </div>

                    {/* Customer Note */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Note to Customer
                      </label>
                      <Input
                        placeholder="e.g., Smaller size available"
                        value={item.note}
                        onChange={(e) =>
                          handleNoteChange(item.id, e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}

                {!item.isAvailable && (
                  <div className="bg-red-100 p-3 rounded-lg">
                    <div className="flex items-center text-red-800">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">
                        Item marked as unavailable
                      </span>
                    </div>
                    <Textarea
                      placeholder="Optional note to customer about unavailability..."
                      value={item.note}
                      onChange={(e) =>
                        handleNoteChange(item.id, e.target.value)
                      }
                      className="mt-2 bg-white"
                      rows={2}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <Separator />

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Order Summary
              </h3>
              {hasChanges() && (
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-800"
                >
                  Modified
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Original Total:</p>
                <p className="font-semibold text-gray-900">
                  ₹{order.estimatedTotal}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Modified Total:</p>
                <p className="font-bold text-green-600 text-lg">
                  ₹{modifiedTotal}
                </p>
              </div>
            </div>

            {modifiedTotal !== order.estimatedTotal && (
              <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
                <p className="text-yellow-800 text-sm font-medium">
                  Total changed by ₹{modifiedTotal - order.estimatedTotal}(
                  {modifiedTotal > order.estimatedTotal ? "+" : ""}
                  {(
                    ((modifiedTotal - order.estimatedTotal) /
                      order.estimatedTotal) *
                    100
                  ).toFixed(1)}
                  %)
                </p>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>

            <div className="flex space-x-3">
              <Button
                variant="destructive"
                onClick={() => {
                  onOrderUpdate(order.id, "rejected");
                  onClose();
                }}
                disabled={isProcessing}
              >
                Reject Order
              </Button>

              <Button
                onClick={handleSendForApproval}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700 text-white min-w-[200px]"
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Send for Customer Approval
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModificationModal;
