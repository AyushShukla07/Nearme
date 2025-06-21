import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageCircle,
  Send,
  Phone,
  Search,
  Filter,
  MoreVertical,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Headphones,
  Star,
  ThumbsUp,
  ThumbsDown,
  Archive,
  Flag,
  UserCheck,
  Zap,
  Bell,
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: "customer" | "shop" | "support";
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: "active" | "resolved" | "pending";
  priority: "low" | "medium" | "high";
  orderId?: string;
  messages: Message[];
}

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  category: "technical" | "billing" | "general" | "feature_request";
}

const Communication = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      customerId: "C001",
      customerName: "Raj Kumar",
      lastMessage: "Is my order ready for pickup?",
      lastMessageTime: new Date(Date.now() - 300000), // 5 minutes ago
      unreadCount: 2,
      status: "active",
      priority: "medium",
      orderId: "ORD-001",
      messages: [
        {
          id: "m1",
          senderId: "C001",
          senderName: "Raj Kumar",
          senderType: "customer",
          content: "Hi, I placed an order for organic bananas. Is it ready?",
          timestamp: new Date(Date.now() - 600000),
          isRead: true,
        },
        {
          id: "m2",
          senderId: "shop",
          senderName: "Green Valley Grocers",
          senderType: "shop",
          content:
            "Hello! Your order is being prepared. It will be ready in 5 minutes.",
          timestamp: new Date(Date.now() - 400000),
          isRead: true,
        },
        {
          id: "m3",
          senderId: "C001",
          senderName: "Raj Kumar",
          senderType: "customer",
          content: "Is my order ready for pickup?",
          timestamp: new Date(Date.now() - 300000),
          isRead: false,
        },
      ],
    },
    {
      id: "2",
      customerId: "C002",
      customerName: "Priya Sharma",
      lastMessage: "Thank you for the quick delivery!",
      lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 0,
      status: "resolved",
      priority: "low",
      orderId: "ORD-002",
      messages: [
        {
          id: "m4",
          senderId: "C002",
          senderName: "Priya Sharma",
          senderType: "customer",
          content: "Thank you for the quick delivery! Everything was fresh.",
          timestamp: new Date(Date.now() - 3600000),
          isRead: true,
        },
      ],
    },
    {
      id: "3",
      customerId: "C003",
      customerName: "Amit Singh",
      lastMessage: "Can you substitute the olive oil?",
      lastMessageTime: new Date(Date.now() - 1800000), // 30 minutes ago
      unreadCount: 1,
      status: "pending",
      priority: "high",
      orderId: "ORD-003",
      messages: [
        {
          id: "m5",
          senderId: "C003",
          senderName: "Amit Singh",
          senderType: "customer",
          content:
            "The olive oil in my order is out of stock. Can you substitute it with sunflower oil?",
          timestamp: new Date(Date.now() - 1800000),
          isRead: false,
        },
      ],
    },
  ]);

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: "T001",
      subject: "Payment processing issue",
      description: "Customer unable to complete payment through UPI",
      status: "open",
      priority: "high",
      createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      updatedAt: new Date(Date.now() - 3600000),
      category: "technical",
    },
    {
      id: "T002",
      subject: "Product quality concern",
      description:
        "Multiple customers reporting quality issues with dairy products",
      status: "in_progress",
      priority: "medium",
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      updatedAt: new Date(Date.now() - 1800000),
      assignedTo: "Support Team",
      category: "general",
    },
    {
      id: "T003",
      subject: "Delivery time optimization",
      description: "Request for faster delivery options during peak hours",
      status: "resolved",
      priority: "low",
      createdAt: new Date(Date.now() - 259200000), // 3 days ago
      updatedAt: new Date(Date.now() - 86400000),
      category: "feature_request",
    },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "open":
        return "bg-blue-100 text-blue-800";
      case "pending":
      case "in_progress":
        return "bg-orange-100 text-orange-800";
      case "resolved":
      case "closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `m${Date.now()}`,
      senderId: "shop",
      senderName: "Green Valley Grocers",
      senderType: "shop",
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
    };

    setConversations(
      conversations.map((conv) =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: newMessage,
              lastMessageTime: new Date(),
            }
          : conv,
      ),
    );

    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: newMessage,
      lastMessageTime: new Date(),
    });

    setNewMessage("");
  };

  const ConversationCard = ({
    conversation,
  }: {
    conversation: Conversation;
  }) => (
    <Card
      className={`mb-3 cursor-pointer transition-all ${
        selectedConversation?.id === conversation.id
          ? "ring-2 ring-green-500 bg-green-50"
          : "hover:shadow-md"
      }`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={conversation.customerAvatar} />
              <AvatarFallback>{conversation.customerName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{conversation.customerName}</h4>
              {conversation.orderId && (
                <p className="text-xs text-gray-600">
                  Order #{conversation.orderId}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getPriorityColor(conversation.priority)}>
              {conversation.priority}
            </Badge>
            {conversation.unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">
                {conversation.unreadCount}
              </Badge>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 truncate mb-2">
          {conversation.lastMessage}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {conversation.lastMessageTime.toLocaleTimeString()}
          </span>
          <Badge className={getStatusColor(conversation.status)}>
            {conversation.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  const MessageBubble = ({ message }: { message: Message }) => (
    <div
      className={`flex ${
        message.senderType === "shop" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          message.senderType === "shop"
            ? "bg-green-600 text-white"
            : message.senderType === "support"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-900"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p
          className={`text-xs mt-1 ${
            message.senderType === "shop" || message.senderType === "support"
              ? "text-green-100"
              : "text-gray-500"
          }`}
        >
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );

  const SupportTicketCard = ({ ticket }: { ticket: SupportTicket }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">{ticket.subject}</h4>
          <div className="flex space-x-2">
            <Badge className={getPriorityColor(ticket.priority)}>
              {ticket.priority}
            </Badge>
            <Badge className={getStatusColor(ticket.status)}>
              {ticket.status}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>#{ticket.id}</span>
          <span>{ticket.category}</span>
          <span>{ticket.createdAt.toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Communication Center</h2>
          <p className="text-gray-600">
            Manage customer messages and support requests
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </Button>
        </div>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Customer Messages (
            {conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)})
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <Headphones className="w-4 h-4" />
            Support Tickets (
            {supportTickets.filter((t) => t.status !== "closed").length})
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Communication Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <ScrollArea className="h-[500px]">
                {conversations
                  .filter((conv) =>
                    conv.customerName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                  )
                  .map((conversation) => (
                    <ConversationCard
                      key={conversation.id}
                      conversation={conversation}
                    />
                  ))}
              </ScrollArea>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2">
              {selectedConversation ? (
                <Card className="h-full flex flex-col">
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={selectedConversation.customerAvatar}
                          />
                          <AvatarFallback>
                            {selectedConversation.customerName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">
                            {selectedConversation.customerName}
                          </h3>
                          {selectedConversation.orderId && (
                            <p className="text-sm text-gray-600">
                              Order #{selectedConversation.orderId}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4">
                    <ScrollArea className="h-[350px] mb-4">
                      {selectedConversation.messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                      ))}
                    </ScrollArea>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") handleSendMessage();
                        }}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-600">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="support" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Support Tickets</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Flag className="w-4 h-4 mr-2" />
                        Create Ticket
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Support Ticket</DialogTitle>
                        <DialogDescription>
                          Submit a new support request to the Near me team
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Subject</label>
                          <Input placeholder="Brief description of the issue" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Category
                          </label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Technical Issue</option>
                            <option>Billing Question</option>
                            <option>General Support</option>
                            <option>Feature Request</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Priority
                          </label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Description
                          </label>
                          <Textarea
                            placeholder="Detailed description of the issue..."
                            rows={4}
                          />
                        </div>
                        <Button className="w-full">Submit Ticket</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <SupportTicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-green-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Broadcast Message
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Customer Feedback Survey
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Setup Auto-Responses
                  </Button>
                </CardContent>
              </Card>

              {/* Support Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Support Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Open Tickets</span>
                    <span className="font-medium">
                      {supportTickets.filter((t) => t.status === "open").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">In Progress</span>
                    <span className="font-medium">
                      {
                        supportTickets.filter((t) => t.status === "in_progress")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Resolved Today
                    </span>
                    <span className="font-medium">
                      {
                        supportTickets.filter(
                          (t) =>
                            t.status === "resolved" &&
                            t.updatedAt.toDateString() ===
                              new Date().toDateString(),
                        ).length
                      }
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Avg Response Time
                    </span>
                    <span className="font-medium">2.5 hours</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Messages
                    </p>
                    <p className="text-2xl font-bold">
                      {conversations.reduce(
                        (sum, conv) => sum + conv.messages.length,
                        0,
                      )}
                    </p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Avg Response Time
                    </p>
                    <p className="text-2xl font-bold">8 min</p>
                  </div>
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Customer Satisfaction
                    </p>
                    <p className="text-2xl font-bold">4.8★</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Resolution Rate
                    </p>
                    <p className="text-2xl font-bold">96%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Customer Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    customer: "Raj Kumar",
                    feedback: "Excellent customer service, very responsive!",
                    rating: 5,
                    type: "positive",
                  },
                  {
                    customer: "Priya Sharma",
                    feedback: "Quick resolution to my order issue.",
                    rating: 5,
                    type: "positive",
                  },
                  {
                    customer: "Amit Singh",
                    feedback: "Could improve response time during peak hours.",
                    rating: 4,
                    type: "neutral",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`p-2 rounded-full ${
                        item.type === "positive"
                          ? "bg-green-100"
                          : "bg-yellow-100"
                      }`}
                    >
                      {item.type === "positive" ? (
                        <ThumbsUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <ThumbsDown className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">
                          {item.customer}
                        </span>
                        <div className="flex">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{item.feedback}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Communication Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { day: "Monday", messages: 45, resolved: 42 },
                    { day: "Tuesday", messages: 52, resolved: 48 },
                    { day: "Wednesday", messages: 38, resolved: 36 },
                    { day: "Thursday", messages: 61, resolved: 58 },
                    { day: "Friday", messages: 49, resolved: 47 },
                    { day: "Saturday", messages: 67, resolved: 63 },
                    { day: "Sunday", messages: 34, resolved: 32 },
                  ].map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{day.day}</span>
                        <span className="text-gray-600">
                          {day.messages} messages • {day.resolved} resolved
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${(day.resolved / day.messages) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Communication;
