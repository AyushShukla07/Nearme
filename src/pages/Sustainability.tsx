import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import {
  Leaf,
  Truck,
  TreePine,
  Recycle,
  MapPin,
  Target,
  Users,
  Award,
  TrendingUp,
  Lightbulb,
  Package,
  Factory,
  Wind,
  Droplets,
  Battery,
  Zap,
  Globe,
  Heart,
  ArrowRight,
  CheckCircle,
  Calendar,
  BarChart3,
  Clock,
} from "lucide-react";

const Sustainability = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock sustainability metrics
  const metrics = {
    co2Saved: 2450,
    electricVehicles: 127,
    localShops: 450,
    ecoPackaging: 89,
    treesPlanted: 1200,
    waterSaved: 15000,
    renewableEnergy: 95,
    wasteReduced: 3200,
  };

  const monthlyImpact = [
    { month: "Jan", co2: 180, packaging: 85 },
    { month: "Feb", co2: 220, packaging: 88 },
    { month: "Mar", co2: 310, packaging: 90 },
    { month: "Apr", co2: 420, packaging: 87 },
    { month: "May", co2: 580, packaging: 89 },
    { month: "Jun", co2: 680, packaging: 91 },
  ];

  const evFleet = [
    {
      model: "Mahindra eVerito",
      count: 45,
      range: "110 km",
      efficiency: "0.2 kWh/km",
      dailyDistance: "80-100 km",
    },
    {
      model: "Tata Nexon EV",
      count: 32,
      range: "312 km",
      efficiency: "0.15 kWh/km",
      dailyDistance: "120-150 km",
    },
    {
      model: "Hero Electric Optima",
      count: 50,
      range: "82 km",
      efficiency: "0.8 kWh/100km",
      dailyDistance: "40-60 km",
    },
  ];

  const sustainabilityTips = [
    {
      icon: <Package className="w-5 h-5 text-green-600" />,
      title: "Choose Minimal Packaging",
      description:
        "Opt for products with biodegradable or minimal packaging when shopping.",
    },
    {
      icon: <Recycle className="w-5 h-5 text-green-600" />,
      title: "Reuse Delivery Bags",
      description:
        "Keep and reuse cloth bags from previous deliveries for future orders.",
    },
    {
      icon: <MapPin className="w-5 h-5 text-green-600" />,
      title: "Shop Local First",
      description:
        "Prioritize local shops within walking distance to reduce delivery emissions.",
    },
    {
      icon: <Calendar className="w-5 h-5 text-green-600" />,
      title: "Batch Your Orders",
      description:
        "Combine multiple items into single orders to minimize delivery trips.",
    },
    {
      icon: <Leaf className="w-5 h-5 text-green-600" />,
      title: "Choose Organic",
      description:
        "Support organic farming by choosing certified organic products.",
    },
    {
      icon: <Users className="w-5 h-5 text-green-600" />,
      title: "Share with Neighbors",
      description:
        "Coordinate orders with neighbors to reduce overall delivery frequency.",
    },
  ];

  const initiatives = [
    {
      title: "Zero-Emission Delivery Fleet",
      description:
        "100% electric vehicle fleet powered by renewable energy sources",
      icon: <Truck className="w-8 h-8 text-green-600" />,
      progress: 100,
      details: [
        "127 electric vehicles in operation",
        "0 tons of CO2 emissions from deliveries",
        "95% renewable energy charging stations",
        "2,450 kg CO2 saved this year",
      ],
    },
    {
      title: "Eco-Friendly Packaging Program",
      description:
        "Partnership with local shops to promote sustainable packaging solutions",
      icon: <Package className="w-8 h-8 text-green-600" />,
      progress: 89,
      details: [
        "89% of partners use eco-friendly packaging",
        "Biodegradable bags and containers",
        "Minimal packaging initiatives",
        "Reusable container programs",
      ],
    },
    {
      title: "Carbon Offset Programs",
      description:
        "Active participation in tree planting and renewable energy projects",
      icon: <TreePine className="w-8 h-8 text-green-600" />,
      progress: 95,
      details: [
        "1,200 trees planted this year",
        "Partnership with local environmental groups",
        "Solar panel installations at partner shops",
        "Wetland restoration projects",
      ],
    },
    {
      title: "Local Community Support",
      description:
        "Reducing transportation distances by supporting neighborhood businesses",
      icon: <Heart className="w-8 h-8 text-green-600" />,
      progress: 92,
      details: [
        "450+ local shops within 500m radius",
        "Average delivery distance: 180m",
        "Supporting local economy and jobs",
        "Reducing supply chain complexity",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
              <Leaf className="w-3 h-3 mr-1" />
              Sustainability Report 2024
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Building a{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Greener Future
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every delivery matters. Discover how Near me is revolutionizing
              hyperlocal commerce while protecting our environment through
              electric vehicles, sustainable packaging, and community-first
              practices.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="electric">Electric Fleet</TabsTrigger>
            <TabsTrigger value="packaging">Packaging</TabsTrigger>
            <TabsTrigger value="tips">Eco Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Impact Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {metrics.co2Saved.toLocaleString()}kg
                  </div>
                  <div className="text-sm text-gray-600">CO₂ Saved</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Battery className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {metrics.electricVehicles}
                  </div>
                  <div className="text-sm text-gray-600">Electric Vehicles</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TreePine className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {metrics.treesPlanted.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Trees Planted</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Recycle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {metrics.ecoPackaging}%
                  </div>
                  <div className="text-sm text-gray-600">Eco Packaging</div>
                </CardContent>
              </Card>
            </div>

            {/* Sustainability Initiatives */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Our Sustainability Initiatives
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {initiatives.map((initiative, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="bg-green-50 p-3 rounded-xl">
                          {initiative.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">
                            {initiative.title}
                          </CardTitle>
                          <CardDescription className="mb-4">
                            {initiative.description}
                          </CardDescription>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">
                                {initiative.progress}%
                              </span>
                            </div>
                            <Progress
                              value={initiative.progress}
                              className="h-2"
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {initiative.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Monthly Impact Chart */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Monthly Environmental Impact
                </CardTitle>
                <CardDescription>
                  Track our progress in CO₂ reduction and sustainable packaging
                  adoption
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <p className="text-green-700 font-medium">
                      Impact Chart Visualization
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Showing steady improvement across all metrics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="electric">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Electric Vehicle Fleet
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  100% electric delivery fleet powered by renewable energy,
                  ensuring zero-emission deliveries for our community.
                </p>
              </div>

              {/* Fleet Overview */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {evFleet.map((vehicle, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {vehicle.model}
                        </CardTitle>
                        <Badge variant="outline">{vehicle.count} units</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Range:</span>
                        <span className="font-medium">{vehicle.range}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Efficiency:</span>
                        <span className="font-medium">
                          {vehicle.efficiency}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Daily Distance:</span>
                        <span className="font-medium">
                          {vehicle.dailyDistance}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* EV Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    Electric Vehicle Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">
                        Environmental Impact
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Zero direct emissions during operation
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          95% reduction in local air pollution
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Renewable energy charging infrastructure
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Noise pollution reduction by 60%
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">
                        Community Benefits
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Cleaner air quality in neighborhoods
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Reduced traffic congestion
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Lower operational costs
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Supporting green job creation
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Charging Infrastructure */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Battery className="w-5 h-5 mr-2 text-blue-600" />
                    Charging Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="w-8 h-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold mb-2">
                        25 Charging Stations
                      </h4>
                      <p className="text-sm text-gray-600">
                        Strategically located across delivery zones
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Wind className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold mb-2">
                        95% Renewable Energy
                      </h4>
                      <p className="text-sm text-gray-600">
                        Solar and wind powered charging
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-8 h-8 text-orange-600" />
                      </div>
                      <h4 className="font-semibold mb-2">30-60 min</h4>
                      <p className="text-sm text-gray-600">
                        Fast charging capabilities
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packaging">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Sustainable Packaging Initiative
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Partnering with local shops to promote eco-friendly packaging
                  solutions and reduce waste in our community.
                </p>
              </div>

              {/* Packaging Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      89%
                    </div>
                    <div className="text-sm text-gray-600">
                      Shops Using Eco Packaging
                    </div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      3.2T
                    </div>
                    <div className="text-sm text-gray-600">Waste Reduced</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      450+
                    </div>
                    <div className="text-sm text-gray-600">Partner Shops</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      75%
                    </div>
                    <div className="text-sm text-gray-600">
                      Biodegradable Materials
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Packaging Types */}
              <Card>
                <CardHeader>
                  <CardTitle>Eco-Friendly Packaging Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Leaf className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold mb-2">Biodegradable Bags</h4>
                      <p className="text-sm text-gray-600">
                        Made from plant-based materials that decompose naturally
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Recycle className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold mb-2">
                        Reusable Containers
                      </h4>
                      <p className="text-sm text-gray-600">
                        Durable containers that customers can return and reuse
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Package className="w-6 h-6 text-orange-600" />
                      </div>
                      <h4 className="font-semibold mb-2">Minimal Packaging</h4>
                      <p className="text-sm text-gray-600">
                        Reduced packaging materials without compromising safety
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TreePine className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-semibold mb-2">Recycled Paper</h4>
                      <p className="text-sm text-gray-600">
                        Paper bags and wrapping made from recycled materials
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Droplets className="w-6 h-6 text-teal-600" />
                      </div>
                      <h4 className="font-semibold mb-2">
                        Water-Soluble Wraps
                      </h4>
                      <p className="text-sm text-gray-600">
                        Innovative wrapping that dissolves harmlessly in water
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Heart className="w-6 h-6 text-red-600" />
                      </div>
                      <h4 className="font-semibold mb-2">
                        Compostable Options
                      </h4>
                      <p className="text-sm text-gray-600">
                        Packaging that breaks down into nutrient-rich compost
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Partner Commitment */}
              <Card>
                <CardHeader>
                  <CardTitle>Our Partner Commitment</CardTitle>
                  <CardDescription>
                    Working together with local shops to reduce environmental
                    impact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Training Programs</h4>
                        <p className="text-sm text-gray-600">
                          Educational workshops on sustainable packaging
                          practices
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Incentive Programs</h4>
                        <p className="text-sm text-gray-600">
                          Rewards for shops adopting eco-friendly packaging
                          solutions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Bulk Purchasing</h4>
                        <p className="text-sm text-gray-600">
                          Collective buying power to reduce costs of sustainable
                          materials
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Regular Audits</h4>
                        <p className="text-sm text-gray-600">
                          Ongoing assessment and improvement of packaging
                          practices
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tips">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Sustainable Living Tips
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Small actions create big impact. Discover practical ways to
                  make your shopping and daily habits more environmentally
                  friendly.
                </p>
              </div>

              {/* Tips Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {sustainabilityTips.map((tip, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-green-50 p-3 rounded-full flex-shrink-0">
                          {tip.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {tip.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Your Impact */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <Award className="w-5 h-5 mr-2" />
                    Your Environmental Impact
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    Track your personal contribution to our sustainability goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        15kg
                      </div>
                      <div className="text-xs text-green-700">
                        CO₂ Saved This Month
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        23
                      </div>
                      <div className="text-xs text-green-700">
                        Eco Orders Placed
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        87%
                      </div>
                      <div className="text-xs text-green-700">
                        Sustainable Choices
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        5
                      </div>
                      <div className="text-xs text-green-700">
                        Trees Equivalent
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Join Our Green Community
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Every sustainable choice you make contributes to a healthier
                    planet and stronger local community. Start making a
                    difference today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Leaf className="w-4 h-4 mr-2" />
                      Shop Sustainably
                    </Button>
                    <Button variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Share with Friends
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Sustainability;
