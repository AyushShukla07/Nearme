import { motion } from "framer-motion";
import { MapPin, ShoppingBag, Store } from "lucide-react";

interface BrandedLoginAnimationProps {
  isVisible: boolean;
  userType?: "customer" | "shop_owner";
}

const BrandedLoginAnimation = ({
  isVisible,
  userType = "customer",
}: BrandedLoginAnimationProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      style={{
        background:
          "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)",
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-200 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3,
            }}
            animate={{
              y: [null, -20, 20, -20],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Gradient Waves */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Animation Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="relative mb-8"
        >
          {/* Main Logo Circle */}
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-2xl"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <MapPin className="w-10 h-10 text-white" />
          </motion.div>

          {/* Pulsing Ring */}
          <motion.div
            className="absolute inset-0 w-20 h-20 border-4 border-green-300 rounded-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 0.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Secondary Icon Animation */}
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              y: [0, -3, 0],
            }}
            transition={{
              scale: { delay: 0.3, duration: 0.4 },
              rotate: { delay: 0.3, duration: 0.4 },
              y: {
                delay: 0.7,
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {userType === "shop_owner" ? (
              <Store className="w-4 h-4 text-white" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-white" />
            )}
          </motion.div>
        </motion.div>

        {/* Brand Text Animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Near me
          </motion.h1>

          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            {userType === "shop_owner"
              ? "Loading your dashboard..."
              : "Welcome back!"}
          </motion.p>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-8"
        >
          {/* Animated Progress Dots */}
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="mt-6 text-center"
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span>Login Successful</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Corner Decorative Elements */}
      <motion.div
        className="absolute top-10 right-10"
        initial={{ opacity: 0, rotate: -45 }}
        animate={{
          opacity: 0.3,
          rotate: 0,
          y: [0, -5, 0],
        }}
        transition={{
          opacity: { delay: 0.5, duration: 0.4 },
          rotate: { delay: 0.5, duration: 0.4 },
          y: {
            delay: 1,
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-50" />
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-10"
        initial={{ opacity: 0, rotate: 45 }}
        animate={{
          opacity: 0.3,
          rotate: 0,
          y: [0, 5, 0],
        }}
        transition={{
          opacity: { delay: 0.7, duration: 0.4 },
          rotate: { delay: 0.7, duration: 0.4 },
          y: {
            delay: 1.2,
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-green-200 rounded-lg opacity-50" />
      </motion.div>
    </motion.div>
  );
};

export default BrandedLoginAnimation;
