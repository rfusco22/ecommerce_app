import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, MapPin, Building, Info } from 'lucide-react';
import { GoogleMap } from '@capacitor/google-maps';

interface StoreType {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

const STORES: StoreType[] = [
  { id: 1, name: 'Tienda 1 - Valencia', address: 'Av. Bolívar Norte, Valencia', lat: 10.2167, lng: -68.0000 },
  { id: 2, name: 'Tienda 2 - Sambil', address: 'C.C. Sambil Valencia, Naguanagua', lat: 10.2461, lng: -68.0012 },
  { id: 3, name: 'Tienda 3 - Naguanagua', address: 'Av. Universidad, Naguanagua', lat: 10.2833, lng: -68.0167 },
];

export function PickupForm({ selectedStore, setSelectedStore }: any) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<GoogleMap | null>(null);

  // EFECTO PARA CREAR/ACTUALIZAR EL MAPA
  useEffect(() => {
    if (selectedStore) {
      initMap();
    }

    // Cleanup al desmontar el componente
    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
      }
    };
  }, [selectedStore]);

  const initMap = async () => {
    if (!mapRef.current || !selectedStore) return;

    // Si ya hay un mapa, lo destruimos para crear el nuevo foco
    if (mapInstance.current) {
      await mapInstance.current.destroy();
    }

    mapInstance.current = await GoogleMap.create({
        id: 'apple-map-pickup', // Asegúrate de que este ID sea único
        element: mapRef.current!, // El ref debe estar bien asignado al div
        apiKey: '', 
        config: {
            center: { lat: selectedStore.lat, lng: selectedStore.lng },
            zoom: 15,
        },
    });

    await mapInstance.current.addMarker({
      coordinate: { lat: selectedStore.lat, lng: selectedStore.lng },
      title: selectedStore.name,
      snippet: selectedStore.address
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="method-container-v3"
    >
      {/* SELECTOR DE SUCURSAL */}
      <div className="input-group-v3 glass">
        <label className="input-label-v3">
          <Building size={16} color="var(--brand-primary)"/> Sucursal para retiro
        </label>
        <select 
          className="premium-select-v3"
          value={selectedStore?.id || ''}
          onChange={(e) => {
            const store = STORES.find(s => s.id === parseInt(e.target.value));
            setSelectedStore(store);
          }}
        >
          <option value="" disabled>Selecciona una tienda...</option>
          {STORES.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>
      </div>

      {/* DETALLE VISUAL DE TIENDA */}
      <AnimatePresence mode="wait">
        {selectedStore && (
          <motion.div 
            key={selectedStore.id}
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 10 }}
            className="store-detail-card-v3 glass"
          >
            <div className="store-icon-bg">
              <Store size={22} color="var(--accent-gold)" />
            </div>
            <div className="store-text">
              <strong>{selectedStore.name}</strong>
              <p>{selectedStore.address}</p>
              <div className="coords-badge">
                <span>LAT: {selectedStore.lat.toFixed(4)}</span>
                <span className="separator">•</span>
                <span>LNG: {selectedStore.lng.toFixed(4)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAPA NATIVO DE APPLE */}
      <div className="apple-map-wrapper">
        <div 
          ref={mapRef} 
          className="native-apple-map"
        >
          {!selectedStore && (
            <div className="map-placeholder-ui">
              <MapPin size={32} color="rgba(255,255,255,0.2)" />
              <p>Selecciona una tienda para ver el mapa</p>
            </div>
          )}
        </div>
        
        {/* Overlay sutil para indicar que es Apple Maps */}
        <div className="map-type-badge">
          <Info size={12} />
          <span>Apple Maps Nativo</span>
        </div>
      </div>

    </motion.div>
  );
}