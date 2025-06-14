import { MapPin, Truck, ShoppingBag } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  message?: string;
  className?: string;
}

const Loading = ({
  size = "md",
  showText = true,
  message = "Loading...",
  className = "",
}: LoadingProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      {/* Logo Animation Container */}
      <div className="relative">
        {/* Main Logo Pin */}
        <div className={`${sizeClasses[size]} relative animate-bounce-slow`}>
          {/* Pin Background with Gradient */}
          <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 rounded-full rounded-bl-none rotate-45 relative shadow-lg">
            {/* Pin Tip */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-600 rotate-45"></div>
          </div>

          {/* Content Container */}
          <div className="absolute inset-0 flex items-center justify-center -rotate-45">
            <div className="relative w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-inner">
              {/* Delivery Truck Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Truck
                  className="w-4 h-4 text-blue-600 animate-slide-right"
                  style={{
                    animationDelay: "0.2s",
                  }}
                />
              </div>

              {/* Shopping Bag Icon */}
              <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1">
                <div className="w-3 h-3 bg-cyan-500 rounded-sm flex items-center justify-center animate-float">
                  <ShoppingBag
                    className="w-2 h-2 text-white"
                    style={{
                      animationDelay: "0.4s",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pulsing Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`${sizeClasses[size]} border-2 border-green-300 rounded-full animate-ping opacity-20`}
          ></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`${sizeClasses[size]} border-2 border-green-400 rounded-full animate-ping opacity-30`}
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
      </div>

      {/* Loading Text */}
      {showText && (
        <div className="text-center">
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent ${textSizes[size]}`}
            >
              Near me
            </span>
            <div className="flex space-x-1">
              <div
                className="w-1 h-1 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-1 h-1 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-1 h-1 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
          <p
            className={`text-gray-600 ${size === "sm" ? "text-xs" : "text-sm"}`}
          >
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

// Spinner variant for inline loading
export const LoadingSpinner = ({
  size = "sm",
}: {
  size?: "sm" | "md" | "lg";
}) => {
  const spinnerSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <div className={`${spinnerSizes[size]} relative`}>
        {/* Simplified logo for spinner */}
        <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-spin">
          <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
            <MapPin className="w-2 h-2 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Page loading overlay
export const LoadingOverlay = ({
  message = "Loading your fresh products...",
}: {
  message?: string;
}) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
      <Loading size="lg" message={message} />
    </div>
  );
};

// Card/Section loading skeleton
export const LoadingSkeleton = ({
  lines = 3,
  showAvatar = false,
}: {
  lines?: number;
  showAvatar?: boolean;
}) => {
  return (
    <div className="animate-pulse">
      <div className="flex items-start space-x-4">
        {showAvatar && (
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <LoadingSpinner size="sm" />
          </div>
        )}
        <div className="flex-1 space-y-3">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={`h-4 bg-gray-200 rounded ${
                index === lines - 1 ? "w-3/4" : "w-full"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
