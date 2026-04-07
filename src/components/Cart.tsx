import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, Heart, ChevronLeft } from 'lucide-react';

export function Cart({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, wishlist, products, onAddToCart, onToggleWishlist, onCheckout }: any) {
  
  // ESTADO INTERNO DEL MODAL: 'cart' o 'wishlist'
  const [currentView, setCurrentView] = useState('cart');

  const cartTotal = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  // Filtramos los productos favoritos de la lista global
  const wishlistProducts = products.filter((p: any) => wishlist.includes(p.id));

  // Animaciones para las tarjetas
  const cardVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20, scale: 0.9 }
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="modal-overlay" />
      
      <motion.div 
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} 
        transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
        className="glass checkout-drawer"
        style={{ background: '#0f0f12', borderTop: '1px solid rgba(255,255,255,0.1)', height: '80vh' }}
      >
        <div className="drawer-handle" onClick={onClose} />
        
        {/* --- HEADER --- */}
        <div className="drawer-header" style={{ justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
          <div className="drawer-header-left" style={{ display: 'flex', gap: '10px' }}>
            {currentView === 'wishlist' ? (
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCurrentView('cart')} className="close-drawer-btn-v2" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <ChevronLeft size={20} />
              </motion.button>
            ) : (
              <motion.button 
                whileTap={{ scale: 0.9 }} 
                onClick={() => setCurrentView('wishlist')} 
                className="close-drawer-btn-v2"
                style={{ 
                  background: 'rgba(255,255,255,0.1)',
                  color: wishlist.length > 0 ? '#ff3b30' : 'rgba(255,255,255,0.5)',
                }}
              >
                <Heart size={20} fill={wishlist.length > 0 ? '#ff3b30' : 'none'} />
              </motion.button>
            )}
          </div>

          <h2 className="font-display" style={{ fontSize: '20px', margin: 0, textAlign: 'center' }}>
            {currentView === 'cart' ? 'Mi Carrito' : 'Mis Favoritos'}
          </h2>

          <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="close-drawer-btn-v2">
            <X size={20} />
          </motion.button>
        </div>

        {/* --- CONTENIDO --- */}
        <div className="drawer-content scroll-hide" style={{ padding: '20px 0' }}>
          <AnimatePresence mode="wait">
            
            {/* --- VISTA CARRITO --- */}
            {currentView === 'cart' && (
              <motion.div key="cart-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {cart.length === 0 ? (
                  /* --- ESTADO VACÍO: CARRITO --- */
                  <div className="empty-state-v4">
                    <ShoppingBag size={70} strokeWidth={1} />
                    <p>Tu carrito está vacío</p>
                  </div>
                ) : (
                  cart.map((item: any) => (
                    <motion.div layout key={item.id} {...cardVariants} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p className="item-price">${item.price}</p>
                        <div className="qty-controls">
                           <button onClick={() => onUpdateQuantity(item.id, -1)}><Minus size={14}/></button>
                           <span>{item.quantity}</span>
                           <button onClick={() => onUpdateQuantity(item.id, 1)}><Plus size={14}/></button>
                        </div>
                      </div>
                      <motion.button whileTap={{ scale: 0.8 }} className="remove-btn" onClick={() => onRemoveItem(item.id)}><Trash2 size={18} /></motion.button>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            {/* --- VISTA FAVORITOS --- */}
            {currentView === 'wishlist' && (
              <motion.div key="wishlist-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {wishlistProducts.length === 0 ? (
                  /* --- ESTADO VACÍO: FAVORITOS --- */
                  <div className="empty-state-v4">
                    <Heart size={70} strokeWidth={1} />
                    <p>Aún no tienes favoritos</p>
                  </div>
                ) : (
                  wishlistProducts.map((p: any) => (
                    <motion.div layout key={p.id} {...cardVariants} className="cart-item">
                      <img src={p.image} alt={p.name} />
                      <div className="item-info">
                        <h4>{p.name}</h4>
                        <p className="item-price">${p.price}</p>
                        <button 
                          onClick={() => {
                            onAddToCart(p);
                            onToggleWishlist(p.id);
                          }} 
                          className="btn-primary" 
                          style={{ padding: '8px 12px', borderRadius: '10px', fontSize: '12px', width: 'fit-content', marginTop: '5px' }}
                        >
                          Añadir al Carrito
                        </button>
                      </div>
                      <motion.button 
                        whileTap={{ scale: 0.8 }}
                        className="remove-btn" 
                        onClick={() => onToggleWishlist(p.id)}
                        style={{ background: 'rgba(255, 59, 48, 0.1)', color: '#ff3b30' }}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* --- FOOTER --- */}
        <AnimatePresence>
          {currentView === 'cart' && cart.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="drawer-footer" style={{ marginTop: 'auto', padding: '20px' }}>
              <div className="total-row">
                <span>Total a pagar</span>
                <span className="total-price-v2">${cartTotal.toFixed(2)}</span>
              </div>
              <button className="btn-primary checkout-btn" onClick={onCheckout} style={{ width: '100%', padding: '18px', borderRadius: '20px', fontWeight: 'bold' }}>
                Proceder al Pago
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}