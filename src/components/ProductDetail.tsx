import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Heart, Star, ShoppingBag, 
  Truck, ShieldCheck, Scale, Maximize2, Zap, Info 
} from 'lucide-react';

// AÑADIMOS wishlist y onToggleWishlist a las props
export function ProductDetail({ product, onClose, onAddToCart, wishlist, onToggleWishlist }: any) {
  if (!product) return null;

  // Verificamos si este producto es favorito
  const isFavorite = wishlist?.includes(product.id);

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 220 }}
      className="product-detail-page"
    >
      {/* Header con Blur */}
      <div className="detail-nav glass">
        <button onClick={onClose} className="icon-btn-blur"><ChevronLeft /></button>
        <span className="nav-title">Details</span>
        
        {/* BOTÓN DE FAVORITO CORREGIDO */}
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={() => onToggleWishlist(product.id)} // Ejecuta la función global
          className="icon-btn-blur"
        >
          <Heart 
            size={20} 
            color={isFavorite ? "#ff3b30" : "#fff"} 
            fill={isFavorite ? "#ff3b30" : "none"} 
            style={{ transition: 'all 0.3s ease' }}
          />
        </motion.button>
      </div>

      <div className="detail-scroll-content scroll-hide">
        {/* ... resto del contenido igual ... */}
        <div className="detail-image-hero">
          <img src={product.image} alt={product.name} />
          <div className="hero-gradient-bottom" />
        </div>

        <div className="detail-body">
          <div className="category-row">
            <span className="pill-cat">{product.category}</span>
            <div className="rating-pill">
              <Star size={14} fill="var(--accent-gold)" color="transparent" />
              <span>4.9</span>
            </div>
          </div>

          <h1 className="product-title-large">{product.name}</h1>
          <p className="product-desc-long">
            {product.description || "The pinnacle of design and performance. This product sets a new standard for luxury tech, blending artisan craftsmanship with state-of-the-art engineering."}
          </p>

          <div className="specs-section">
            <h3 className="section-label"><Info size={16} /> Specifications</h3>
            <div className="specs-grid">
              <div className="spec-card glass">
                <Scale size={20} className="spec-icon" />
                <div className="spec-texts">
                  <span className="spec-val">180g</span>
                  <span className="spec-key">Weight</span>
                </div>
              </div>
              <div className="spec-card glass">
                <Maximize2 size={20} className="spec-icon" />
                <div className="spec-texts">
                  <span className="spec-val">14x7x1 cm</span>
                  <span className="spec-key">Dimensions</span>
                </div>
              </div>
              <div className="spec-card glass">
                <Zap size={20} className="spec-icon" />
                <div className="spec-texts">
                  <span className="spec-val">Ultrafast</span>
                  <span className="spec-key">Speed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="trust-badges">
            <div className="trust-item"><Truck size={18} /> Free Global Shipping</div>
            <div className="trust-item"><ShieldCheck size={18} /> 2-Year Official Warranty</div>
          </div>
        </div>
      </div>

      <div className="detail-footer glass">
        <div className="footer-price-info">
          <span className="price-label">Price</span>
          <h3 className="price-val">${product.price}</h3>
        </div>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => { onAddToCart(product); onClose(); }}
          className="btn-add-bag"
        >
          <ShoppingBag size={20} />
          Add to Bag
        </motion.button>
      </div>
    </motion.div>
  );
}