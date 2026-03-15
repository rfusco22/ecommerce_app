import React, { useState } from 'react';
import { Home as HomeIcon, Search, ShoppingBag, User, Menu, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, CATEGORIES, Product } from './data';
import { ProductCard } from './components/ProductCard';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCartCount(prev => prev + 1);
    // Add logic for real cart later
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center">
            <Menu className="text-white" size={20} />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium">Welcome back,</p>
            <h1 className="text-sm font-bold text-white">Alex Rivera</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative glass p-2 rounded-xl">
            <Bell size={20} className="text-text-primary" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent-rose rounded-full border-2 border-bg-primary"></span>
          </div>
        </div>
      </header>

      <main className="px-6 py-8">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Search premium tech..."
            className="w-full glass py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 ring-brand-primary/50 text-white placeholder-text-muted transition-all"
          />
        </div>

        {/* Hero Section */}
        <div className="premium-card relative p-8 mb-10 overflow-hidden bg-brand-gradient">
           <div className="relative z-10 w-2/3">
              <h2 className="text-2xl font-bold text-white mb-2 leading-tight">Future of Audio is Here.</h2>
              <p className="text-white/80 text-sm mb-4">Experience Aura Pods Pro with advanced spatial audio tech.</p>
              <button className="bg-white text-brand-primary px-6 py-2 rounded-xl font-bold text-sm">Shop Now</button>
           </div>
           {/* Abstract Circle decoration */}
           <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Categories</h3>
            <span className="text-xs text-brand-secondary font-bold">See All</span>
          </div>
          <div className="flex gap-3 overflow-x-auto scroll-hide pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                    : 'glass text-text-secondary hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div>
           <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">New Arrivals</h3>
            <span className="text-xs text-text-muted font-medium">Showing {filteredProducts.length} items</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 z-50 glass py-4 px-8 rounded-3xl flex items-center justify-between shadow-2xl">
        <NavItem 
          icon={<HomeIcon size={24} />} 
          label="Home" 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
        />
        <NavItem 
          icon={<Search size={24} />} 
          label="Explore" 
          active={activeTab === 'search'} 
          onClick={() => setActiveTab('search')} 
        />
        <div className="relative -top-10">
           <button className="w-16 h-16 rounded-full bg-brand-gradient border-8 border-bg-primary flex items-center justify-center shadow-xl shadow-brand-primary/30 active:scale-90 transition-transform">
              <ShoppingBag size={28} className="text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-gold text-bg-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-bg-primary">
                  {cartCount}
                </span>
              )}
           </button>
        </div>
        <NavItem 
          icon={<ShoppingBag size={24} />} 
          label="Orders" 
          active={activeTab === 'cart'} 
          onClick={() => setActiveTab('cart')} 
        />
        <NavItem 
          icon={<User size={24} />} 
          label="Profile" 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')} 
        />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`nav-item transition-all ${active ? 'active scale-110' : 'opacity-60'}`}
    >
      {icon}
      {active && <span className="w-1 h-1 rounded-full bg-brand-primary mt-1"></span>}
    </button>
  );
}
