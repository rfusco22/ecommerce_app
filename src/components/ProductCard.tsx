import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProductCard({ product, onAddToCart }: any) {
  return (
    <motion.div 
      className="premium-card glass"
      whileTap={{ scale: 0.97 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '24px', overflow: 'hidden' }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
        <img 
          src={product.image} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <button className="glass" style={{ position: 'absolute', top: '12px', right: '12px', border: 'none', borderRadius: '50%', padding: '8px' }}>
          <Heart size={16} color="white" />
        </button>
      </div>
      
      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 className="font-display" style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>{product.name}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{product.category}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <span style={{ fontWeight: 'bold', color: 'var(--accent-gold)' }}>${product.price}</span>
          <motion.button 
            whileTap={{ scale: 0.8 }}
            onClick={() => onAddToCart(product)}
            className="btn-brand" 
            style={{ width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ShoppingBag size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}