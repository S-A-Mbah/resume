"use client";

import { Comfortaa } from "next/font/google";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FEATURED_PROPERTIES, CATEGORIES, Property } from "./data";

// Initialize font
const comfortaa = Comfortaa({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa",
});

// --- Components ---

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const { theme } = useTheme();
  
  const navItems = [
    { id: "home", label: "Explore", icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )},
    { id: "saved", label: "Saved", icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )},
    { id: "profile", label: "Profile", icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )}
  ];

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md px-6 py-4 rounded-full shadow-2xl z-50 flex justify-between items-center backdrop-blur-md transition-colors duration-300 ${
      theme === "dark" 
        ? "bg-[#112240]/90 text-gray-400 border border-[#D4AF37]/20" 
        : "bg-white/90 text-gray-400 border border-gray-100"
    }`}>
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive 
                ? theme === "dark" ? "text-[#D4AF37]" : "text-black"
                : "text-gray-400 hover:text-gray-500"
            }`}
          >
            <motion.div
              animate={{ scale: isActive ? 1.1 : 1 }}
              whileTap={{ scale: 0.9 }}
            >
              {item.icon}
            </motion.div>
            {isActive && (
              <motion.span 
                layoutId="nav-dot"
                className={`w-1 h-1 rounded-full mt-1 ${theme === "dark" ? "bg-[#D4AF37]" : "bg-black"}`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

const FilterModal = ({ isOpen, onClose, onApply }: { isOpen: boolean, onClose: () => void, onApply: (price: number, types: string[]) => void }) => {
  const { theme } = useTheme();
  const [price, setPrice] = useState(2500000);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleApply = () => {
    onApply(price, selectedTypes);
    onClose();
  };

  const handleClear = () => {
    setPrice(5000000);
    setSelectedTypes([]);
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className={`relative w-full max-w-lg p-6 rounded-t-3xl sm:rounded-3xl pointer-events-auto ${
          theme === "dark" ? "bg-[#112240]" : "bg-white"
        }`}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6 sm:hidden" />
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Filters</h3>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleClear}
              className={`text-sm font-medium transition-colors ${
                theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"
              }`}
            >
              Clear All
            </button>
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-gray-400">Price Range</label>
              <span className={`text-lg font-bold ${theme === "dark" ? "text-[#D4AF37]" : "text-black"}`}>
                {price < 1000000 ? `$${price.toLocaleString()}` : `$${(price / 1000000).toFixed(1)}M`}
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <input 
                type="range" 
                min="100000" 
                max="5000000" 
                step="100000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  theme === "dark" ? "bg-gray-700 accent-[#D4AF37]" : "bg-gray-200 accent-black"
                }`}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>$100k</span>
              <span>$5m+</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">Property Type</label>
            <div className="flex flex-wrap gap-2">
              {["House", "Apartment", "Villa", "Penthouse"].map(opt => {
                const isSelected = selectedTypes.includes(opt);
                return (
                  <button 
                    key={opt} 
                    onClick={() => handleTypeToggle(opt)}
                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                      isSelected
                        ? theme === "dark"
                          ? "bg-[#D4AF37] text-[#0a192f] border-[#D4AF37]"
                          : "bg-black text-white border-black"
                        : theme === "dark" 
                          ? "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white" 
                          : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-black"
                  }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <button 
            onClick={handleApply}
            className={`w-full py-4 rounded-xl font-bold mt-4 ${
              theme === "dark" ? "bg-[#D4AF37] text-[#0a192f]" : "bg-black text-white"
            }`}
          >
            Show Properties
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PropertyCard = ({ property, onClick }: { property: Property, onClick: () => void }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`relative group cursor-pointer overflow-hidden rounded-3xl mb-6 shadow-sm hover:shadow-xl transition-all duration-300 ${
        theme === "dark" ? "bg-[#112240]" : "bg-white"
      }`}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium">
          {property.type}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-xl font-bold ${theme === "dark" ? "text-[#ccd6f6]" : "text-gray-900"}`}>
            {property.title}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className={`text-sm font-medium ${theme === "dark" ? "text-[#8892b0]" : "text-gray-600"}`}>
              {property.rating}
            </span>
          </div>
        </div>
        
        <p className={`text-sm mb-4 ${theme === "dark" ? "text-[#8892b0]" : "text-gray-500"}`}>
          {property.address}
        </p>
        
        <div className="flex items-center gap-4 text-sm mb-4 text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
            {property.beds} Beds
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /></svg>
            {property.baths} Bath
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            {property.sqft} sqft
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col">
            <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-400"}`}>Price</span>
            <span className={`text-lg font-bold ${theme === "dark" ? "text-[#D4AF37]" : "text-black"}`}>
              ${property.price.toLocaleString()}
            </span>
          </div>
          <button className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            theme === "dark" 
              ? "bg-[#D4AF37] text-[#0a192f] hover:bg-[#b5952f]" 
              : "bg-black text-white hover:bg-gray-800"
          }`}>
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const DetailView = ({ property, onClose }: { property: Property, onClose: () => void }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      className={`fixed inset-0 z-[60] overflow-y-auto ${theme === "dark" ? "bg-[#0a192f]" : "bg-white"}`}
    >
      <div className="relative h-96">
        <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <div className={`relative -mt-10 rounded-t-[2.5rem] p-8 min-h-screen ${theme === "dark" ? "bg-[#0a192f]" : "bg-white"}`}>
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-8" />
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className={`text-3xl font-bold mb-2 ${theme === "dark" ? "text-[#ccd6f6]" : "text-gray-900"}`}>
              {property.title}
            </h2>
            <p className={`text-lg ${theme === "dark" ? "text-[#8892b0]" : "text-gray-500"}`}>
              {property.address}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold ${theme === "dark" ? "text-[#D4AF37]" : "text-black"}`}>
              ${(property.price / 1000).toFixed(0)}k
            </p>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-yellow-400">★</span>
              <span className={`font-medium ${theme === "dark" ? "text-[#ccd6f6]" : "text-gray-900"}`}>{property.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {property.amenities.map((amenity) => (
            <div 
              key={amenity}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium ${
                theme === "dark" 
                  ? "bg-[#112240] text-[#ccd6f6] border border-[#64ffda]/10" 
                  : "bg-gray-50 text-gray-600 border border-gray-100"
              }`}
            >
              {amenity}
            </div>
          ))}
        </div>
        
        <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-[#ccd6f6]" : "text-gray-900"}`}>Description</h3>
        <p className={`leading-relaxed mb-10 ${theme === "dark" ? "text-[#8892b0]" : "text-gray-600"}`}>
          {property.description}
        </p>
        
        <div className={`fixed bottom-0 left-0 right-0 p-6 border-t ${
          theme === "dark" ? "bg-[#0a192f] border-gray-800" : "bg-white border-gray-100"
        }`}>
          <div className="max-w-4xl mx-auto flex gap-4">
            <button className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-transform active:scale-95 ${
              theme === "dark" 
                ? "bg-[#D4AF37] text-[#0a192f]" 
                : "bg-black text-white"
            }`}>
              Book Viewing
            </button>
            <button className={`p-4 rounded-2xl border transition-colors ${
              theme === "dark" ? "border-gray-700 text-[#D4AF37]" : "border-gray-200 text-gray-900"
            }`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-5.427-2.147l-4.5 4.5 4.5-4.5A8.013 8.013 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---

export default function WePropertiesPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [savedHomes, setSavedHomes] = useState<Property[]>([FEATURED_PROPERTIES[0], FEATURED_PROPERTIES[2]]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<{ price: number, types: string[] }>({ price: 5000000, types: [] });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredProperties = FEATURED_PROPERTIES.filter(p => {
    const matchesCategory = selectedCategory === "all" || p.type.toLowerCase().includes(selectedCategory) || (selectedCategory === "luxury" && p.price > 1000000);
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price <= filters.price;
    const matchesType = filters.types.length === 0 || filters.types.some(t => p.type.includes(t));
    
    return matchesCategory && matchesSearch && matchesPrice && matchesType;
  });

  return (
    <div className={`min-h-screen ${comfortaa.className} ${
      theme === "dark" 
        ? "bg-[#0a192f]" 
        : "bg-gray-50"
    }`}>
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 ${
          theme === "dark" ? "bg-[#D4AF37]" : "bg-orange-200"
        }`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 ${
          theme === "dark" ? "bg-[#64ffda]" : "bg-blue-200"
        }`} />
      </div>

      {/* Header / Search */}
      <nav className={`sticky top-0 z-40 px-6 py-4 backdrop-blur-md transition-colors ${
        theme === "dark" ? "bg-[#0a192f]/80" : "bg-gray-50/80"
      }`}>
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link href="/#projects" className={`inline-flex items-center gap-2 text-sm mb-6 ${
            theme === "dark" ? "text-[#ccd6f6] hover:text-[#D4AF37]" : "text-gray-600 hover:text-black"
          }`}>
             <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
             Back to Portfolio
          </Link>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-[#ccd6f6]" : "text-gray-900"}`}>
                Find your <span className={theme === "dark" ? "text-[#D4AF37]" : "text-yellow-600"}>Premium</span>
                <br />Home today
              </h1>
            </div>
            
            {/* Theme Toggle Button (Replaces Profile Pic) */}
            <button 
              onClick={toggleTheme}
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                theme === "dark" 
                  ? "border-[#D4AF37] bg-[#112240] text-yellow-400" 
                  : "border-gray-200 bg-white text-gray-600 shadow-sm"
              }`}
            >
              {theme === 'dark' ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="Search location, price..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-4 pl-12 pr-4 rounded-2xl outline-none shadow-sm transition-all focus:ring-2 ${
                theme === "dark" 
                  ? "bg-[#112240] text-white placeholder-gray-500 focus:ring-[#D4AF37]/50" 
                  : "bg-white text-gray-900 placeholder-gray-400 focus:ring-black/10"
              }`}
            />
            <svg 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                theme === "dark" 
                  ? (filters.types.length > 0 || filters.price < 5000000 ? "bg-[#D4AF37] text-[#0a192f] shadow-[0_0_15px_rgba(212,175,55,0.3)]" : "bg-[#112240] text-gray-400 border border-gray-700")
                  : (filters.types.length > 0 || filters.price < 5000000 ? "bg-black text-white shadow-lg" : "bg-white text-gray-400 border border-gray-200")
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              {(filters.types.length > 0 || filters.price < 5000000) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0a192f]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 pb-32">
        {/* Categories */}
        {/* Categories */}
        {activeTab === "home" && (
          <div className="flex gap-4 overflow-x-auto pb-4 mb-6 scrollbar-hide pt-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? theme === "dark" 
                      ? "bg-[#D4AF37] text-[#0a192f] font-bold" 
                      : "bg-black text-white font-bold"
                    : theme === "dark"
                      ? "bg-[#112240] text-gray-400 hover:bg-[#1d3557]"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Listings Grid */}
        <AnimatePresence mode="popLayout">
          {activeTab === "home" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  onClick={() => setSelectedProperty(property)}
                />
              ))}
            </div>
          )}
          
          {activeTab === "saved" && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-[#ccd6f6]" : "text-gray-900"}`}>
                Saved Homes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedHomes.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    onClick={() => setSelectedProperty(property)}
                  />
                ))}
            </div>
            {savedHomes.length === 0 && (
              <div className="text-center py-20">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-[#112240]" : "bg-gray-100"
                }`}>
                  <span className="text-4xl">❤️</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  No saved homes yet
                </h3>
                <p className="text-gray-500">Start exploring to find your dream home!</p>
              </div>
            )}
            </motion.div>
          )}

           {activeTab === "profile" && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className={`p-8 rounded-3xl ${theme === "dark" ? "bg-[#112240]" : "bg-white"}`}
            >
              <div className="text-center mb-8">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img src="/profile-pic.jpeg" alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-[#D4AF37]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white border-4 border-white dark:border-[#112240]">
                    ✎
                  </div>
                </div>
                <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Somto A. Mbah
                </h2>
                <p className="text-[#D4AF37] font-medium">Premium Member</p>
              </div>

              <div className="space-y-4">
                {["Account Settings", "Payment Methods", "Notifications", "Help Center"].map((item) => (
                  <button key={item} className={`w-full flex justify-between items-center p-4 rounded-xl transition-colors ${
                    theme === "dark" ? "hover:bg-[#0a192f] text-gray-300" : "hover:bg-gray-50 text-gray-600"
                  }`}>
                    <span>{item}</span>
                    <svg className="w-5 h-5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedProperty && (
          <DetailView 
            property={selectedProperty} 
            onClose={() => setSelectedProperty(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        <FilterModal 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)} 
          onApply={(price, types) => setFilters({ price, types })}
        />
      </AnimatePresence>


      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
