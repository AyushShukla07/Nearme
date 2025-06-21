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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Filter,
  Download,
  Upload,
  BarChart3,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  unit: string;
  description: string;
  isActive: boolean;
  image?: string;
  sku: string;
  lastUpdated: string;
  soldThisWeek: number;
}

const InventoryManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Organic Bananas",
      category: "Fruits",
      price: 45,
      stock: 2,
      minStock: 10,
      unit: "kg",
      description: "Fresh organic bananas from local farms",
      isActive: true,
      sku: "FRT-BAN-001",
      lastUpdated: "2024-01-15",
      soldThisWeek: 25,
    },
    {
      id: "2",
      name: "Fresh Spinach",
      category: "Vegetables",
      price: 30,
      stock: 15,
      minStock: 8,
      unit: "bunch",
      description: "Locally grown fresh spinach leaves",
      isActive: true,
      sku: "VEG-SPN-001",
      lastUpdated: "2024-01-15",
      soldThisWeek: 18,
    },
    {
      id: "3",
      name: "Whole Milk",
      category: "Dairy",
      price: 55,
      stock: 5,
      minStock: 15,
      unit: "L",
      description: "Fresh whole milk from local dairy",
      isActive: true,
      sku: "DRY-MLK-001",
      lastUpdated: "2024-01-14",
      soldThisWeek: 32,
    },
    {
      id: "4",
      name: "Brown Bread",
      category: "Bakery",
      price: 40,
      stock: 20,
      minStock: 12,
      unit: "loaf",
      description: "Freshly baked whole wheat bread",
      isActive: true,
      sku: "BKY-BRD-001",
      lastUpdated: "2024-01-15",
      soldThisWeek: 15,
    },
    {
      id: "5",
      name: "Chicken Breast",
      category: "Meat",
      price: 200,
      stock: 8,
      minStock: 5,
      unit: "kg",
      description: "Fresh chicken breast, hormone-free",
      isActive: true,
      sku: "MET-CHK-001",
      lastUpdated: "2024-01-15",
      soldThisWeek: 12,
    },
  ]);

  const categories = [
    "all",
    "Fruits",
    "Vegetables",
    "Dairy",
    "Bakery",
    "Meat",
    "Beverages",
    "Snacks",
  ];

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    minStock: 0,
    unit: "",
    description: "",
    isActive: true,
    sku: "",
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = products.filter(
    (product) => product.stock <= product.minStock,
  );

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { status: "out-of-stock", color: "red" };
    if (product.stock <= product.minStock)
      return { status: "low-stock", color: "orange" };
    return { status: "in-stock", color: "green" };
  };

  const handleAddProduct = () => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split("T")[0],
      soldThisWeek: 0,
      sku:
        newProduct.sku ||
        `${newProduct.category?.slice(0, 3).toUpperCase()}-${newProduct.name?.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-3)}`,
    } as Product;

    setProducts([...products, product]);
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      minStock: 0,
      unit: "",
      description: "",
      isActive: true,
      sku: "",
    });
    setIsAddingProduct(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) =>
        p.id === updatedProduct.id
          ? {
              ...updatedProduct,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : p,
      ),
    );
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
    setSelectedProduct(null);
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    setProducts(
      products.map((p) =>
        p.id === productId
          ? {
              ...p,
              stock: newStock,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : p,
      ),
    );
  };

  const ProductForm = ({
    product,
    isEditing = false,
  }: {
    product: Partial<Product>;
    isEditing?: boolean;
  }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={product.name || ""}
            onChange={(e) =>
              isEditing
                ? setSelectedProduct({
                    ...selectedProduct!,
                    name: e.target.value,
                  })
                : setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Enter product name"
          />
        </div>
        <div>
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            value={product.sku || ""}
            onChange={(e) =>
              isEditing
                ? setSelectedProduct({
                    ...selectedProduct!,
                    sku: e.target.value,
                  })
                : setNewProduct({ ...newProduct, sku: e.target.value })
            }
            placeholder="Product SKU"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={product.category || ""}
            onValueChange={(value) =>
              isEditing
                ? setSelectedProduct({ ...selectedProduct!, category: value })
                : setNewProduct({ ...newProduct, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="unit">Unit</Label>
          <Select
            value={product.unit || ""}
            onValueChange={(value) =>
              isEditing
                ? setSelectedProduct({ ...selectedProduct!, unit: value })
                : setNewProduct({ ...newProduct, unit: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilogram (kg)</SelectItem>
              <SelectItem value="g">Gram (g)</SelectItem>
              <SelectItem value="L">Liter (L)</SelectItem>
              <SelectItem value="ml">Milliliter (ml)</SelectItem>
              <SelectItem value="pcs">Pieces (pcs)</SelectItem>
              <SelectItem value="bunch">Bunch</SelectItem>
              <SelectItem value="dozen">Dozen</SelectItem>
              <SelectItem value="pack">Pack</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            type="number"
            value={product.price || ""}
            onChange={(e) =>
              isEditing
                ? setSelectedProduct({
                    ...selectedProduct!,
                    price: parseInt(e.target.value) || 0,
                  })
                : setNewProduct({
                    ...newProduct,
                    price: parseInt(e.target.value) || 0,
                  })
            }
            placeholder="0"
          />
        </div>
        <div>
          <Label htmlFor="stock">Current Stock</Label>
          <Input
            id="stock"
            type="number"
            value={product.stock || ""}
            onChange={(e) =>
              isEditing
                ? setSelectedProduct({
                    ...selectedProduct!,
                    stock: parseInt(e.target.value) || 0,
                  })
                : setNewProduct({
                    ...newProduct,
                    stock: parseInt(e.target.value) || 0,
                  })
            }
            placeholder="0"
          />
        </div>
        <div>
          <Label htmlFor="minStock">Minimum Stock</Label>
          <Input
            id="minStock"
            type="number"
            value={product.minStock || ""}
            onChange={(e) =>
              isEditing
                ? setSelectedProduct({
                    ...selectedProduct!,
                    minStock: parseInt(e.target.value) || 0,
                  })
                : setNewProduct({
                    ...newProduct,
                    minStock: parseInt(e.target.value) || 0,
                  })
            }
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={product.description || ""}
          onChange={(e) =>
            isEditing
              ? setSelectedProduct({
                  ...selectedProduct!,
                  description: e.target.value,
                })
              : setNewProduct({ ...newProduct, description: e.target.value })
          }
          placeholder="Product description..."
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={product.isActive || false}
          onCheckedChange={(checked) =>
            isEditing
              ? setSelectedProduct({ ...selectedProduct!, isActive: checked })
              : setNewProduct({ ...newProduct, isActive: checked })
          }
        />
        <Label htmlFor="isActive">Product is active</Label>
      </div>

      <div className="flex space-x-3">
        <Button
          onClick={() =>
            isEditing
              ? handleUpdateProduct(selectedProduct!)
              : handleAddProduct()
          }
          className="flex-1"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            isEditing ? setSelectedProduct(null) : setIsAddingProduct(false)
          }
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Inventory Management</h2>
          <p className="text-gray-600">
            Manage your products, stock levels, and pricing
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new product to your inventory
                </DialogDescription>
              </DialogHeader>
              <ProductForm product={newProduct} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stock Alerts */}
      {lowStockProducts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Low Stock Alerts ({lowStockProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      Stock: {product.stock} {product.unit}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="products" className="w-full">
        <TabsList>
          <TabsTrigger value="products">All Products</TabsTrigger>
          <TabsTrigger value="analytics">Stock Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Products Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sold This Week</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product);
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-600">
                            SKU: {product.sku}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.category}</Badge>
                      </TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={product.stock}
                            onChange={(e) =>
                              handleStockUpdate(
                                product.id,
                                parseInt(e.target.value) || 0,
                              )
                            }
                            className="w-20 h-8"
                          />
                          <span className="text-sm text-gray-600">
                            {product.unit}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              stockStatus.status === "in-stock"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              stockStatus.status === "out-of-stock"
                                ? "bg-red-100 text-red-800"
                                : stockStatus.status === "low-stock"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {stockStatus.status === "out-of-stock"
                              ? "Out of Stock"
                              : stockStatus.status === "low-stock"
                                ? "Low Stock"
                                : "In Stock"}
                          </Badge>
                          {product.isActive ? (
                            <Eye className="w-4 h-4 text-green-600" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{product.soldThisWeek}</span>
                          {product.soldThisWeek > 20 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-green-600" />
                  Total Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{products.length}</div>
                <p className="text-sm text-gray-600">
                  {products.filter((p) => p.isActive).length} active products
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                  Low Stock Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {lowStockProducts.length}
                </div>
                <p className="text-sm text-gray-600">Need restocking</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  Total Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ₹
                  {products
                    .reduce((sum, p) => sum + p.price * p.stock, 0)
                    .toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Current inventory value</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.slice(1).map((category) => {
                  const categoryProducts = products.filter(
                    (p) => p.category === category,
                  );
                  const percentage =
                    (categoryProducts.length / products.length) * 100;
                  return (
                    <div key={category} className="flex items-center space-x-4">
                      <div className="w-24 text-sm">{category}</div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 w-16">
                        {categoryProducts.length} items
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Product Modal */}
      {selectedProduct && (
        <Dialog
          open={!!selectedProduct}
          onOpenChange={() => setSelectedProduct(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Update product details and stock information
              </DialogDescription>
            </DialogHeader>
            <ProductForm product={selectedProduct} isEditing />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InventoryManagement;
