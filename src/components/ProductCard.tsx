import { Share2, ShoppingCart } from 'lucide-react';
import { Product } from '../data';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 glass p-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
          <Share2 size={18} className="text-white" />
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-brand-secondary uppercase tracking-wider mb-1">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-white mb-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold font-display text-white">
            ${product.price}
          </span>
          <button 
            onClick={() => onAddToCart(product)}
            className="glass p-3 rounded-xl hover:bg-white/10 active:scale-90 transition-all text-brand-primary"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
