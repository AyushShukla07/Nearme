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
          {/* SVG representation of the Nearme logo */}
          <svg
            viewBox="0 0 100 130"
            className="w-full h-full drop-shadow-lg"
            style={{
              filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.2))",
            }}
          >
            <defs>
              {/* Green gradient for the pin */}
              <linearGradient
                id="pinGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="30%" stopColor="#4ade80" />
                <stop offset="70%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>

              {/* Inner shadow for pin depth */}
              <radialGradient id="pinShadow" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
              </radialGradient>

              {/* White circle gradient */}
              <radialGradient id="circleGradient" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f1f5f9" />
              </radialGradient>
            </defs>

            {/* Drop shadow ellipse */}
            <ellipse
              cx="50"
              cy="115"
              rx="18"
              ry="6"
              fill="#000000"
              opacity="0.15"
              className="animate-pulse"
            />

            {/* Map Pin Body - teardrop shape */}
            <path
              d="M50 20
                 C35 20, 23 32, 23 47
                 C23 62, 35 75, 50 100
                 C65 75, 77 62, 77 47
                 C77 32, 65 20, 50 20 Z"
              fill="url(#pinGradient)"
              className="animate-bounce-gentle"
            />

            {/* Pin inner shadow for 3D effect */}
            <path
              d="M50 20
                 C35 20, 23 32, 23 47
                 C23 62, 35 75, 50 100
                 C65 75, 77 62, 77 47
                 C77 32, 65 20, 50 20 Z"
              fill="url(#pinShadow)"
            />

            {/* White circle inside pin */}
            <circle
              cx="50"
              cy="47"
              r="20"
              fill="url(#circleGradient)"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />

            {/* Delivery Truck */}
            <g className="animate-slide-truck">
              {/* Truck main body */}
              <rect
                x="38"
                y="42"
                width="16"
                height="10"
                rx="1.5"
                fill="#1e40af"
              />

              {/* Truck cab */}
              <rect x="33" y="45" width="7" height="7" rx="1" fill="#1d4ed8" />

              {/* Truck wheels */}
              <circle cx="37" cy="53" r="2" fill="#374151" />
              <circle cx="48" cy="53" r="2" fill="#374151" />

              {/* Truck windshield */}
              <rect
                x="34"
                y="46"
                width="4"
                height="3"
                rx="0.5"
                fill="#60a5fa"
                opacity="0.7"
              />

              {/* Motion/speed lines */}
              <g className="animate-motion-lines opacity-80">
                <line
                  x1="56"
                  y1="44"
                  x2="62"
                  y2="44"
                  stroke="#3b82f6"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <line
                  x1="56"
                  y1="47"
                  x2="60"
                  y2="47"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <line
                  x1="56"
                  y1="50"
                  x2="58"
                  y2="50"
                  stroke="#3b82f6"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </g>
            </g>

            {/* Shopping Bag positioned on top */}
            <g className="animate-float-bag">
              <rect
                x="46"
                y="35"
                width="8"
                height="8"
                rx="1"
                fill="#0891b2"
                stroke="#0e7490"
                strokeWidth="0.5"
              />

              {/* Bag handles */}
              <path
                d="M48 37 C48.5 35.5, 49.5 35.5, 50 37 M52 37 C52.5 35.5, 53.5 35.5, 54 37"
                stroke="#0e7490"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
              />

              {/* Bag highlight for 3D effect */}
              <rect
                x="47"
                y="36"
                width="1.5"
                height="5"
                fill="#67e8f9"
                opacity="0.8"
                rx="0.2"
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
