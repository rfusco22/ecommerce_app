import { motion } from 'framer-motion';
import { X, Bell, Zap, Gift, Info } from 'lucide-react';

export function NotificationsModal({ onClose }: any) {
  const notifications = [
    { id: 1, title: '¡Oferta Flash!', desc: '20% de descuento en periféricos solo por hoy.', icon: <Zap size={18} color="#fbbf24" />, time: 'Ahora' },
    { id: 2, title: 'Cupón Disponible', desc: 'Usa el código FUSCO22 en tu próxima compra.', icon: <Gift size={18} color="#a855f7" />, time: '2h' },
    { id: 3, title: 'Pedido Actualizado', desc: 'Tu orden ORD-9921 ya está en camino.', icon: <Info size={18} color="#6366f1" />, time: '5h' },
  ];

  return (
    <>
      {/* OVERLAY: Esto oscurece el fondo para que no se distraiga la vista */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="modal-overlay-black"
      />

      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="notifications-drawer"
      >
        <div className="drawer-handle"></div>
        <div className="drawer-header">
          <h3 className="nav-title-main">Notificaciones</h3>
          <button onClick={onClose} className="close-drawer-btn-v2">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {notifications.map((notif) => (
            <div key={notif.id} className="notification-item-card glass">
              <div className="notif-icon-bg">
                {notif.icon}
              </div>
              <div className="notif-info">
                <div className="notif-top">
                  <h4>{notif.title}</h4>
                  <span className="notif-time">{notif.time}</span>
                </div>
                <p>{notif.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}