import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import BrandedLoading from "@/components/BrandedLoading";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  MapPin,
  Truck,
  Clock,
  Leaf,
  Users,
  Store,
  Smartphone,
  ShoppingBag,
  Heart,
  Star,
  ArrowRight,
  Zap,
  Shield,
  Target,
  CheckCircle,
  TrendingUp,
  Award,
} from "lucide-react";

// Animation variants for reusable animations
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = async (
    path: string,
    loadingMessage = "Loading...",
  ) => {
    setIsLoading(true);

    // Show loading for minimum 1 second for smooth UX
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return <BrandedLoading message="Taking you there..." fullScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Enhanced Animations */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 bg-grid-pattern opacity-5"
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating elements for visual interest */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-2 h-2 bg-green-400 rounded-full opacity-60"
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-16 w-3 h-3 bg-emerald-400 rounded-full opacity-40"
            animate={{
              y: [0, 25, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-orange-400 rounded-full opacity-50"
            animate={{
              y: [0, -15, 0],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-16 sm:py-24">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div {...fadeInUp}>
              <Badge
                variant="secondary"
                className="mb-4 bg-green-100 text-green-800 hover:bg-green-100"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Leaf className="w-3 h-3 mr-1" />
                </motion.div>
                Hyperlocal • Eco-Friendly • Community-First
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Fresh Products from
              <motion.span
                className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {" "}
                Nearby Shops
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Connect with local shops within 500 meters. Get fresh products
              delivered by eco-friendly electric vehicles while supporting your
              neighborhood community.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
                  onClick={() =>
                    handleNavigation(
                      isAuthenticated ? "/shops" : "/customer-login",
                    )
                  }
                >
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Start Shopping
                  </motion.div>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-xl border-green-200 hover:bg-green-50 hover:text-green-600 hover:border-green-300 shadow-lg"
                  onClick={() => handleNavigation("/shop-owner-signup")}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Store className="w-5 h-5 mr-2" />
                  </motion.div>
                  Join as Shop Owner
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Location Input */}
            <motion.div
              className="max-w-md mx-auto"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                >
                  <MapPin
                    className="w-5 h-5 text-gray-400"
                    style={{ marginTop: "-11px" }}
                  />
                </motion.div>
                <Input
                  placeholder="Enter your location to find nearby shops"
                  className="pl-11 h-12 rounded-xl border-green-200 focus:border-green-400 shadow-lg"
                />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button className="absolute right-2 top-2 h-8 rounded-lg bg-green-600 hover:bg-green-700">
                    <Target className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Animation */}
      <AnimatedSection className="py-16 sm:py-24 bg-gradient-to-br from-green-600 to-emerald-700 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundImage: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-6"
              {...fadeInUp}
            >
              Ready to Support Your Local Community?
            </motion.h2>
            <motion.p
              className="text-xl opacity-90 mb-8 leading-relaxed"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands of customers and shop owners who are making their
              neighborhoods more sustainable and connected.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-6 text-lg rounded-xl shadow-lg"
                >
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                  </motion.div>
                  Download App
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-xl border-white text-white hover:bg-white hover:text-green-600 shadow-lg"
                  onClick={() => handleNavigation("/shop-owner-signup")}
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Store className="w-5 h-5 mr-2" />
                  </motion.div>
                  Partner With Us
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer with Animation */}
      <AnimatedSection className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div {...fadeInUp}>
              <div className="flex items-center space-x-2 mb-4">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-xl font-bold">Near me</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connecting communities through hyperlocal, eco-friendly delivery
                services.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-semibold mb-4">For Customers</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  <button onClick={() => handleNavigation("/customer-login")}>
                    Browse Shops
                  </button>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  Track Orders
                </motion.li>
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  Loyalty Program
                </motion.li>
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  Sustainability
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-semibold mb-4">For Shop Owners</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => handleNavigation("/shop-owner-login")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Partner Dashboard
                  </button>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  Analytics
                </motion.li>
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  Promotional Tools
                </motion.li>
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  Support
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  About Us
                </motion.li>
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  Careers
                </motion.li>
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  Press
                </motion.li>
                <motion.li
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  Contact
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p>
              &copy; 2024 Near me. All rights reserved. Building sustainable
              communities, one delivery at a time.
            </p>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Index;
