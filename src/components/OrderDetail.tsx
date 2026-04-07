import { motion } from 'framer-motion';
import { ChevronLeft, MapPin, Package, Truck, CheckCircle, Smartphone } from 'lucide-react';

export function OrderDetail({ order, onBack }: any) {
  // Lógica dinámica para los pasos
  const steps = [
    { label: 'Confirmado', icon: <Package size={18} />, key: 'Confirmado' },
    { label: 'En preparación', icon: <Smartphone size={18} />, key: 'En preparación' },
    { label: 'En camino', icon: <Truck size={18} />, key: 'En camino' },
    { label: 'Entregado', icon: <CheckCircle size={18} />, key: 'Entregado' },
  ];

  // Buscamos el índice del estado actual para el stepper
  const currentStatusIndex = steps.findIndex(s => s.key === order.status);

  return (
    <motion.div 
      initial={{ x: '100%' }} 
      animate={{ x: 0 }} 
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="order-detail-page"
    >
      {/* Header Fijo */}
      <div className="detail-nav-premium">
        <button onClick={onBack} className="icon-btn-blur">
          <ChevronLeft color="white" />
        </button>
        <div className="nav-title-group">
          <span className="nav-subtitle">Detalle del Pedido</span>
          <h3 className="nav-title-main">{order.id}</h3>
        </div>
        <div style={{ width: 44 }}></div>
      </div>

      <div className="detail-scroll-area">
        {/* --- MAPA --- */}
        <div className="order-map-container">
          <div className="apple-map-mock">
            {order.status === 'Entregado' ? (
              <div className="map-delivered-view">
                <CheckCircle size={40} color="#2e7d32" />
                <span>Entregado en destino</span>
              </div>
            ) : (
              <div className="map-placeholder">
                <div className="delivery-pulse"></div>
                <MapPin className="pin-main" size={30} color="#6366f1" fill="#6366f1" />
                <span className="map-label">El repartidor está a 5 min</span>
              </div>
            )}
          </div>
        </div>

        {/* --- STEPPER CON ANIMACIÓN DE DIBUJADO --- */}
        <div className="stepper-container glass">
        {steps.map((step, i) => {
            const isCompleted = i <= currentStatusIndex;
            const isActive = i === currentStatusIndex;
            
            return (
            <div key={i} className={`step-item ${isCompleted ? 'done' : ''} ${isActive ? 'active' : ''}`}>
                <div className="step-line-wrapper">
                {/* Círculo del Icono con un pequeño pop al aparecer */}
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="step-icon-circle"
                >
                    {step.icon}
                </motion.div>

                {/* LA LÍNEA QUE SE DIBUJA */}
                {i !== steps.length - 1 && (
                    <div className="step-line-container">
                    {/* Línea de fondo (Gris) */}
                    <div className="step-line-bg" />
                    {/* Línea de progreso (Morada con animación) */}
                    <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: i < currentStatusIndex ? "100%" : "0%" }}
                        transition={{ 
                        duration: 0.8, 
                        delay: (i * 0.3) + 0.2, // Empieza después de que el icono aparezca
                        ease: "easeInOut" 
                        }}
                        className="step-line-progress"
                    />
                    </div>
                )}
                </div>
                <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="step-label"
                >
                {step.label}
                </motion.span>
            </div>
            );
        })}
        </div>

        {/* --- RESUMEN DE PRODUCTOS --- */}
        <div className="detail-section">
          <h4 className="section-label-mini">Productos</h4>
          <div className="order-item-row glass">
            <img src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=200" alt="product" />
            <div className="item-txt">
              <h5>{order.items}</h5>
              <p>1 unidad • Espacial Grey</p>
            </div>
            <span className="item-price">${order.total}</span>
          </div>
        </div>

        {/* --- DIRECCIÓN DE ENTREGA --- */}
        <div className="detail-section">
          <h4 className="section-label-mini">Dirección de Entrega</h4>
          <div className="address-card-premium glass">
            <div className="address-icon-bg">
              <MapPin size={22} color="#6366f1" />
            </div>
            <div className="address-info-v3">
              <p className="address-main">Urb. El Tulipán, San Diego</p>
              <p className="address-sub">Casa #42 • Carabobo, Venezuela</p>
              <span className="address-tag">Residencial</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}