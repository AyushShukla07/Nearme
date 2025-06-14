import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Loading, {
  LoadingSpinner,
  LoadingOverlay,
  LoadingSkeleton,
} from "@/components/Loading";

const LoadingDemo = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);

  const simulateLoading = () => {
    setShowSimulation(true);
    setTimeout(() => {
      setShowSimulation(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {showOverlay && (
        <LoadingOverlay message="Fetching fresh products from nearby shops..." />
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Nearme Loading Animations
            </h1>
            <p className="text-gray-600">
              Custom branded loading animations that maintain our identity
              during wait times
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Main Loading Component */}
            <Card>
              <CardHeader>
                <CardTitle>Primary Loading Animation</CardTitle>
                <CardDescription>
                  Full branded loading with logo and messaging
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-8">
                  <Loading
                    size="lg"
                    message="Finding fresh products near you..."
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium mb-2">Small</p>
                    <div className="bg-gray-50 rounded p-4">
                      <Loading size="sm" showText={false} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium mb-2">Medium</p>
                    <div className="bg-gray-50 rounded p-4">
                      <Loading size="md" showText={false} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium mb-2">Large</p>
                    <div className="bg-gray-50 rounded p-4">
                      <Loading size="lg" showText={false} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loading Spinners */}
            <Card>
              <CardHeader>
                <CardTitle>Loading Spinners</CardTitle>
                <CardDescription>
                  Compact spinners for inline loading states
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center space-x-8 bg-gray-50 rounded-lg p-8">
                  <div className="text-center">
                    <p className="text-sm font-medium mb-3">Small</p>
                    <LoadingSpinner size="sm" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium mb-3">Medium</p>
                    <LoadingSpinner size="md" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium mb-3">Large</p>
                    <LoadingSpinner size="lg" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span className="text-sm">Loading products...</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span className="text-sm">Updating cart...</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span className="text-sm">Processing order...</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loading Skeletons */}
            <Card>
              <CardHeader>
                <CardTitle>Loading Skeletons</CardTitle>
                <CardDescription>
                  Placeholder content during data loading
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <LoadingSkeleton lines={3} showAvatar={true} />
                  <div className="border-t pt-4">
                    <LoadingSkeleton lines={2} showAvatar={false} />
                  </div>
                  <div className="border-t pt-4">
                    <LoadingSkeleton lines={4} showAvatar={true} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Demos */}
            <Card>
              <CardHeader>
                <CardTitle>Interactive Demos</CardTitle>
                <CardDescription>
                  See the loading animations in action
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => setShowOverlay(true)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Show Full Screen Loading
                </Button>

                <Button
                  onClick={simulateLoading}
                  variant="outline"
                  className="w-full"
                  disabled={showSimulation}
                >
                  {showSimulation ? (
                    <div className="flex items-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Simulating...</span>
                    </div>
                  ) : (
                    "Simulate Loading State"
                  )}
                </Button>

                {showOverlay && (
                  <Button
                    onClick={() => setShowOverlay(false)}
                    variant="destructive"
                    className="w-full"
                  >
                    Hide Overlay
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Usage Examples */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Real-World Usage Examples</CardTitle>
              <CardDescription>
                How these loading states appear in the actual application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Shop Loading */}
                <div className="space-y-4">
                  <h4 className="font-medium">Shop Discovery</h4>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <Loading size="md" message="Finding shops within 500m..." />
                  </div>
                </div>

                {/* Order Tracking */}
                <div className="space-y-4">
                  <h4 className="font-medium">Order Processing</h4>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <Loading size="md" message="Processing your order..." />
                  </div>
                </div>

                {/* Cart Update */}
                <div className="space-y-4">
                  <h4 className="font-medium">Cart Updates</h4>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <LoadingSpinner size="md" />
                        <span className="text-sm">Updating cart...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Brand Guidelines */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Brand Guidelines</CardTitle>
              <CardDescription>
                Our loading animations reinforce the Nearme brand identity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Design Elements</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Green gradient location pin matches our logo</li>
                    <li>• Blue delivery truck represents our service</li>
                    <li>• Cyan shopping bag symbolizes commerce</li>
                    <li>• Subtle animations feel natural and polished</li>
                    <li>• Consistent with our sustainability message</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Usage Principles</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Use full loading for page/major state changes</li>
                    <li>• Use spinners for quick actions and updates</li>
                    <li>• Use skeletons for content placeholders</li>
                    <li>• Match loading message to user context</li>
                    <li>• Maintain consistent brand voice in copy</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoadingDemo;
