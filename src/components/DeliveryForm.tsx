import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Building } from 'lucide-react';

// DECLARACIÓN PARA TYPESCRIPT (Evita errores con la API de Google global)
declare global {
  interface Window {
    google: any;
  }
}

export function DeliveryForm({ selectedStore, setSelectedStore }: any) {
  // Datos de ejemplo para el origen (select)
  const STORES = [
    { id: 1, name: 'Tienda 1 - Valencia', address: 'Av. Bolívar Norte', lat: 10.2167, lng: -68.0000 },
    { id: 2, name: 'Tienda 2 - Sambil', address: 'C.C. Sambil Valencia', lat: 10.2461, lng: -68.0012 },
    { id: 3, name: 'Tienda 3 - Naguanagua', address: 'Naguanagua City', lat: 10.2833, lng: -68.0167 },
  ];

  const [destinationAddress, setDestinationAddress] = useState('');
  const autocompleteInputRef = useRef<HTMLInputElement>(null);

  // EFECTO PARA INICIALIZAR GOOGLE AUTOCOMPLETE
  useEffect(() => {
    // Verificamos que la API de Google esté cargada
    if (window.google && autocompleteInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, {
        types: ['address'], // Solo sugerir direcciones
        componentRestrictions: { country: 've' }, // Restringir a Venezuela
      });

      // Escuchar cuando el usuario selecciona una dirección
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          setDestinationAddress(place.formatted_address);
          console.log('Destino seleccionado:', place.formatted_address);
          console.log('Coordenadas Destino:', place.geometry.location.lat(), place.geometry.location.lng());
          // Aquí podrías guardar las coordenadas en un estado superior si lo necesitas
        }
      });
    }
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="method-container-v3">
      
      {/* SECCIÓN ORIGEN (SELECT) */}
      <div className="input-group-v3 glass">
        <label className="input-label-v3"><Building size={16} color="var(--brand-primary)"/> Origen (Sucursal)</label>
        <select 
          className="premium-select-v3"
          value={selectedStore?.id || ''}
          onChange={(e) => {
            const store = STORES.find(s => s.id === parseInt(e.target.value));
            setSelectedStore(store);
          }}
        >
          <option value="" disabled>Selecciona una tienda cercana...</option>
          {STORES.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>
      </div>

      {/* SECCIÓN DESTINO (GOOGLE AUTOCOMPLETE) */}
      <div className="input-group-v3 glass">
        <label className="input-label-v3"><MapPin size={16} color="#EF4444"/> Destino (Tu dirección)</label>
        <div className="autocomplete-wrapper">
          <input 
            ref={autocompleteInputRef}
            type="text"
            className="premium-input-v3"
            placeholder="Escribe tu dirección exacta..."
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
          />
          {destinationAddress && <MapPin size={18} className="input-icon-end" />}
        </div>
      </div>

      {/* MOCKUP DE APPLE MAPS (Visual) */}
      <div className="apple-map-container-v3 glass">
        <div className="map-blur-overlay-v3">
          <div className="apple-pin-v3">
            <div className="pin-pulse-v3" />
            <MapPin size={32} fill="var(--brand-primary)" color="white" />
          </div>
          <span className="map-label-v3">Apple Maps</span>
          {destinationAddress && <span className="map-sub-label-v3">Calculando ruta...</span>}
        </div>
      </div>

    </motion.div>
  );
}