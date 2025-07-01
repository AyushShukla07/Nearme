import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Store,
  User,
  Phone,
  Mail,
  FileText,
  Upload,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Camera,
  FileCheck,
  X,
  Building,
  CreditCard,
} from "lucide-react";

interface DocumentUpload {
  aadharCard: File | null;
  gstCertificate: File | null;
  businessRegistration: File | null;
  fssaiLicense: File | null;
}

const ShopOwnerSignup = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [gstValidation, setGstValidation] = useState<{
    isValid: boolean;
    message: string;
  }>({ isValid: false, message: "" });

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    shopName: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    shopCategory: "",

    // Step 2: Business Details
    gstNumber: "",
    businessType: "",
    address: "",
    bankAccountName: "",
    bankAccountNumber: "",
    ifscCode: "",

    // Step 3: Owner Details & Documents (handled separately)
    ownerName: "",

    // Step 4: Security
    shopId: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // Document upload state
  const [documents, setDocuments] = useState<DocumentUpload>({
    aadharCard: null,
    gstCertificate: null,
    businessRegistration: null,
    fssaiLicense: null,
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const validateGST = (gstNumber: string) => {
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const isValid = gstRegex.test(gstNumber);
    setGstValidation({
      isValid,
      message: isValid
        ? "Valid GST Number"
        : gstNumber
          ? "Invalid GST Number format"
          : "",
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear validation errors when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Special handling for GST validation
    if (field === "gstNumber") {
      validateGST(value as string);
    }

    // Generate Shop ID automatically based on shop name
    if (field === "shopName" && value) {
      const shopId = `SHOP_${(value as string).replace(/\s+/g, "").toUpperCase().substring(0, 6)}_${Math.random().toString(36).substring(2, 6)}`;
      setFormData((prev) => ({ ...prev, shopId }));
    }
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    documentType: keyof DocumentUpload,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setDocuments((prev) => ({
        ...prev,
        [documentType]: file,
      }));

      // Clear validation error for this document
      if (validationErrors[documentType]) {
        setValidationErrors((prev) => ({ ...prev, [documentType]: "" }));
      }
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.shopName) errors.shopName = "Shop name is required";
      if (!formData.contactPerson)
        errors.contactPerson = "Contact person is required";
      if (!formData.phoneNumber)
        errors.phoneNumber = "Phone number is required";
      if (!formData.email) errors.email = "Email is required";
      if (!formData.shopCategory)
        errors.shopCategory = "Shop category is required";

      // Email validation
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Please enter a valid email address";
      }
    }

    if (step === 2) {
      if (!formData.gstNumber) errors.gstNumber = "GST number is required";
      if (!gstValidation.isValid && formData.gstNumber)
        errors.gstNumber = "Invalid GST number";
      if (!formData.businessType)
        errors.businessType = "Business type is required";
      if (!formData.address) errors.address = "Address is required";
      if (!formData.bankAccountName)
        errors.bankAccountName = "Account holder name is required";
      if (!formData.bankAccountNumber)
        errors.bankAccountNumber = "Account number is required";
      if (!formData.ifscCode) errors.ifscCode = "IFSC code is required";
    }

    if (step === 3) {
      if (!formData.ownerName) errors.ownerName = "Owner name is required";
      if (!documents.aadharCard) errors.aadharCard = "Aadhar card is required";
      if (!documents.gstCertificate)
        errors.gstCertificate = "GST certificate is required";
    }

    if (step === 4) {
      if (!formData.password) errors.password = "Password is required";
      if (formData.password.length < 8)
        errors.password = "Password must be at least 8 characters";
      if (formData.password !== formData.confirmPassword)
        errors.confirmPassword = "Passwords do not match";
      if (!formData.agreeToTerms)
        errors.agreeToTerms = "You must agree to terms and conditions";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      setError("");
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    setError("");
    setValidationErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    try {
      await signup({
        name: formData.contactPerson,
        email: formData.email,
        phone: formData.phoneNumber,
        password: formData.password,
        type: "shop_owner",
        shopData: {
          shopName: formData.shopName,
          shopId: formData.shopId,
          ...formData,
          documents,
        },
      });
      // Navigation will be handled by App.tsx
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    }
  };

  const getStepProgress = () => (currentStep / 4) * 100;

  const DocumentUploadSection = ({
    title,
    description,
    documentKey,
    required = false,
  }: {
    title: string;
    description: string;
    documentKey: keyof DocumentUpload;
    required?: boolean;
  }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-green-400 transition-all duration-200">
      <div className="text-center">
        {documents[documentKey] ? (
          <div className="space-y-3">
            <FileCheck className="w-12 h-12 text-green-600 mx-auto" />
            <div>
              <p className="font-medium text-green-800">
                {documents[documentKey]?.name}
              </p>
              <p className="text-sm text-gray-600">
                {(documents[documentKey]?.size! / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setDocuments((prev) => ({ ...prev, [documentKey]: null }))
              }
              className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <h4 className="font-medium">
                {title} {required && <span className="text-red-500">*</span>}
              </h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, documentKey)}
              className="hidden"
              id={`upload-${documentKey}`}
            />
            <label htmlFor={`upload-${documentKey}`}>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="cursor-pointer hover:bg-green-50 hover:border-green-200"
              >
                <span>
                  <Camera className="w-4 h-4 mr-2" />
                  Choose File
                </span>
              </Button>
            </label>
            <p className="text-xs text-gray-500">PDF, JPG, PNG • Max 5MB</p>
          </div>
        )}
      </div>
      {validationErrors[documentKey] && (
        <p className="text-red-500 text-sm mt-2 text-center">
          {validationErrors[documentKey]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-8 px-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Near me
            </span>
          </Link>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Register Your Shop
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join the Near me platform and connect with customers in your
              neighborhood. Complete registration to start accepting orders.
            </p>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Progress Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Step {currentStep} of 4</span>
                <span>{Math.round(getStepProgress())}% Complete</span>
              </div>
              <Progress value={getStepProgress()} className="h-2 bg-white/20" />
              <div className="flex justify-between text-xs opacity-90">
                <span className={currentStep === 1 ? "font-semibold" : ""}>
                  Basic Info
                </span>
                <span className={currentStep === 2 ? "font-semibold" : ""}>
                  Business Details
                </span>
                <span className={currentStep === 3 ? "font-semibold" : ""}>
                  Documents
                </span>
                <span className={currentStep === 4 ? "font-semibold" : ""}>
                  Security
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {error && (
              <Alert className="mb-6 bg-red-50 border-red-200 animate-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Basic Information
                  </h2>
                  <p className="text-gray-600">
                    Tell us about your shop and contact details
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="shopName">
                      Shop Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="shopName"
                      placeholder="Green Valley Grocers"
                      value={formData.shopName}
                      onChange={(e) =>
                        handleInputChange("shopName", e.target.value)
                      }
                      className={cn(
                        "h-12 rounded-xl",
                        validationErrors.shopName && "border-red-500",
                      )}
                    />
                    {validationErrors.shopName && (
                      <p className="text-red-500 text-sm">
                        {validationErrors.shopName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">
                      Contact Person <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactPerson"
                      placeholder="John Doe"
                      value={formData.contactPerson}
                      onChange={(e) =>
                        handleInputChange("contactPerson", e.target.value)
                      }
                      className={cn(
                        "h-12 rounded-xl",
                        validationErrors.contactPerson && "border-red-500",
                      )}
                    />
                    {validationErrors.contactPerson && (
                      <p className="text-red-500 text-sm">
                        {validationErrors.contactPerson}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      placeholder="+91 98765 43210"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      className={cn(
                        "h-12 rounded-xl",
                        validationErrors.phoneNumber && "border-red-500",
                      )}
                    />
                    {validationErrors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {validationErrors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="shop@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={cn(
                        "h-12 rounded-xl",
                        validationErrors.email && "border-red-500",
                      )}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shopCategory">
                    Shop Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.shopCategory}
                    onValueChange={(value) =>
                      handleInputChange("shopCategory", value)
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        "h-12 rounded-xl",
                        validationErrors.shopCategory && "border-red-500",
                      )}
                    >
                      <SelectValue placeholder="Select your shop category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grocery">Grocery Store</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="butcher">Butcher Shop</SelectItem>
                      <SelectItem value="fruits">
                        Fruits & Vegetables
                      </SelectItem>
                      <SelectItem value="dairy">Dairy Products</SelectItem>
                      <SelectItem value="crafts">Arts & Crafts</SelectItem>
                      <SelectItem value="general">General Store</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.shopCategory && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.shopCategory}
                    </p>
                  )}
                </div>

                <div className="flex justify-end pt-6">
                  <Button
                    onClick={nextStep}
                    className="px-8 bg-green-600 hover:bg-green-700 h-12 rounded-xl"
                  >
                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Business Details
                  </h2>
                  <p className="text-gray-600">
                    Provide your business registration and bank information
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">
                      GST Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="gstNumber"
                      placeholder="22AAAAA0000A1Z5"
                      value={formData.gstNumber}
                      onChange={(e) =>
                        handleInputChange(
                          "gstNumber",
                          e.target.value.toUpperCase(),
                        )
                      }
                      className={cn(
                        "h-12 rounded-xl",
                        validationErrors.gstNumber
                          ? "border-red-500"
                          : gstValidation.isValid
                            ? "border-green-500"
                            : "",
                      )}
                    />
                    {gstValidation.message && (
                      <div className="flex items-center mt-1">
                        {gstValidation.isValid ? (
                          <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <p
                          className={`text-sm ${gstValidation.isValid ? "text-green-500" : "text-red-500"}`}
                        >
                          {gstValidation.message}
                        </p>
                      </div>
                    )}
                    {validationErrors.gstNumber && (
                      <p className="text-red-500 text-sm">
                        {validationErrors.gstNumber}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">
                      Business Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) =>
                        handleInputChange("businessType", value)
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "h-12 rounded-xl",
                          validationErrors.businessType && "border-red-500",
                        )}
                      >
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole_proprietorship">
                          Sole Proprietorship
                        </SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="private_limited">
                          Private Limited Company
                        </SelectItem>
                        <SelectItem value="llp">
                          Limited Liability Partnership
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.businessType && (
                      <p className="text-red-500 text-sm">
                        {validationErrors.businessType}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Complete Shop Address{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="123 Main Street, Downtown, City, State, PIN Code"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className={cn(
                        "rounded-xl",
                        validationErrors.address && "border-red-500",
                      )}
                      rows={3}
                    />
                    {validationErrors.address && (
                      <p className="text-red-500 text-sm">
                        {validationErrors.address}
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                      Bank Account Details (for payouts)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankAccountName">
                          Account Holder Name{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="bankAccountName"
                          placeholder="Account holder name"
                          value={formData.bankAccountName}
                          onChange={(e) =>
                            handleInputChange("bankAccountName", e.target.value)
                          }
                          className={cn(
                            "h-12 rounded-xl",
                            validationErrors.bankAccountName &&
                              "border-red-500",
                          )}
                        />
                        {validationErrors.bankAccountName && (
                          <p className="text-red-500 text-sm">
                            {validationErrors.bankAccountName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bankAccountNumber">
                          Account Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="bankAccountNumber"
                          placeholder="Bank account number"
                          value={formData.bankAccountNumber}
                          onChange={(e) =>
                            handleInputChange(
                              "bankAccountNumber",
                              e.target.value,
                            )
                          }
                          className={cn(
                            "h-12 rounded-xl",
                            validationErrors.bankAccountNumber &&
                              "border-red-500",
                          )}
                        />
                        {validationErrors.bankAccountNumber && (
                          <p className="text-red-500 text-sm">
                            {validationErrors.bankAccountNumber}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="ifscCode">
                          IFSC Code <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="ifscCode"
                          placeholder="IFSC Code"
                          value={formData.ifscCode}
                          onChange={(e) =>
                            handleInputChange(
                              "ifscCode",
                              e.target.value.toUpperCase(),
                            )
                          }
                          className={cn(
                            "h-12 rounded-xl",
                            validationErrors.ifscCode && "border-red-500",
                          )}
                        />
                        {validationErrors.ifscCode && (
                          <p className="text-red-500 text-sm">
                            {validationErrors.ifscCode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="px-8 h-12 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="px-8 bg-green-600 hover:bg-green-700 h-12 rounded-xl"
                  >
                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Documents & Owner Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Documents & Owner Details
                  </h2>
                  <p className="text-gray-600">
                    Upload required documents for verification
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">
                      Full Name of Owner/Primary Contact{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="ownerName"
                      placeholder="Full name as per Aadhar card"
                      value={formData.ownerName}
                      onChange={(e) =>
                        handleInputChange("ownerName", e.target.value)
                      }
                      className={cn(
                        "h-12 rounded-xl",
                        validationErrors.ownerName && "border-red-500",
                      )}
                    />
                    {validationErrors.ownerName && (
                      <p className="text-red-500 text-sm">
                        {validationErrors.ownerName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DocumentUploadSection
                      title="Aadhar Card"
                      description="Identity verification document (front & back)"
                      documentKey="aadharCard"
                      required
                    />
                    <DocumentUploadSection
                      title="GST Certificate"
                      description="GST registration certificate"
                      documentKey="gstCertificate"
                      required
                    />
                    <DocumentUploadSection
                      title="Business Registration"
                      description="Business license or registration certificate"
                      documentKey="businessRegistration"
                    />
                    <DocumentUploadSection
                      title="FSSAI License"
                      description="Food safety license (if applicable)"
                      documentKey="fssaiLicense"
                    />
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Security Notice:</strong> All uploaded documents
                      are encrypted and stored securely. We use
                      industry-standard security measures to protect your
                      sensitive information.
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="px-8 h-12 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="px-8 bg-green-600 hover:bg-green-700 h-12 rounded-xl"
                  >
                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Security & Terms */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Security & Confirmation
                  </h2>
                  <p className="text-gray-600">
                    Set up your login credentials and review terms
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Your Shop ID
                    </h3>
                    <div className="flex items-center space-x-3">
                      <Input
                        value={formData.shopId}
                        readOnly
                        className="h-12 rounded-xl bg-white font-mono"
                      />
                      <p className="text-sm text-gray-600">
                        Use this Shop ID to login to your dashboard
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="password">
                        Password <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          className={cn(
                            "pr-12 h-12 rounded-xl",
                            validationErrors.password && "border-red-500",
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {validationErrors.password && (
                        <p className="text-red-500 text-sm">
                          {validationErrors.password}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm Password <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        className={cn(
                          "h-12 rounded-xl",
                          validationErrors.confirmPassword && "border-red-500",
                        )}
                      />
                      {validationErrors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                          {validationErrors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          handleInputChange("agreeToTerms", checked as boolean)
                        }
                        className={cn(
                          validationErrors.agreeToTerms && "border-red-500",
                        )}
                      />
                      <div className="text-sm">
                        <label
                          htmlFor="agreeToTerms"
                          className="cursor-pointer text-gray-700"
                        >
                          I agree to the{" "}
                          <Button
                            variant="link"
                            className="p-0 h-auto text-sm text-green-600"
                          >
                            Terms & Conditions
                          </Button>{" "}
                          and{" "}
                          <Button
                            variant="link"
                            className="p-0 h-auto text-sm text-green-600"
                          >
                            Privacy Policy
                          </Button>
                        </label>
                        {validationErrors.agreeToTerms && (
                          <p className="text-red-500 text-sm mt-1">
                            {validationErrors.agreeToTerms}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Almost Done!</strong> Your application will be
                      reviewed within 24-48 hours. You'll receive an email
                      confirmation once approved.
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="px-8 h-12 rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-8 bg-green-600 hover:bg-green-700 h-12 rounded-xl"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application{" "}
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/shop-owner-login"
              className="text-green-600 hover:text-green-700 font-medium hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerSignup;
