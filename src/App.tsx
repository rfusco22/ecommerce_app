import React, { useState, useMemo } from 'react';
import { 
  Home, 
  Search, // Usaremos este nombre en todo el archivo
  ShoppingBag, 
  User, 
  Bell, 
  Menu, 
  X, 
  Settings, 
  CreditCard, 
  Package, 
  ChevronRight, 
  LogOut 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, CATEGORIES } from './data';
import { ProductCard } from './components/ProductCard';
import type { Product } from "./data";
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCat === 'All' || p.category === selectedCat;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCat, searchQuery]);

  // 1. Añade este estado
  const [isAdding, setIsAdding] = useState(false);

  // 2. Modifica tu función addToCart
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setIsAdding(true);
    // Efecto de rebote sutil en el botón central mediante el estado
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="app-container">
      
      {/* Header Premium */}
      <header className="main-header-premium glass">
        <div className="header-left-content">
          <motion.div whileTap={{ scale: 0.9 }} className="brand-avatar"><span>RF</span></motion.div>
          <div className="header-titles">
            <span className="label-top">FuscoDev</span>
            <h1 className="title-main">Premium Store</h1>
          </div>
        </div>
        <motion.div whileTap={{ scale: 0.9 }} className="icon-glass-btn">
          <Bell size={20} />
          <span className="dot-indicator"></span>
        </motion.div>
      </header>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              
              {/* Banner Destacado / Promo */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass"
                style={{ 
                  padding: '24px', 
                  borderRadius: '28px', 
                  background: 'var(--brand-gradient)',
                  marginBottom: '25px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>20% OFF</h2>
                  <p style={{ fontSize: '14px', opacity: 0.9, maxWidth: '60%' }}>In your first purchase with the code FUSCO22</p>
                </div>
                {/* Círculo decorativo de fondo */}
                <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
              </motion.div>

              {/* Search */}
              <div className="search-container">
                <div className="search-input-wrapper">
                  <Search size={18} className="icon-muted" />
                  <input 
                    type="text" 
                    placeholder="What are you looking for?" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="categories-scroll scroll-hide">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCat(cat)}
                    className={`category-pill ${selectedCat === cat ? 'active' : 'glass'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <motion.div layout className="product-grid">
                <AnimatePresence mode='popLayout'>
                  {filteredProducts.map((p, i) => (
                    <motion.div key={p.id} layout initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.03 }}>
                      <ProductCard product={p} onAddToCart={addToCart} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'profile' && <ProfileView key="profile" />}
        </AnimatePresence>
      </main>

      {/* Navegación Premium Compacta - CORREGIDO: Estructura interna */}
      <nav className="bottom-nav-compact glass">
        <div className="nav-items-container">
          <NavBtn icon={<Home size={22} />} active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavBtn icon={<Search size={22} />} active={activeTab === 'search'} onClick={() => setActiveTab('search')} />
          
          <div className="cart-wrapper-compact">
            <motion.button 
              animate={isAdding ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
              whileTap={{ scale: 0.85 }} 
              onClick={() => setIsCartOpen(true)}
              className="cart-btn-minimal"
            >
              <ShoppingBag size={22} />
              {cart.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="cart-badge-minimal"
                >
                  {cart.length}
                </motion.span>
              )}
            </motion.button>
          </div>

          <NavBtn icon={<Package size={22} />} active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <NavBtn icon={<User size={22} />} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </div>
      </nav>

      {/* MODAL DE CARRITO (CHECKOUT) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="modal-overlay"
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="glass checkout-drawer"
            >
              <div className="drawer-handle" />
              <div className="drawer-header">
                <h2 className="font-display">Your Cart</h2>
                <X onClick={() => setIsCartOpen(false)} size={20} />
              </div>
              
              <div className="drawer-content scroll-hide">
                {cart.length === 0 ? <p className="empty-msg">Tu carrito está vacío</p> : 
                  cart.map((item, idx) => (
                    <div key={idx} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>${item.price}</p>
                      </div>
                    </div>
                  ))
                }
              </div>

              <div className="drawer-footer">
                <div className="total-row">
                  <span>Total Amount</span>
                  <span className="total-price">${cart.reduce((acc, curr) => acc + curr.price, 0)}</span>
                </div>
                <button className="btn-primary checkout-btn">Checkout Now</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavBtn({ icon, active, onClick }: any) {
  return (
    <button onClick={onClick} className="nav-item-btn">
      <motion.div 
        animate={{ 
          color: active ? 'var(--brand-primary)' : 'var(--text-muted)', 
          y: active ? -4 : 0, // Sube un poco el icono si está activo
          scale: active ? 1.15 : 1 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {icon}
      </motion.div>
      {active && (
        <motion.div 
          layoutId="navdot" 
          className="nav-active-dot" 
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
        />
      )}
    </button>
  );
}

function ProfileView() {
  const options = [
    { icon: <Package size={20} />, label: "Orders", color: "#6366f1" },
    { icon: <CreditCard size={20} />, label: "Payments", color: "#fbbf24" },
    { icon: <Settings size={20} />, label: "Settings", color: "#94a3b8" },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="profile-header">
        <div className="avatar-wrapper"><User size={40} /></div>
        <h2 className="user-name-large">Riccardo Fusco</h2>
        <p className="user-email">developer@fusco.com</p>
      </div>
      <div className="glass profile-menu">
        {options.map(opt => (
          <div key={opt.label} className="menu-item">
            <div className="menu-item-content"><div className="menu-icon" style={{ backgroundColor: `${opt.color}20`, color: opt.color }}>{opt.icon}</div><span>{opt.label}</span></div>
            <ChevronRight size={18} className="icon-muted" />
          </div>
        ))}
      </div>
      <button className="logout-btn glass"><LogOut size={20} /> Sign Out</button>
    </motion.div>
  );
}