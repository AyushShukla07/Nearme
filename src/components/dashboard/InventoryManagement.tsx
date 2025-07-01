import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Camera,
  Upload,
  DollarSign,
  BarChart3,
  Eye,
  EyeOff,
} from "lucide-react";

// Mock inventory data
const mockInventory = [
  {
    id: 1,
    name: "Organic Bananas",
    category: "Fruits",
    price: 40,
    stock: 50,
    lowStockThreshold: 10,
    description: "Fresh organic bananas from local farms",
    image: "/api/placeholder/100/100",
    status: "active",
    lastUpdated: new Date(),
    sales: 120,
    trend: "up",
  },
  {
    id: 2,
    name: "Fresh Milk",
    category: "Dairy",
    price: 60,
    stock: 25,
    lowStockThreshold: 15,
    description: "Fresh whole milk from local dairy",
    image: "/api/placeholder/100/100",
    status: "active",
    lastUpdated: new Date(),
    sales: 80,
    trend: "up",
  },
  {
    id: 3,
    name: "Whole Wheat Bread",
    category: "Bakery",
    price: 45,
    stock: 5,
    lowStockThreshold: 10,
    description: "Fresh baked whole wheat bread",
    image: "/api/placeholder/100/100",
    status: "active",
    lastUpdated: new Date(),
    sales: 40,
    trend: "down",
  },
  {
    id: 4,
    name: "Free Range Eggs",
    category: "Dairy",
    price: 120,
    stock: 30,
    lowStockThreshold: 12,
    description: "Farm fresh free range eggs",
    image: "/api/placeholder/100/100",
    status: "active",
    lastUpdated: new Date(),
    sales: 95,
    trend: "up",
  },
  {
    id: 5,
    name: "Tomatoes",
    category: "Vegetables",
    price: 40,
    stock: 0,
    lowStockThreshold: 20,
    description: "Fresh red tomatoes",
    image: "/api/placeholder/100/100",
    status: "out-of-stock",
    lastUpdated: new Date(),
    sales: 150,
    trend: "up",
  },
];

const categories = ["All", "Fruits", "Vegetables", "Dairy", "Bakery", "Grains"];

const InventoryManagement = () => {
  const [inventory, setInventory] = useState(mockInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    lowStockThreshold: "",
    description: "",
    image: null,
  });

  const filteredInventory = inventory
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "stock":
          return a.stock - b.stock;
        case "price":
          return a.price - b.price;
        case "sales":
          return b.sales - a.sales;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const lowStockItems = inventory.filter(
    (item) => item.stock <= item.lowStockThreshold,
  );
  const outOfStockItems = inventory.filter((item) => item.stock === 0);
  const totalValue = inventory.reduce(
    (sum, item) => sum + item.price * item.stock,
    0,
  );

  const handleAddItem = () => {
    const item = {
      id: Date.now(),
      ...newItem,
      price: parseFloat(newItem.price),
      stock: parseInt(newItem.stock),
      lowStockThreshold: parseInt(newItem.lowStockThreshold),
      status: "active",
      lastUpdated: new Date(),
      sales: 0,
      trend: "up",
    };
    setInventory([...inventory, item]);
    setNewItem({
      name: "",
      category: "",
      price: "",
      stock: "",
      lowStockThreshold: "",
      description: "",
      image: null,
    });
    setIsAddModalOpen(false);
  };

  const handleUpdateStock = (id, newStock) => {
    setInventory(
      inventory.map((item) =>
        item.id === id
          ? {
              ...item,
              stock: parseInt(newStock),
              status: parseInt(newStock) === 0 ? "out-of-stock" : "active",
              lastUpdated: new Date(),
            }
          : item,
      ),
    );
  };

  const handleToggleStatus = (id) => {
    setInventory(
      inventory.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
              lastUpdated: new Date(),
            }
          : item,
      ),
    );
  };

  const getStockStatusColor = (item) => {
    if (item.stock === 0) return "bg-red-100 text-red-800 border-red-200";
    if (item.stock <= item.lowStockThreshold)
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  const getStockStatusText = (item) => {
    if (item.stock === 0) return "Out of Stock";
    if (item.stock <= item.lowStockThreshold) return "Low Stock";
    return "In Stock";
  };

  return (
    <div className="space-y-6">
      {/* Inventory Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Items</p>
                <p className="text-2xl font-bold text-blue-700">
                  {inventory.length}
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Total Value</p>
                <p className="text-2xl font-bold text-green-700">
                  ₹{totalValue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {lowStockItems.length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-700">
                  {outOfStockItems.length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>{lowStockItems.length} items</strong> are running low on
              stock. Consider restocking:{" "}
              {lowStockItems
                .slice(0, 3)
                .map((item) => item.name)
                .join(", ")}
              {lowStockItems.length > 3 && " and more..."}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <BarChart3 className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="stock">Stock Level</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={newItem.name}
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                        placeholder="Enter product name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newItem.category}
                        onValueChange={(value) =>
                          setNewItem({ ...newItem, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories
                            .filter((c) => c !== "All")
                            .map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newItem.price}
                          onChange={(e) =>
                            setNewItem({ ...newItem, price: e.target.value })
                          }
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={newItem.stock}
                          onChange={(e) =>
                            setNewItem({ ...newItem, stock: e.target.value })
                          }
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="threshold">Low Stock Threshold</Label>
                      <Input
                        id="threshold"
                        type="number"
                        value={newItem.lowStockThreshold}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            lowStockThreshold: e.target.value,
                          })
                        }
                        placeholder="10"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newItem.description}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            description: e.target.value,
                          })
                        }
                        placeholder="Product description"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label>Product Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload image
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddItem}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Add Product
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredInventory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(item.id)}
                    >
                      {item.status === "active" ? (
                        <Eye className="w-4 h-4 text-green-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Price:</span>
                      <span className="font-semibold text-green-600">
                        ₹{item.price}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Stock:</span>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={item.stock}
                          onChange={(e) =>
                            handleUpdateStock(item.id, e.target.value)
                          }
                          className="w-20 h-8 text-center"
                          min="0"
                        />
                        <Badge className={getStockStatusColor(item)}>
                          {getStockStatusText(item)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Sales:</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">
                          {item.sales}
                        </span>
                        {item.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Value:</span>
                      <span className="font-semibold">
                        ₹{(item.price * item.stock).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingItem(item)}
                    >
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredInventory.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              {searchTerm || categoryFilter !== "All"
                ? "Try adjusting your search or filter criteria"
                : "Add your first product to get started"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InventoryManagement;
