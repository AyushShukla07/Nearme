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
    sm: "w-12 h-15",
    md: "w-16 h-20",
    lg: "w-24 h-30",
    xl: "w-32 h-40",
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
      {/* Near me Logo Animation */}
      <div className="relative flex items-center justify-center">
        {/* Animated Logo Container */}
        <div className={`${sizeClasses[size]} relative animate-pulse`}>
          {/* SVG representation of the Near me logo */}
          <svg
            viewBox="0 0 120 150"
            className="w-full h-full drop-shadow-lg"
            style={{
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
            }}
          >
            {/* Map Pin Shape with Gradient */}
            <defs>
              <linearGradient
                id="pinGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
              <linearGradient
                id="circleGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f8fafc" />
              </linearGradient>
            </defs>

            {/* Map Pin Body */}
            <path
              d="M60 25 C40 25, 25 40, 25 60 C25 75, 35 88, 60 115 C85 88, 95 75, 95 60 C95 40, 80 25, 60 25 Z"
              fill="url(#pinGradient)"
              className="animate-bounce-gentle"
            />

            {/* White Circle Inside Pin */}
            <circle
              cx="60"
              cy="58"
              r="25"
              fill="url(#circleGradient)"
              stroke="#e2e8f0"
              strokeWidth="1"
            />

            {/* Delivery Truck */}
            <g className="animate-slide-truck">
              {/* Truck Body */}
              <rect
                x="40"
                y="48"
                width="22"
                height="12"
                rx="2"
                fill="#2563eb"
              />
              {/* Truck Cab */}
              <rect x="36" y="52" width="8" height="8" rx="1" fill="#1d4ed8" />
              {/* Truck Wheels */}
              <circle cx="42" cy="62" r="2.5" fill="#374151" />
              <circle cx="58" cy="62" r="2.5" fill="#374151" />

              {/* Motion Lines */}
              <g className="animate-motion-lines">
                <line
                  x1="68"
                  y1="50"
                  x2="75"
                  y2="50"
                  stroke="#60a5fa"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                <line
                  x1="68"
                  y1="54"
                  x2="73"
                  y2="54"
                  stroke="#60a5fa"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <line
                  x1="68"
                  y1="58"
                  x2="71"
                  y2="58"
                  stroke="#60a5fa"
                  strokeWidth="1.5"
                  opacity="0.4"
                />
              </g>
            </g>

            {/* Shopping Bag on Truck */}
            <g className="animate-float-bag">
              <rect
                x="55"
                y="42"
                width="8"
                height="8"
                rx="1"
                fill="#06b6d4"
                stroke="#0891b2"
                strokeWidth="0.5"
              />
              {/* Bag Handles */}
              <path
                d="M57 44 Q58 42, 59 44 M61 44 Q62 42, 63 44"
                stroke="#0891b2"
                strokeWidth="1"
                fill="none"
              />
              {/* Bag Highlight */}
              <rect
                x="56"
                y="43"
                width="1"
                height="4"
                fill="#67e8f9"
                opacity="0.6"
              />
            </g>
          </svg>
        </div>

        {/* Pulsing Effect Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border-2 border-green-300 rounded-full animate-ping opacity-25"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-24 h-24 border-2 border-green-400 rounded-full animate-ping opacity-15"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>

      {/* Loading Text */}
      {showText && (
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span
              className={`font-bold text-slate-700 ${textSizes[size]}`}
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Nearme
            </span>
            <div className="flex space-x-1 ml-2">
              <div
                className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.15s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.3s" }}
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
