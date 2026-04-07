import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Lock, MapPin, Store, CreditCard, 
  Smartphone, Truck, Box, Info, Navigation 
} from 'lucide-react';
import { useState } from 'react';
import { DeliveryForm } from './DeliveryForm';
import { PickupForm } from './PickupForm';

export function Checkout({ cart, onBack, onComplete }: any) {
  const [method, setMethod] = useState('delivery'); // 'delivery' | 'pickup'
  const [deliveryType, setDeliveryType] = useState('express'); // 'express' | 'free'
  const [selectedProvider, setSelectedProvider] = useState('ivoo_moto');
  const [selectedStore, setSelectedStore] = useState(null); // Empezamos en null para forzar selección

  const total = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  const shippingCost = method === 'delivery' ? (deliveryType === 'express' ? 5.00 : 0) : 0;

  return (
    <motion.div 
      initial={{ x: '100%' }} 
      animate={{ x: 0 }} 
      exit={{ x: '100%' }} 
      className="checkout-page"
    >
      <div className="checkout-content">
        
        <header className="checkout-header-v3">
          <button onClick={onBack} className="back-btn-v3"><ChevronLeft size={24} /></button>
          <h2 className="font-display">Checkout</h2>
          <div style={{ width: 44 }} />
        </header>

        <div className="checkout-scroll-area scroll-hide">
          
          {/* SELECTOR PRINCIPAL: DELIVERY / PICKUP */}
          <div className="main-method-tabs glass">
            <button 
              className={method === 'delivery' ? 'active' : ''} 
              onClick={() => setMethod('delivery')}
            >
              <MapPin size={18} /> Delivery
            </button>
            <button 
              className={method === 'pickup' ? 'active' : ''} 
              onClick={() => setMethod('pickup')}
            >
              <Store size={18} /> Pickup
            </button>
          </div>

          {/* LÓGICA CORREGIDA AQUÍ */}
          <AnimatePresence mode="wait">
            {method === 'delivery' ? (
              <motion.div
                key="delivery-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <DeliveryForm 
                  deliveryType={deliveryType} 
                  setDeliveryType={setDeliveryType}
                  selectedProvider={selectedProvider}
                  setSelectedProvider={setSelectedProvider}
                />
              </motion.div>
            ) : (
              <motion.div
                key="pickup-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <PickupForm 
                  selectedStore={selectedStore} 
                  setSelectedStore={setSelectedStore} 
                />
              </motion.div>
            )}
          </AnimatePresence>

          <h3 className="section-label-v3">Resumen</h3>
          <div className="order-summary-v3 glass">
            <div className="summary-line"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="summary-line"><span>Envío</span><span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}</span></div>
            <div className="summary-line total"><span>Total</span><span>${(total + shippingCost).toFixed(2)}</span></div>
          </div>
        </div>

        <footer className="checkout-footer-v3">
          <button 
            className="confirm-btn-v3" 
            onClick={onComplete}
            disabled={method === 'pickup' && !selectedStore} // Bloquea si no hay tienda en pickup
          >
            <Lock size={18} />
            Confirmar y Pagar
          </button>
        </footer>
      </div>
    </motion.div>
  );
}