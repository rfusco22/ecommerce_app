import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, ShoppingBag, User, Bell, Package, 
  Search as SearchIcon, Settings, LogOut, CreditCard 
} from 'lucide-react';

// Componentes
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { ProductDetail } from './components/ProductDetail';
import { Offer } from './components/Offer';
import { OrdersView } from './components/OrdersView';
import { OrderDetail } from './components/OrderDetail';
import { NotificationsModal } from './components/NotificationsModal';
import { SearchView } from './components/SearchView'; // Importar

// Datos
import { PRODUCTS } from './data';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };
  
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);


  // --- BLOQUEO DE SCROLL PARA MODALES Y DETALLES ---
  useEffect(() => {
    // Añadimos isNotificationsOpen a la condición
    if (isCartOpen || selectedProduct || selectedOrder || isNotificationsOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }
  }, [isCartOpen, selectedProduct, selectedOrder, isNotificationsOpen]); // <--- No olvides añadirla aquí también


  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // --- LÓGICA DEL TOAST ---
    setShowAddedToast(true);
    
    // Se apaga solo tras 2 segundos
    setTimeout(() => {
      setShowAddedToast(false);
    }, 2000);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [showAddedToast, setShowAddedToast] = useState(false);

  // Estado para guardar solo los IDs de los productos favoritos
  const [wishlist, setWishlist] = useState<string[]>([]); 

  // Función para alternar favorito (añadir/quitar)
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="app-container">
      
      {/* --- HEADER (Se oculta en Checkout, Ofertas y Detalle de Orden) --- */}
      {activeTab === 'home' && !selectedOrder && !selectedProduct && (
        <header className="main-header-premium">
          <div className="header-left-content">
            <div className="brand-avatar-premium"><span>RF</span></div>
            <div className="header-titles">
              <span className="label-top-premium">FUSCODEV</span>
              <h1 className="title-main-premium">Premium Store</h1>
            </div>
          </div>
          <motion.div 
            whileTap={{ scale: 0.9 }} 
            // ANIMACIÓN DE SACUDIDA (SHAKE)
            animate={isNotificationsOpen ? {
              rotate: [0, -20, 20, -20, 20, 0],
              transition: { duration: 0.5 }
            } : {}}
            className="icon-glass-btn"
            onClick={() => setIsNotificationsOpen(true)}
          >
            <Bell size={22} color="white" />
            <span className="dot-indicator-vibrant"></span>
          </motion.div>
        </header>
      )}

      {/* --- ÁREA DE CONTENIDO PRINCIPAL --- */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          
          {activeTab === 'home' && (
            <HomeView 
              products={PRODUCTS} 
              onAddToCart={addToCart} 
              onProductClick={setSelectedProduct} 
              onGoToOffer={() => setActiveTab('offer')}
              wishlist={wishlist} 
              onToggleWishlist={toggleWishlist} 
            />
          )}

          {/* NUEVA VISTA DE BÚSQUEDA */}
          {activeTab === 'search' && (
            <div style={{ marginTop: '0px' }}> {/* Aseguramos margen 0 aquí también */}
              <SearchView
              key="search"
              products={PRODUCTS} 
              onAddToCart={addToCart} 
              onProductClick={setSelectedProduct} 
              /* ESTO ES LO QUE FALTA AÑADIR */
              wishlist={wishlist} 
              onToggleWishlist={toggleWishlist} 
            />
            </div>
          )}

          {activeTab === 'offer' && (
            <Offer 
              key="offer" 
              onBack={() => setActiveTab('home')} 
              onAddToCart={addToCart} 
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView 
              key="orders" 
              onSelectOrder={(order: any) => setSelectedOrder(order)} 
            />
          )}

          {activeTab === 'profile' && <ProfileView key="profile" />}

          {activeTab === 'checkout' && (
            <Checkout 
              key="checkout" 
              cart={cart} 
              onBack={() => setActiveTab('home')} 
              onComplete={() => {setCart([]); setActiveTab('home');}} 
            />
          )}

        </AnimatePresence>
      </main>

      {/* --- NAVEGACIÓN INFERIOR (Solo si no hay modales/detalles abiertos) --- */}
      {activeTab !== 'checkout' && !selectedOrder && (
        <nav className="bottom-nav-compact">
          <NavBtn icon={<Home size={22} />} active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavBtn icon={<Search size={22} />} active={activeTab === 'search'} onClick={() => setActiveTab('search')} />
          
          <div className="floating-cart-anchor">
            <button className="cart-btn-minimal" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={24} strokeWidth={2} />
              
              {/* BADGE ANIMADO ESTILO APPLE */}
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount} // El cambio de número dispara la animación
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="cart-badge-premium"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          <NavBtn icon={<Package size={22} />} active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <NavBtn icon={<User size={22} />} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          <AnimatePresence>
            {showAddedToast && (
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 20, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="toast-added"
              >
                <ShoppingBag size={16} /> ¡Añadido al carrito!
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      )}

      {/* --- CAPAS SUPERIORES (Z-INDEX ALTO) --- */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetail 
            order={selectedOrder} 
            onBack={() => setSelectedOrder(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <div className="modal-wrapper-high">
            <Cart 
              isOpen={isCartOpen} 
              onClose={() => setIsCartOpen(false)} 
              cart={cart}
              onUpdateQuantity={updateQuantity} // Asegúrate que aquí diga 'onUpdateQuantity'
              onRemoveItem={removeFromCart}     // Asegúrate que aquí diga 'onRemoveItem'
              onCheckout={() => { setIsCartOpen(false); setActiveTab('checkout'); }}
              wishlist={wishlist} // <--- NUEVA PROP: Pasamos los IDs favoritos
              products={PRODUCTS} // <--- NUEVA PROP: Necesitamos todos los productos para filtrar
              onAddToCart={addToCart} // <--- NUEVA PROP: Para mover de Favoritos a Carrito
              onToggleWishlist={toggleWishlist} // <--- NUEVA PROP: Para quitar de Favoritos
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={addToCart}
            /* ESTO ES LO QUE FALTA */
            wishlist={wishlist} 
            onToggleWishlist={toggleWishlist} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNotificationsOpen && (
          <div className="modal-wrapper-high">
            <NotificationsModal 
              isOpen={isNotificationsOpen} 
              onClose={() => setIsNotificationsOpen(false)} 
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTE: VISTA HOME ---
function HomeView({ products, onAddToCart, onProductClick, onGoToOffer, wishlist, onToggleWishlist }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => 
    products.filter((p: any) => p.name.toLowerCase().includes(searchQuery.toLowerCase())), 
    [searchQuery, products]
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* BANNER PROMOCIONAL */}
      <motion.div 
        whileTap={{ scale: 0.96 }}
        onClick={onGoToOffer} 
        className="banner-promo-image-wrapper"
      >
        <img 
          src="https://images.unsplash.com/photo-1616410011236-7a42121dd981?q=80&w=2000" 
          alt="Offer Banner"
          className="banner-image"
        />
        <div className="banner-overlay">
          <div className="promo-tag">LIMITED TIME</div>
          <h2>Special Tech Deals</h2>
          <p>Tap to discover <span>20% OFF</span></p>
        </div>
      </motion.div>

      {/* BUSCADOR */}
      <div className="search-container">
        <div className="glass-search">
          <SearchIcon size={18} className="icon-search-muted" />
          <input 
            type="text" 
            placeholder="Search premium tech..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* GRID DE PRODUCTOS CORREGIDO */}
      <div className="product-grid">
        {filteredProducts.map((p: any) => (
          <ProductCard 
            key={p.id}
            product={p} 
            onClick={() => onProductClick(p)}
            onAddToCart={onAddToCart} 
            /* AHORA SÍ PASAMOS LAS PROPS */
            wishlist={wishlist} 
            onToggleWishlist={onToggleWishlist} 
          />
        ))}
      </div>
    </motion.div>
  );
}

// --- SUB-COMPONENTE: VISTA PERFIL ---
function ProfileView() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="profile-container-v3">
      <div className="profile-header-premium">
        <div className="avatar-large-glow">RF</div>
        <h2>Riccardo Fusco</h2>
        <p className="profile-sub">riccardofusco@ivoo.com</p>
      </div>
      <div className="profile-menu-glass">
        <ProfileMenuItem icon={<User size={20}/>} label="Información Personal" />
        <ProfileMenuItem icon={<CreditCard size={20}/>} label="Métodos de Pago" />
        <ProfileMenuItem icon={<Settings size={20}/>} label="Configuración" />
        <ProfileMenuItem icon={<LogOut size={20}/>} label="Cerrar Sesión" isLast />
      </div>
    </motion.div>
  );
}

function ProfileMenuItem({ icon, label, isLast }: any) {
  return (
    <div className={`menu-item-v3 ${isLast ? 'last' : ''}`}>
      <div className="menu-item-left">
        <span className="menu-icon-v3">{icon}</span>
        <span>{label}</span>
      </div>
    </div>
  );
}

// --- COMPONENTE AUXILIAR: BOTÓN NAV ---
function NavBtn({ icon, active, onClick }: any) {
  return (
    <button onClick={onClick} className="nav-item-btn">
      <AnimatePresence>
        {active && (
          <motion.div 
            layoutId="activeBackground" 
            className="nav-active-glass-bg" 
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </AnimatePresence>
      <div className="nav-icon-wrapper">
        <motion.div 
          animate={{ 
            color: active ? '#fff' : 'rgba(255,255,255,0.4)', 
            scale: active ? 1.15 : 1 
          }}
        >
          {icon}
        </motion.div>
      </div>
    </button>
  );
}