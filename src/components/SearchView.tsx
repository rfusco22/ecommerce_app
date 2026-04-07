import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Zap, ChevronRight, ShoppingBag } from 'lucide-react';
import { ProductCard } from './ProductCard';

const TRENDS = [
  { id: 1, term: 'iPhone 15 Pro Max', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=500' },
  { id: 2, term: 'MacBook Air M3', img: 'https://images.unsplash.com/photo-1517336712461-481bf488d587?q=80&w=500' },
  { id: 3, term: 'Aura Pods Elite', img: 'https://images.unsplash.com/photo-1588423770574-91993ca06f17?q=80&w=500' },
  { id: 4, term: 'Vantage Watch', img: 'https://images.unsplash.com/photo-1544117518-2b461f58ad05?q=80&w=500' },
];

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'phones', label: 'Teléfonos' },
  { id: 'audio', label: 'Audio' },
  { id: 'wearables', label: 'Wearables' },
  { id: 'computing', label: 'Computación' },
];

export function SearchView({ products, onAddToCart, onProductClick, wishlist, onToggleWishlist }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter((p: any) => {
      const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, products, selectedCategory]);

  const hasSearched = searchQuery.trim().length > 0;

  return (
    <div className="search-view-container">
      <div className="orders-container">
        <div className="orders-header">
          <h1 className="orders-title">Búsqueda</h1>
          <p className="orders-subtitle">Encuentra lo último en tecnología premium</p>
        </div>
        
        <div className="search-bar-integrated">
          <Search size={20} className="icon-search-muted" />
          <input 
            type="text" 
            placeholder="¿Qué estás buscando?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* --- MOVEMOS EL CONTENIDO DENTRO DEL CONTENEDOR PARA MANTENER EL MARGEN --- */}
        <div className="search-dynamic-content">
          <AnimatePresence mode="wait">
            {!hasSearched ? (
              <motion.div 
                key="initial" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
              >
                {/* EXPLORAR: Ahora alineado */}
                <h4 className="search-label-mini">Explorar</h4>
                <div className="category-pills-row scroller-x hide-scroll">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat.id} 
                      className={`cat-pill-premium ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* TENDENCIAS */}
                <h4 className="search-label-mini">Tendencias</h4>
                <div className="suggested-searches-grid">
                  {TRENDS.map((item, i) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="suggested-item-artistic"
                      onClick={() => setSearchQuery(item.term)}
                    >
                      <img src={item.img} className="bg-artistic-blur" alt="blur" />
                      <div className="artistic-overlay" />
                      <div className="icon-box-purple">
                        <Zap size={16} fill="currentColor" />
                      </div>
                      <span>{item.term}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="results" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
              >
                <div className="results-info-row">
                  <span>{filteredProducts.length} productos encontrados</span>
                </div>
                
                {/* Grid de resultados */}
                <div className="product-grid" style={{ paddingBottom: '150px' }}>
                  {filteredProducts.map((p: any) => (
                    <ProductCard 
                      key={p.id} 
                      product={p} 
                      onClick={() => onProductClick(p)} 
                      onAddToCart={onAddToCart}
                      wishlist={wishlist}
                      onToggleWishlist={onToggleWishlist}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}