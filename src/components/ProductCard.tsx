import React from 'react';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// Recibimos wishlist y onToggleWishlist como props
export function ProductCard({ product, onAddToCart, onClick, wishlist, onToggleWishlist }: any) {
  
  // Verificamos si este producto está en nuestra lista de favoritos global
  const isFavorite = wishlist?.includes(product.id);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="product-card-premium glass"
    >
      {/* Contenedor de Imagen */}
      <div className="card-image-container">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
        <div className="card-overlay-gradient" />
        
        {/* BOTÓN DE FAVORITO CORREGIDO */}
        <motion.button 
          whileTap={{ scale: 0.8 }}
          className="wishlist-btn glass" 
          onClick={(e) => {
            e.stopPropagation(); // IMPORTANTE: Evita que se abra el detalle
            onToggleWishlist(product.id);
          }}
        >
          <Heart 
            size={16} 
            /* Si es favorito: Rojo y Relleno. Si no: Blanco y sin relleno */
            color={isFavorite ? "#ff3b30" : "#fff"} 
            fill={isFavorite ? "#ff3b30" : "none"} 
            style={{ transition: 'all 0.3s ease' }}
          />
        </motion.button>

        <div className="rating-badge glass">
          <Star size={10} fill="var(--accent-gold)" color="var(--accent-gold)" />
          <span>4.8</span>
        </div>
      </div>
      
      {/* Contenido de Texto */}
      <div className="card-info">
        <div className="info-header">
          <p className="product-cat-label">{product.category}</p>
          <h3 className="product-name-label">{product.name}</h3>
        </div>

        <div className="card-footer-price">
          <div className="price-tag">
            <span className="currency">$</span>
            <span className="amount">{product.price}</span>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="add-to-cart-vibrant"
          >
            <ShoppingBag size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}