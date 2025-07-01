import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageCircle,
  Phone,
  Send,
  Star,
  ThumbsUp,
  ThumbsDown,
  Clock,
  User,
  MessageSquare,
  Smartphone,
  Bell,
  Settings,
  Languages,
  Volume2,
  Eye,
  Heart,
  Flag,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// Mock data for customer communications
const whatsappMessages = [
  {
    id: 1,
    customerName: "Priya Sharma",
    customerPhone: "+91 98765 43210",
    lastMessage: "Order ready for pickup?",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    unread: true,
    orderNumber: "ORD-098",
    language: "Hindi",
  },
  {
    id: 2,
    customerName: "Rajesh Kumar",
    customerPhone: "+91 87654 32109",
    lastMessage: "Thank you for the fresh vegetables!",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread: false,
    orderNumber: "ORD-097",
    language: "English",
  },
  {
    id: 3,
    customerName: "Anjali Patel",
    customerPhone: "+91 76543 21098",
    lastMessage: "कल सुबह डिलीवरी मिल जाएगी?",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    unread: true,
    orderNumber: "ORD-096",
    language: "Hindi",
  },
];

const customerReviews = [
  {
    id: 1,
    customerName: "Sneha Reddy",
    rating: 5,
    review: "Excellent service! Fresh vegetables and quick delivery. शुक्रिया!",
    orderNumber: "ORD-094",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    language: "Mixed",
    helpful: 12,
    replied: false,
  },
  {
    id: 2,
    customerName: "Vikash Singh",
    rating: 4,
    review: "Good quality products. Delivery was on time.",
    orderNumber: "ORD-093",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    language: "English",
    helpful: 8,
    replied: true,
  },
  {
    id: 3,
    customerName: "Meera Joshi",
    rating: 5,
    review: "बहुत अच्छी सेवा। सब्जियां बिल्कुल ताज़ी थीं।",
    orderNumber: "ORD-092",
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    language: "Hindi",
    helpful: 15,
    replied: false,
  },
];

const automatedMessages = [
  {
    id: 1,
    trigger: "order_placed",
    title: "Order Confirmation",
    template:
      "🛍️ Your order #{orderNumber} has been confirmed! We'll prepare it with care. Track: {trackingLink}",
    enabled: true,
    language: "Multi",
  },
  {
    id: 2,
    trigger: "order_ready",
    title: "Order Ready",
    template:
      "✅ Great news! Your order #{orderNumber} is ready for pickup. Please visit our shop. 📍 {shopAddress}",
    enabled: true,
    language: "Multi",
  },
  {
    id: 3,
    trigger: "out_for_delivery",
    title: "Out for Delivery",
    template:
      "🚚 Your order #{orderNumber} is on the way! Expected delivery in {estimatedTime} minutes.",
    enabled: true,
    language: "Multi",
  },
  {
    id: 4,
    trigger: "delivered",
    title: "Delivery Confirmation",
    template:
      "🎉 Order #{orderNumber} delivered successfully! Please rate your experience. Thank you for choosing us!",
    enabled: true,
    language: "Multi",
  },
];

const supportTickets = [
  {
    id: 1,
    subject: "Wrong item delivered",
    customer: "Arjun Mehta",
    priority: "high",
    status: "open",
    created: new Date(Date.now() - 2 * 60 * 60 * 1000),
    orderNumber: "ORD-091",
  },
  {
    id: 2,
    subject: "Refund request",
    customer: "Kavya Nair",
    priority: "medium",
    status: "in_progress",
    created: new Date(Date.now() - 6 * 60 * 60 * 1000),
    orderNumber: "ORD-090",
  },
  {
    id: 3,
    subject: "Product quality issue",
    customer: "Rohit Gupta",
    priority: "low",
    status: "resolved",
    created: new Date(Date.now() - 24 * 60 * 60 * 1000),
    orderNumber: "ORD-089",
  },
];

const Communication = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState("");

  const stats = {
    totalMessages: 156,
    unreadMessages: 12,
    averageRating: 4.6,
    totalReviews: 89,
    responseTime: "< 5 min",
    whatsappEnabled: true,
  };

  const handleSendMessage = () => {
    // WhatsApp API integration would go here
    console.log("Sending WhatsApp message:", newMessage);
    setNewMessage("");
  };

  const handleReplyToReview = () => {
    // Update review with reply
    console.log("Replying to review:", replyText);
    setIsReplyModalOpen(false);
    setReplyText("");
    setSelectedReview(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800 border-red-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Communication Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-green-700">
              {stats.totalMessages}
            </div>
            <p className="text-xs text-green-600">Total Chats</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Bell className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-blue-700">
              {stats.unreadMessages}
            </div>
            <p className="text-xs text-blue-600">Unread</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-yellow-700">
              {stats.averageRating}★
            </div>
            <p className="text-xs text-yellow-600">Avg Rating</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-purple-700">
              {stats.totalReviews}
            </div>
            <p className="text-xs text-purple-600">Reviews</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-orange-700">
              {stats.responseTime}
            </div>
            <p className="text-xs text-orange-600">Response</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Smartphone className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-bold text-green-700">
              {stats.whatsappEnabled ? "Active" : "Inactive"}
            </div>
            <p className="text-xs text-green-600">WhatsApp</p>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="whatsapp" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span className="hidden md:inline">WhatsApp</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span className="hidden md:inline">Reviews</span>
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden md:inline">Automation</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden md:inline">Support</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                  WhatsApp Chats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  {whatsappMessages.map((chat) => (
                    <motion.div
                      key={chat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors ${
                        selectedChat?.id === chat.id ? "bg-green-50" : ""
                      }`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">
                              {chat.customerName}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {chat.orderNumber}
                            </p>
                          </div>
                        </div>
                        {chat.unread && (
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">
                          {chat.language}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {chat.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {selectedChat ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <span>{selectedChat.customerName}</span>
                        <p className="text-sm text-gray-600">
                          {selectedChat.customerPhone}
                        </p>
                      </div>
                    </div>
                  ) : (
                    "Select a chat"
                  )}
                  {selectedChat && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedChat ? (
                  <div className="space-y-4">
                    {/* Chat Messages Area */}
                    <div className="h-64 bg-gray-50 rounded-lg p-4 overflow-y-auto">
                      <div className="space-y-3">
                        <div className="bg-green-100 p-3 rounded-lg max-w-xs">
                          <p className="text-sm">{selectedChat.lastMessage}</p>
                          <span className="text-xs text-gray-500">
                            {selectedChat.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Responses */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setNewMessage(
                            "आपका ऑर्डर तैयार है। कृपया दुकान पर आएं।",
                          )
                        }
                      >
                        Order Ready (Hindi)
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setNewMessage("Your order is ready for pickup!")
                        }
                      >
                        Order Ready
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setNewMessage("धन्यवाद! आपका फीडबैक महत्वपूर्ण है।")
                        }
                      >
                        Thank You (Hindi)
                      </Button>
                    </div>

                    {/* Message Input */}
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Select a chat to start messaging</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="space-y-4">
            {customerReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {review.customerName}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {review.language}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {review.orderNumber}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedReview(review);
                            setIsReplyModalOpen(true);
                          }}
                          disabled={review.replied}
                        >
                          {review.replied ? "Replied" : "Reply"}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Flag className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{review.review}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {review.helpful}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.timestamp.toLocaleDateString()}
                        </span>
                      </div>

                      {review.replied && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Replied
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Reply Modal */}
          <Dialog open={isReplyModalOpen} onOpenChange={setIsReplyModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reply to Review</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {selectedReview && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {selectedReview.review}
                    </p>
                  </div>
                )}
                <div>
                  <Label>Your Reply</Label>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Thank you for your feedback..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsReplyModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleReplyToReview}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Send Reply
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-600" />
                Automated WhatsApp Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automatedMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{message.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {message.template}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline">{message.trigger}</Badge>
                        <Badge variant="outline">{message.language}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={message.enabled}
                        onChange={() => {
                          // Toggle message automation
                        }}
                      />
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-detect Language</h4>
                    <p className="text-sm text-gray-600">
                      Automatically respond in customer's preferred language
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div>
                  <Label>Supported Languages</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className="bg-green-100 text-green-800">
                      English
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800">
                      हिंदी
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800">मराठी</Badge>
                    <Badge className="bg-purple-100 text-purple-800">
                      ગુજરાતી
                    </Badge>
                    <Badge className="bg-pink-100 text-pink-800">తెలుగు</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="space-y-4">
            {supportTickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{ticket.subject}</h4>
                        <p className="text-sm text-gray-600">
                          By {ticket.customer} • {ticket.orderNumber}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Created {ticket.created.toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Respond
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Communication;
