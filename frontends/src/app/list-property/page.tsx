"use client";

import { useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import Link from "next/link";
import Logo from "../../components/Logo";
import { 
  Home, 
  Link as LinkIcon, 
  Gem, 
  User, 
  Globe, 
  ArrowLeft,
  MapPin,
  DollarSign,
  Square,
  Bed,
  Bath,
  FileText,
  Upload,
  AlertCircle,
  CheckCircle,
  Loader2,
  Building2,
  Shield,
  TrendingUp,
  X
} from "lucide-react";

export default function ListProperty() {
  const { isConnected } = useAppKitAccount();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    propertyType: "residential",
    price: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    images: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Property title is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required";
    if (!formData.size || parseFloat(formData.size) <= 0) newErrors.size = "Valid size is required";
    if (!formData.bedrooms || parseInt(formData.bedrooms) < 0) newErrors.bedrooms = "Valid bedroom count is required";
    if (!formData.bathrooms || parseInt(formData.bathrooms) < 0) newErrors.bathrooms = "Valid bathroom count is required";
    if (!formData.description.trim() || formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters";
    }
    if (imageFiles.length === 0) {
      newErrors.images = "At least one property image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setErrors(prev => ({ ...prev, images: "Some files were rejected. Please use JPG, PNG, or WebP files under 10MB." }));
    }

    // Limit to 5 images total
    const totalImages = imageFiles.length + validFiles.length;
    if (totalImages > 5) {
      setErrors(prev => ({ ...prev, images: "Maximum 5 images allowed." }));
      return;
    }

    // Add new files
    setImageFiles(prev => [...prev, ...validFiles]);

    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // Clear errors
    if (errors.images) {
      setErrors(prev => ({ ...prev, images: "" }));
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    // Process files directly instead of creating synthetic event
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setErrors(prev => ({ ...prev, images: "Some files were rejected. Please use JPG, PNG, or WebP files under 10MB." }));
    }

    // Limit to 5 images total
    const totalImages = imageFiles.length + validFiles.length;
    if (totalImages > 5) {
      setErrors(prev => ({ ...prev, images: "Maximum 5 images allowed." }));
      return;
    }

    // Add new files
    setImageFiles(prev => [...prev, ...validFiles]);

    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // Clear errors
    if (errors.images) {
      setErrors(prev => ({ ...prev, images: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success handling
      alert("Property listed successfully!");
      
      // Reset form
      setFormData({
        title: "",
        location: "",
        propertyType: "residential",
        price: "",
        size: "",
        bedrooms: "",
        bathrooms: "",
        description: "",
        images: []
      });
      setCurrentStep(1);
    } catch (error) {
      alert("Failed to list property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, title: "Property Details", icon: Building2 },
    { id: 2, title: "Specifications", icon: Square },
    { id: 3, title: "Description & Media", icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation Header */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Logo variant="compact" width={120} height={32} />
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/browse" className="text-gray-300 hover:text-white transition-colors">Browse</Link>
              <Link href="/list-property" className="text-blue-400 font-medium">List Property</Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Wallet Connected</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-medium">Connect Wallet</span>
                </div>
              )}
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="text-blue-400 hover:text-blue-300 mb-6 inline-flex items-center transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              List Your Property
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Create an immutable property listing on Hedera blockchain and enable fractional ownership for global investors.
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${isActive ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-gray-500'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive ? 'border-blue-400 bg-blue-400/10' : 
                      isCompleted ? 'border-green-400 bg-green-400/10' : 
                      'border-gray-600 bg-gray-600/10'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className="font-medium hidden sm:block">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${isCompleted ? 'bg-green-400' : 'bg-gray-600'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Warning if not connected */}
        {!isConnected && (
          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-600/50 rounded-xl p-6 mb-8 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
              <div>
                <h3 className="text-yellow-400 font-semibold mb-1">Wallet Connection Required</h3>
                <p className="text-yellow-200">
                  Please connect your Hedera-compatible wallet to list a property on the blockchain.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Property Details Section */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <Building2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Property Details</h2>
                  <p className="text-gray-400">Tell us about your property&apos;s basic information</p>
                </div>
                
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-300 mb-3">
                      Property Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 bg-slate-700/50 border rounded-xl focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all ${
                        errors.title ? 'border-red-500' : 'border-slate-600 focus:border-blue-500'
                      }`}
                      placeholder="e.g., Modern 3-bedroom apartment in Victoria Island"
                    />
                    {errors.title && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-semibold text-gray-300 mb-3">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-700/50 border rounded-xl focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all ${
                          errors.location ? 'border-red-500' : 'border-slate-600 focus:border-blue-500'
                        }`}
                        placeholder="e.g., Victoria Island, Lagos, Nigeria"
                      />
                    </div>
                    {errors.location && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.location}
                      </p>
                    )}
                  </div>

                  {/* Property Type and Price */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="propertyType" className="block text-sm font-semibold text-gray-300 mb-3">
                        Property Type *
                      </label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        required
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-all"
                      >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="land">Land</option>
                        <option value="industrial">Industrial</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="price" className="block text-sm font-semibold text-gray-300 mb-3">
                        Price (HBAR) *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          id="price"
                          name="price"
                          required
                          value={formData.price}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-4 bg-slate-700/50 border rounded-xl focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all ${
                            errors.price ? 'border-red-500' : 'border-slate-600 focus:border-blue-500'
                          }`}
                          placeholder="100000"
                        />
                      </div>
                      {errors.price && (
                        <p className="text-red-400 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.price}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Property Specifications */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <Square className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Specifications</h2>
                  <p className="text-gray-400">Provide detailed specifications of your property</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="size" className="block text-sm font-semibold text-gray-300 mb-3">
                      Size (sqm) *
                    </label>
                    <div className="relative">
                      <Square className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        id="size"
                        name="size"
                        required
                        value={formData.size}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-700/50 border rounded-xl focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all ${
                          errors.size ? 'border-red-500' : 'border-slate-600 focus:border-blue-500'
                        }`}
                        placeholder="150"
                      />
                    </div>
                    {errors.size && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.size}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bedrooms" className="block text-sm font-semibold text-gray-300 mb-3">
                      Bedrooms *
                    </label>
                    <div className="relative">
                      <Bed className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        id="bedrooms"
                        name="bedrooms"
                        required
                        value={formData.bedrooms}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-700/50 border rounded-xl focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all ${
                          errors.bedrooms ? 'border-red-500' : 'border-slate-600 focus:border-blue-500'
                        }`}
                        placeholder="3"
                      />
                    </div>
                    {errors.bedrooms && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.bedrooms}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bathrooms" className="block text-sm font-semibold text-gray-300 mb-3">
                      Bathrooms *
                    </label>
                    <div className="relative">
                      <Bath className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        id="bathrooms"
                        name="bathrooms"
                        required
                        value={formData.bathrooms}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-700/50 border rounded-xl focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all ${
                          errors.bathrooms ? 'border-red-500' : 'border-slate-600 focus:border-blue-500'
                        }`}
                        placeholder="2"
                      />
                    </div>
                    {errors.bathrooms && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.bathrooms}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Description Section */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <FileText className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Description & Media</h2>
                  <p className="text-gray-400">Add detailed description and property images</p>
                </div>
                
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-3">
                      Property Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={6}
                      value={formData.description}
                      onChange={handleChange}
                      className={`w-full px-4 py-4 bg-slate-700/50 border rounded-xl focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all resize-none ${
                        errors.description ? 'border-red-500' : 'border-slate-600 focus:border-blue-500'
                      }`}
                      placeholder="Describe your property in detail. Include features, amenities, nearby attractions, and what makes it special..."
                    />
                    <div className="flex justify-between items-center mt-2">
                      {errors.description ? (
                        <p className="text-red-400 text-sm flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.description}
                        </p>
                      ) : (
                        <p className="text-gray-400 text-sm">
                          {formData.description.length}/50 minimum characters
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Property Images *
                    </label>
                    
                    {/* Upload Area */}
                    <div 
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                        errors.images ? 'border-red-500' : 'border-slate-600 hover:border-blue-500'
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">Drag and drop images here, or click to browse</p>
                      <p className="text-gray-500 text-sm">Support: JPG, PNG, WebP (Max 10MB each, 5 images max)</p>
                      
                      <input
                        id="image-upload"
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>

                    {/* Error Message */}
                    {errors.images && (
                      <p className="text-red-400 text-sm flex items-center mt-2">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.images}
                      </p>
                    )}

                    {/* Image Previews */}
                    {imagePreviewUrls.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-300 mb-3">
                          Uploaded Images ({imagePreviewUrls.length}/5)
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {imagePreviewUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={url}
                                alt={`Property ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-slate-600"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              {index === 0 && (
                                <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                  Main
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isConnected}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Listing Property...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>List Property</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-white mb-8 text-center">Why List on Afrika Property Guardian?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Blockchain Security</h4>
              <p className="text-gray-400 text-sm">Immutable property records on Hedera network</p>
            </div>
            <div className="text-center bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Global Reach</h4>
              <p className="text-gray-400 text-sm">Connect with investors worldwide</p>
            </div>
            <div className="text-center bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Fractional Ownership</h4>
              <p className="text-gray-400 text-sm">Enable multiple investors to own shares</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

