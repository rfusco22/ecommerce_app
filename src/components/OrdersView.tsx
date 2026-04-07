import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, ChevronRight } from 'lucide-react';

const MOCK_ORDERS = [
  {
    id: 'ORD-9921',
    date: '15 Mar 2024',
    deliveryDate: 'Llega el martes, 24 de marzo', // Estilo Amazon
    status: 'En camino',
    items: 'Aura Pods Pro',
    total: 249,
    icon: <Truck size={20} className="text-indigo-400" />
  },
  {
    id: 'ORD-8812',
    date: '10 Mar 2024',
    deliveryDate: 'Entregado el 12 de marzo',
    status: 'Entregado',
    items: 'Vantage Watch S8',
    total: 399,
    icon: <CheckCircle size={20} className="text-emerald-400" />
  }
];

export function OrdersView({ onSelectOrder }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="orders-container"
    >
      <div className="orders-header">
        <h2 className="section-title-premium">Mis Pedidos</h2>
        <p className="section-subtitle">Gestiona tus compras recientes</p>
      </div>

      <div className="orders-list">
        {MOCK_ORDERS.map((order, index) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="order-card-glass"
            onClick={() => onSelectOrder(order)} // Esto permite hacer click en toda la tarjeta
          >
            <div className="order-card-header">
              <div className="order-status-tag">
                {order.icon}
                <span>{order.status}</span>
              </div>
              <span className="order-id">{order.id}</span>
            </div>

            <div className="order-details">
              <h4>{order.items}</h4>
              {/* TEXTO ESTILO AMAZON */}
              <p className="amazon-delivery-text">
                {order.deliveryDate}
              </p>
            </div>

            <div className="order-footer">
              <div className="order-price">
                <span className="price-value">${order.total}</span>
              </div>
              {/* CORRECCIÓN: El botón ahora dispara la función */}
              <button 
                className="view-details-btn" 
                onClick={(e) => {
                  e.stopPropagation(); // Evita que se dispare el click de la tarjeta dos veces
                  onSelectOrder(order);
                }}
              >
                Detalles <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}