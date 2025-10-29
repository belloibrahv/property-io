"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Logo from "../../components/Logo";
import {
  BookOpen,
  Play,
  Users,
  TrendingUp,
  Shield,
  Coins,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Award,
  Lightbulb,
  Target,
  PieChart,
  Building2,
  Zap,
  Lock,
  User,
  Search,
  Filter,
  ChevronRight,
  Download,
  ExternalLink
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  lessons: number;
  rating: number;
  students: number;
  image: string;
  category: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  author: string;
  date: string;
  featured: boolean;
}

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const courses: Course[] = [
    {
      id: "1",
      title: "Real Estate Investment Fundamentals",
      description: "Learn the basics of property investment, market analysis, and risk management strategies.",
      duration: "4 hours",
      level: "Beginner",
      lessons: 12,
      rating: 4.8,
      students: 2340,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
      category: "Investment"
    },
    {
      id: "2",
      title: "Blockchain & Real Estate: The Future",
      description: "Understand how blockchain technology is revolutionizing property transactions and ownership.",
      duration: "3 hours",
      level: "Intermediate",
      lessons: 8,
      rating: 4.9,
      students: 1890,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
      category: "Blockchain"
    },
    {
      id: "3",
      title: "Fractional Ownership Strategies",
      description: "Master the art of property fractionalization and shared investment opportunities.",
      duration: "2.5 hours",
      level: "Advanced",
      lessons: 6,
      rating: 4.7,
      students: 1456,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      category: "Fractional"
    },
    {
      id: "4",
      title: "African Property Markets Overview",
      description: "Comprehensive guide to property investment opportunities across African markets.",
      duration: "5 hours",
      level: "Intermediate",
      lessons: 15,
      rating: 4.6,
      students: 3200,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      category: "Markets"
    }
  ];

  const articles: Article[] = [
    {
      id: "1",
      title: "The Rise of Tokenized Real Estate in Africa",
      excerpt: "Exploring how blockchain technology is making property investment more accessible across the continent.",
      readTime: "8 min read",
      category: "Blockchain",
      author: "Sarah Johnson",
      date: "2024-01-15",
      featured: true
    },
    {
      id: "2",
      title: "5 Key Metrics for Property Investment Success",
      excerpt: "Essential indicators every property investor should monitor for optimal returns.",
      readTime: "6 min read",
      category: "Investment",
      author: "Michael Chen",
      date: "2024-01-12",
      featured: false
    },
    {
      id: "3",
      title: "Understanding Smart Contracts in Real Estate",
      excerpt: "How automated contracts are streamlining property transactions and reducing costs.",
      readTime: "10 min read",
      category: "Technology",
      author: "Amara Okafor",
      date: "2024-01-10",
      featured: true
    }
  ];

  const categories = ["all", "Investment", "Blockchain", "Fractional", "Markets", "Technology"];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <Logo variant="compact" width={120} height={32} />
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/browse" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Properties
                </Link>
                <Link href="/fractionalize" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Fractionalize
                </Link>
                <Link href="/portfolio" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Portfolio
                </Link>
                <Link href="/learn" className="text-blue-400 hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors">
                  Learn
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <Lightbulb className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Knowledge Hub</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Master Property Investment
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              with Blockchain
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Comprehensive courses, expert insights, and practical guides to help you navigate 
            the future of real estate investment in Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Start Learning</span>
            </button>
            <button className="border border-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-400">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses and articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("courses")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "courses"
                    ? "bg-blue-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => setActiveTab("articles")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "articles"
                    ? "bg-blue-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Articles
              </button>
              <button
                onClick={() => setActiveTab("guides")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "guides"
                    ? "bg-blue-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Guides
              </button>
            </div>
          </div>

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-750 transition-colors group">
                  <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                    {course.image ? (
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                    )}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        course.level === "Beginner" ? "bg-green-500/20 text-green-400" :
                        course.level === "Intermediate" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center space-x-2 text-white">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 text-sm font-medium">{course.category}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm">{course.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>{course.lessons} lessons</span>
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Start Course</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Articles Tab */}
          {activeTab === "articles" && (
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <div key={article.id} className={`bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors ${
                  article.featured ? "border border-blue-500/30" : ""
                }`}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-blue-400 text-sm font-medium">{article.category}</span>
                        <span className="text-gray-400 text-sm">{article.readTime}</span>
                        {article.featured && (
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-white font-semibold text-xl mb-2 hover:text-blue-400 transition-colors cursor-pointer">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-sm text-gray-400">
                          <span>By {article.author}</span>
                          <span>•</span>
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                        
                        <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1 text-sm font-medium">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Guides Tab */}
          {activeTab === "guides" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold">Investment Strategy Guide</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Step-by-step guide to building a successful property investment portfolio.
                </p>
                <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1 text-sm font-medium">
                  <span>Download PDF</span>
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold">Fractionalization Handbook</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Complete guide to fractional property ownership and tokenization.
                </p>
                <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1 text-sm font-medium">
                  <span>Download PDF</span>
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold">Risk Management Guide</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Essential strategies for minimizing risks in property investment.
                </p>
                <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1 text-sm font-medium">
                  <span>Download PDF</span>
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-white font-semibold">African Markets Overview</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Comprehensive analysis of property markets across Africa.
                </p>
                <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1 text-sm font-medium">
                  <span>Download PDF</span>
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-t border-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-gray-300 mb-8">
            Join thousands of successful investors who have transformed their financial future 
            through strategic property investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Browse Properties</span>
            </Link>
            <Link href="/list-property" className="border border-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>List Your Property</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}