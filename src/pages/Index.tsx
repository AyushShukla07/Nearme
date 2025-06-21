import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { Link, useNavigate } from "react-router-dom";
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

const Index = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      title: "Hyperlocal Focus",
      description:
        "Connect with shops within 500m radius for the freshest products and fastest delivery.",
    },
    {
      icon: <Truck className="w-6 h-6 text-green-600" />,
      title: "Eco-Friendly Delivery",
      description:
        "Electric vehicles and sustainable packaging for carbon-neutral deliveries.",
    },
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: "Real-Time Tracking",
      description:
        "Track your orders in real-time from shop to your doorstep with live updates.",
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: "Support Local Business",
      description:
        "Help local shop owners thrive while getting the freshest products in your neighborhood.",
    },
    {
      icon: <Heart className="w-6 h-6 text-green-600" />,
      title: "Loyalty Rewards",
      description:
        "Earn points with every order and enjoy exclusive discounts and rewards.",
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Quality Guarantee",
      description:
        "Fresh products delivered safely with our quality assurance and hygiene standards.",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      icon: <Smartphone className="w-8 h-8 text-white" />,
      title: "Browse Nearby Shops",
      description:
        "Discover local shops within 500m and explore their fresh product offerings.",
    },
    {
      step: "2",
      icon: <ShoppingBag className="w-8 h-8 text-white" />,
      title: "Place Your Order",
      description:
        "Select products, schedule delivery, and choose from multiple payment options.",
    },
    {
      step: "3",
      icon: <Truck className="w-8 h-8 text-white" />,
      title: "Eco-Friendly Delivery",
      description:
        "Our electric vehicles deliver your order quickly while protecting the environment.",
    },
    {
      step: "4",
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      title: "Enjoy Fresh Products",
      description:
        "Receive fresh, quality products at your doorstep and earn loyalty points.",
    },
  ];

  const stats = [
    { number: "500m", label: "Delivery Radius" },
    { number: "15min", label: "Average Delivery" },
    { number: "100%", label: "Electric Fleet" },
    { number: "450+", label: "Local Shops" },
  ];

  const testimonials = [
    {
      name: "Tarun Chaudhary",
      role: "Local Resident",
      content:
        "Amazing service! I get fresh vegetables from my neighborhood shop in minutes. Love supporting local business.",
      rating: 5,
    },
    {
      name: "Chitwan Bajpai",
      role: "Shop Owner",
      content:
        "Near me transformed my business. More customers, better visibility, and the delivery service is fantastic.",
      rating: 5,
    },
    {
      name: "Ananad Manuwanjay Awasthi",
      role: "Eco-Conscious Customer",
      content:
        "Finally, a delivery service that cares about the environment. Electric vehicles and sustainable packaging!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-4 bg-green-100 text-green-800 hover:bg-green-100"
            >
              <Leaf className="w-3 h-3 mr-1" />
              Hyperlocal • Eco-Friendly • Community-First
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Fresh Products from
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {" "}
                Nearby Shops
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with local shops within 500 meters. Get fresh products
              delivered by eco-friendly electric vehicles while supporting your
              neighborhood community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl"
              >
                Start Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link to="/shop-owner-dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-xl border-green-200 hover:bg-green-50"
                >
                  <Store className="w-5 h-5 mr-2" />
                  Join as Shop Owner
                </Button>
              </Link>
            </div>

            {/* Location Input */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Enter your location to find nearby shops"
                  className="pl-11 h-12 rounded-xl border-green-200 focus:border-green-400"
                />
                <Button className="absolute right-2 top-2 h-8 rounded-lg bg-green-600 hover:bg-green-700">
                  <Target className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-green-100 text-green-800"
            >
              Why Choose Near me
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Hyperlocal Delivery Redefined
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of local shopping with sustainable delivery,
              real-time tracking, and community support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-green-100 text-green-800"
            >
              Simple Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How Near me Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From discovery to delivery in four simple steps. Fresh products
              from your neighborhood, delivered sustainably.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-green-100 text-green-800"
            >
              Customer Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Loved by Communities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what customers and shop owners are saying about their Near me
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-gray-700 italic text-base leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Support Your Local Community?
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Join thousands of customers and shop owners who are making their
              neighborhoods more sustainable and connected.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg rounded-xl"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Download App
              </Button>
              <Link to="/shop-owner-dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-xl border-white text-white hover:bg-white hover:text-green-600"
                >
                  <Store className="w-5 h-5 mr-2" />
                  Partner With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Near me</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connecting communities through hyperlocal, eco-friendly delivery
                services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Customers</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Browse Shops</li>
                <li>Track Orders</li>
                <li>Loyalty Program</li>
                <li>Sustainability</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Shop Owners</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/shop-owner-dashboard"
                    className="hover:text-white transition-colors"
                  >
                    Partner Dashboard
                  </Link>
                </li>
                <li>Analytics</li>
                <li>Promotional Tools</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2024 Near me. All rights reserved. Building sustainable
              communities, one delivery at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
