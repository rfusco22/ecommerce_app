import { motion } from 'framer-motion';
import { ShoppingBag, Zap, FireExtinguisher } from 'lucide-react';
import { PRODUCTS } from '../data';

export function Offer({ onAddToCart }: any) {
  // Solo mostramos algunos productos para la demo de ofertas
  const offerProducts = PRODUCTS.slice(0, 4); 

  // Variantes para animaciones en cascada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="offer-page-v4"
    >
      {/* Header Premium (Sin botón de atrás, ya que tenemos el Nav) */}
      <div className="main-header-premium glass">
        <div className="header-left-content">
          <div className="brand-avatar-premium" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f43f5e 100%)' }}>
            <FireExtinguisher size={20} color="black" />
          </div>
          <div className="header-titles">
            <span className="label-top-premium" style={{ color: '#fbbf24' }}>HOT DEALS</span>
            <h1 className="title-main-premium">Flash Sales</h1>
          </div>
        </div>
      </div>

      <div className="main-content-offers">
        {/* Banner de urgencia flash */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flash-sale-banner glass"
        >
          <Zap size={30} className="zap-icon" />
          <div className="flash-info">
            <h3>Ending Soon!</h3>
            <p>Don't miss out on these exclusive tech discounts.</p>
          </div>
        </motion.div>

        {/* Grid Espectacular de Ofertas */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="product-grid-sexy"
        >
          {offerProducts.map((p) => (
            <motion.div 
              key={p.id} 
              variants={itemVariants} 
              className="premium-card glass sexy-card"
            >
              <div className="sexy-card-image-wrapper">
                <img src={p.image} alt={p.name} />
                <div className="discount-badge">-{((1 - (p.price / (p.price * 1.3))) * 100).toFixed(0)}%</div>
              </div>
              <div className="sexy-card-info">
                <h3>{p.name}</h3>
                <p>{p.category}</p>
                <div className="sexy-price-row">
                  <div className="prices">
                    <span className="sexy-old-price">${(p.price * 1.3).toFixed(2)}</span>
                    <span className="sexy-new-price">${p.price}</span>
                  </div>
                  <motion.button 
                    whileTap={{ scale: 0.9 }} 
                    onClick={() => onAddToCart(p)} 
                    className="add-to-cart-sexy"
                  >
                    <ShoppingBag size={18} color="white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}