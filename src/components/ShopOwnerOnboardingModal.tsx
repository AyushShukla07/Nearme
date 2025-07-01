import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import {
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
  Lock,
  Smartphone,
  Building,
  CreditCard,
  Camera,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";

interface ShopOwnerOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShopOwnerOnboardingModal = ({
  isOpen,
  onClose,
}: ShopOwnerOnboardingModalProps) => {
  console.log("Modal props:", { isOpen, onClose });
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    shopId: "",
    password: "",
    rememberMe: false,
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    shopName: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    gstNumber: "",
    address: "",
    shopType: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // Document upload state
  const [documents, setDocuments] = useState({
    aadharCard: null as File | null,
    businessRegistration: null as File | null,
    fssaiLicense: null as File | null,
    gstCertificate: null as File | null,
  });

  // Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [gstValidation, setGstValidation] = useState<{
    isValid: boolean;
    message: string;
  }>({ isValid: false, message: "" });

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

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Login successful");
      setIsLoading(false);
      onClose();
      navigate("/shop-owner-dashboard");
    }, 2000);
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    documentType: keyof typeof documents,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocuments((prev) => ({
        ...prev,
        [documentType]: file,
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!signupForm.shopName) newErrors.shopName = "Shop name is required";
      if (!signupForm.contactPerson)
        newErrors.contactPerson = "Contact person is required";
      if (!signupForm.phoneNumber)
        newErrors.phoneNumber = "Phone number is required";
      if (!signupForm.email) newErrors.email = "Email is required";
      if (!signupForm.shopType) newErrors.shopType = "Shop type is required";
    }

    if (step === 2) {
      if (!signupForm.gstNumber) newErrors.gstNumber = "GST number is required";
      if (!gstValidation.isValid && signupForm.gstNumber)
        newErrors.gstNumber = "Invalid GST number";
      if (!signupForm.address) newErrors.address = "Address is required";
    }

    if (step === 3) {
      if (!documents.aadharCard)
        newErrors.aadharCard = "Aadhar card is required";
    }

    if (step === 4) {
      if (!signupForm.password) newErrors.password = "Password is required";
      if (signupForm.password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      if (signupForm.password !== signupForm.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      if (!signupForm.agreeToTerms)
        newErrors.agreeToTerms = "You must agree to terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSignupSubmit = async () => {
    if (validateStep(4)) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log("Signup successful", { signupForm, documents });
        setIsLoading(false);
        onClose();
        // Show success message and redirect to pending approval page
        navigate("/shop-owner-dashboard");
      }, 3000);
    }
  };

  const getStepProgress = () => {
    return (currentStep / 4) * 100;
  };

  const DocumentUploadSection = ({
    title,
    description,
    documentKey,
    required = false,
  }: {
    title: string;
    description: string;
    documentKey: keyof typeof documents;
    required?: boolean;
  }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-400 transition-colors">
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
              <Button variant="outline" size="sm" asChild>
                <span className="cursor-pointer">
                  <Camera className="w-4 h-4 mr-2" />
                  Choose File
                </span>
              </Button>
            </label>
            <p className="text-xs text-gray-500">
              Supported formats: PDF, JPG, PNG (Max 5MB)
            </p>
          </div>
        )}
      </div>
      {errors[documentKey] && (
        <p className="text-red-500 text-sm mt-2">{errors[documentKey]}</p>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Store className="w-6 h-6 mr-2 text-green-600" />
            Shop Owner Portal
          </DialogTitle>
          <DialogDescription>
            Join the Near me platform and grow your business with hyperlocal
            delivery
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="mt-6">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Welcome Back, Shop Owner!
                </h3>
                <p className="text-gray-600">
                  Sign in to access your shop dashboard
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="shopId">Shop ID</Label>
                  <Input
                    id="shopId"
                    placeholder="Enter your Shop ID"
                    value={loginForm.shopId}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, shopId: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={loginForm.rememberMe}
                      onCheckedChange={(checked) =>
                        setLoginForm({
                          ...loginForm,
                          rememberMe: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Button variant="link" className="p-0 h-auto">
                    Forgot Password?
                  </Button>
                </div>

                <Button
                  onClick={handleLogin}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                  {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Button
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => setActiveTab("signup")}
                    >
                      Sign up here
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup" className="mt-6">
            <div className="space-y-6">
              {/* Progress Indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Step {currentStep} of 4</span>
                  <span>{Math.round(getStepProgress())}% Complete</span>
                </div>
                <Progress value={getStepProgress()} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Basic Info</span>
                  <span>Business Details</span>
                  <span>Documents</span>
                  <span>Security</span>
                </div>
              </div>

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    <p className="text-gray-600">
                      Tell us about your shop and contact details
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shopName">
                        Shop Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="shopName"
                        placeholder="Green Valley Grocers"
                        value={signupForm.shopName}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            shopName: e.target.value,
                          })
                        }
                        className={`mt-1 ${errors.shopName ? "border-red-500" : ""}`}
                      />
                      {errors.shopName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.shopName}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="contactPerson">
                        Contact Person <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contactPerson"
                        placeholder="John Doe"
                        value={signupForm.contactPerson}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            contactPerson: e.target.value,
                          })
                        }
                        className={`mt-1 ${errors.contactPerson ? "border-red-500" : ""}`}
                      />
                      {errors.contactPerson && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.contactPerson}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phoneNumber">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phoneNumber"
                        placeholder="+91 98765 43210"
                        value={signupForm.phoneNumber}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            phoneNumber: e.target.value,
                          })
                        }
                        className={`mt-1 ${errors.phoneNumber ? "border-red-500" : ""}`}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="shop@example.com"
                        value={signupForm.email}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            email: e.target.value,
                          })
                        }
                        className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shopType">
                      Shop Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={signupForm.shopType}
                      onValueChange={(value) =>
                        setSignupForm({ ...signupForm, shopType: value })
                      }
                    >
                      <SelectTrigger
                        className={`mt-1 ${errors.shopType ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Select your shop type" />
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
                        <SelectItem value="general">General Store</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.shopType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shopType}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={nextStep}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Business Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold">Business Details</h3>
                    <p className="text-gray-600">
                      Provide your business registration and tax information
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="gstNumber">
                      GST Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="gstNumber"
                      placeholder="22AAAAA0000A1Z5"
                      value={signupForm.gstNumber}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        setSignupForm({ ...signupForm, gstNumber: value });
                        validateGST(value);
                      }}
                      className={`mt-1 ${
                        errors.gstNumber ||
                        (!gstValidation.isValid && signupForm.gstNumber)
                          ? "border-red-500"
                          : gstValidation.isValid
                            ? "border-green-500"
                            : ""
                      }`}
                    />
                    {gstValidation.message && (
                      <div className="flex items-center mt-1">
                        {gstValidation.isValid ? (
                          <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <p
                          className={`text-sm ${
                            gstValidation.isValid
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {gstValidation.message}
                        </p>
                      </div>
                    )}
                    {errors.gstNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gstNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">
                      Shop Address <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="123 Main Street, Downtown, City, State, PIN"
                      value={signupForm.address}
                      onChange={(e) =>
                        setSignupForm({
                          ...signupForm,
                          address: e.target.value,
                        })
                      }
                      className={`mt-1 ${errors.address ? "border-red-500" : ""}`}
                      rows={3}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Shield className="w-4 h-4" />
                    <AlertDescription>
                      Your GST information will be verified with government
                      records for authenticity and compliance.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={nextStep}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Document Upload */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold">
                      Document Verification
                    </h3>
                    <p className="text-gray-600">
                      Upload required documents for identity and business
                      verification
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DocumentUploadSection
                      title="Aadhar Card"
                      description="Identity verification document"
                      documentKey="aadharCard"
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
                    <DocumentUploadSection
                      title="GST Certificate"
                      description="GST registration certificate"
                      documentKey="gstCertificate"
                    />
                  </div>

                  <Alert className="bg-yellow-50 border-yellow-200">
                    <Shield className="w-4 h-4" />
                    <AlertDescription>
                      <strong>Security Notice:</strong> All uploaded documents
                      are encrypted and stored securely. We use
                      industry-standard security measures to protect your
                      sensitive information.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={nextStep}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Security & Terms */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold">
                      Security & Confirmation
                    </h3>
                    <p className="text-gray-600">
                      Set up your account security and review terms
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signupPassword">
                        Password <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="signupPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={signupForm.password}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              password: e.target.value,
                            })
                          }
                          className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">
                        Confirm Password <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={signupForm.confirmPassword}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        className={`mt-1 ${errors.confirmPassword ? "border-red-500" : ""}`}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={signupForm.agreeToTerms}
                        onCheckedChange={(checked) =>
                          setSignupForm({
                            ...signupForm,
                            agreeToTerms: checked as boolean,
                          })
                        }
                        className={errors.agreeToTerms ? "border-red-500" : ""}
                      />
                      <div className="text-sm">
                        <label
                          htmlFor="agreeToTerms"
                          className="cursor-pointer"
                        >
                          I agree to the{" "}
                          <Button variant="link" className="p-0 h-auto text-sm">
                            Terms & Conditions
                          </Button>{" "}
                          and{" "}
                          <Button variant="link" className="p-0 h-auto text-sm">
                            Privacy Policy
                          </Button>
                        </label>
                        {errors.agreeToTerms && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.agreeToTerms}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="w-4 h-4" />
                    <AlertDescription>
                      <strong>Almost Done!</strong> Your application will be
                      reviewed within 24-48 hours. You'll receive an email
                      confirmation once approved.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={handleSignupSubmit}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Submitting Application..."
                        : "Submit Application"}
                      {!isLoading && <CheckCircle className="w-4 h-4 ml-2" />}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Security Footer */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>
              Your data is protected with 256-bit SSL encryption and follows
              industry security standards
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShopOwnerOnboardingModal;
