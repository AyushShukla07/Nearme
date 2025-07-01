import { useState } from "react";
import { motion } from "framer-motion";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building,
  FileText,
  Upload,
  Camera,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Trash2,
  Plus,
} from "lucide-react";

const ShopDetailsModal = ({ isOpen, onClose, shopData }) => {
  const [activeTab, setActiveTab] = useState("business");
  const [isLoading, setIsLoading] = useState(false);
  const [shopPhotos, setShopPhotos] = useState([
    { id: 1, url: "/api/placeholder/300/200", caption: "Shop Front View" },
    { id: 2, url: "/api/placeholder/300/200", caption: "Interior View" },
  ]);

  const [businessInfo, setBusinessInfo] = useState({
    shopName: shopData?.shopName || "",
    fullAddress: shopData?.address || "",
    pincode: "400001",
    businessType: shopData?.businessType || "",
    gstNumber: "27AABCU9603R1ZX",
    panNumber: "AABCU9603R",
    shopDescription: shopData?.shopDescription || "",
    establishedYear: "2020",
    ownershipType: "individual",
  });

  const [documents, setDocuments] = useState({
    aadhar: {
      status: "verified",
      fileName: "aadhar_card.jpg",
      uploadDate: "15 Mar 2023",
      url: "/api/placeholder/400/250",
    },
    gst: {
      status: "verified",
      fileName: "gst_certificate.pdf",
      uploadDate: "16 Mar 2023",
      url: "/api/placeholder/400/250",
    },
    pan: {
      status: "pending",
      fileName: "pan_card.jpg",
      uploadDate: "20 Mar 2023",
      url: "/api/placeholder/400/250",
    },
    shopLicense: {
      status: "not_uploaded",
      fileName: null,
      uploadDate: null,
      url: null,
    },
  });

  const handleBusinessInfoChange = (field, value) => {
    setBusinessInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          url: e.target.result,
          caption: file.name,
        };
        setShopPhotos((prev) => [...prev, newPhoto]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDocumentUpload = (docType, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDocuments((prev) => ({
          ...prev,
          [docType]: {
            status: "pending",
            fileName: file.name,
            uploadDate: new Date().toLocaleDateString(),
            url: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Upload className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Saving shop details:", {
        businessInfo,
        documents,
        shopPhotos,
      });
      onClose();
    } catch (error) {
      console.error("Error saving shop details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Building className="w-6 h-6 mr-2 text-green-600" />
            My Shop Details
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="business">Business Info</TabsTrigger>
            <TabsTrigger value="documents">Legal Documents</TabsTrigger>
            <TabsTrigger value="photos">Shop Photos</TabsTrigger>
          </TabsList>

          {/* Business Information */}
          <TabsContent value="business" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shopName">Shop Name *</Label>
                <Input
                  id="shopName"
                  value={businessInfo.shopName}
                  onChange={(e) =>
                    handleBusinessInfoChange("shopName", e.target.value)
                  }
                  placeholder="Enter shop name"
                />
              </div>

              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Select
                  value={businessInfo.businessType}
                  onValueChange={(value) =>
                    handleBusinessInfoChange("businessType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sole Proprietorship">
                      Sole Proprietorship
                    </SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="LLP">
                      Limited Liability Partnership
                    </SelectItem>
                    <SelectItem value="Private Limited">
                      Private Limited Company
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="fullAddress">Complete Shop Address *</Label>
                <Textarea
                  id="fullAddress"
                  value={businessInfo.fullAddress}
                  onChange={(e) =>
                    handleBusinessInfoChange("fullAddress", e.target.value)
                  }
                  placeholder="Enter complete address including landmark"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={businessInfo.pincode}
                  onChange={(e) =>
                    handleBusinessInfoChange("pincode", e.target.value)
                  }
                  placeholder="Enter pincode"
                />
              </div>

              <div>
                <Label htmlFor="establishedYear">Established Year</Label>
                <Input
                  id="establishedYear"
                  value={businessInfo.establishedYear}
                  onChange={(e) =>
                    handleBusinessInfoChange("establishedYear", e.target.value)
                  }
                  placeholder="YYYY"
                />
              </div>

              <div>
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  value={businessInfo.gstNumber}
                  onChange={(e) =>
                    handleBusinessInfoChange("gstNumber", e.target.value)
                  }
                  placeholder="Enter GST number"
                />
              </div>

              <div>
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input
                  id="panNumber"
                  value={businessInfo.panNumber}
                  onChange={(e) =>
                    handleBusinessInfoChange("panNumber", e.target.value)
                  }
                  placeholder="Enter PAN number"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="shopDescription">Shop Description</Label>
                <Textarea
                  id="shopDescription"
                  value={businessInfo.shopDescription}
                  onChange={(e) =>
                    handleBusinessInfoChange("shopDescription", e.target.value)
                  }
                  placeholder="Describe your shop, products, and services for customers"
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>

          {/* Legal Documents */}
          <TabsContent value="documents" className="space-y-6">
            <Alert>
              <FileText className="w-4 h-4" />
              <AlertDescription>
                Upload clear, legible copies of your documents. Supported
                formats: JPG, PNG, PDF (max 5MB each).
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(documents).map(([docType, doc]) => (
                <div key={docType} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold capitalize">
                      {docType.replace(/([A-Z])/g, " $1").trim()}
                      {docType === "aadhar" && " Card"}
                      {docType === "gst" && " Certificate"}
                      {docType === "pan" && " Card"}
                      {docType === "shopLicense" && " License"}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(doc.status)}
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>

                  {doc.fileName ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded border">
                        <p className="text-sm font-medium">{doc.fileName}</p>
                        <p className="text-xs text-gray-600">
                          Uploaded: {doc.uploadDate}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <label className="flex-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            asChild
                          >
                            <span>
                              <Upload className="w-4 h-4 mr-1" />
                              Re-upload
                            </span>
                          </Button>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleDocumentUpload(docType, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload document
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleDocumentUpload(docType, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Shop Photos */}
          <TabsContent value="photos" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Shop Photos</h3>
                <p className="text-sm text-gray-600">
                  Upload high-quality photos of your shop to attract customers
                </p>
              </div>
              <label>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Photos
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shopPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group"
                >
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        setShopPhotos((prev) =>
                          prev.filter((p) => p.id !== photo.id),
                        )
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Input
                      value={photo.caption}
                      onChange={(e) => {
                        const newCaption = e.target.value;
                        setShopPhotos((prev) =>
                          prev.map((p) =>
                            p.id === photo.id
                              ? { ...p, caption: newCaption }
                              : p,
                          ),
                        );
                      }}
                      placeholder="Photo caption"
                      className="text-sm"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {shopPhotos.length === 0 && (
              <div className="text-center py-12">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No photos uploaded yet</p>
                <p className="text-sm text-gray-500">
                  Add photos to showcase your shop
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShopDetailsModal;
