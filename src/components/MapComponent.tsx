
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Order } from './OrderCard';

interface MapComponentProps {
  orders: Order[];
  selectedOrder?: Order | null;
  mapboxToken: string;
  showRoute?: boolean;
}

// Argentina bounds
const ARGENTINA_BOUNDS: [[number, number], [number, number]] = [
  [-73.5605, -55.0576], // Southwest coordinates
  [-53.6372, -21.7812]  // Northeast coordinates
];

// Function to get coordinates from city names
const getCityCoordinates = (cityName: string): [number, number] => {
  // This is a mock function - in a real app you would use geocoding API
  const cityCoordinates: Record<string, [number, number]> = {
    'Buenos Aires': [-58.3816, -34.6037],
    'Córdoba': [-64.1888, -31.4201],
    'Rosario': [-60.6505, -32.9442],
    'Mendoza': [-68.8272, -32.8908],
    'Mar del Plata': [-57.5426, -38.0174],
    'La Plata': [-57.9535, -34.9214],
    'Neuquén': [-68.0591, -38.9516],
    'Bahía Blanca': [-62.2724, -38.7196]
  };
  
  return cityCoordinates[cityName] || [-63.6167, -38.4161]; // Default to center of Argentina
};

const MapComponent: React.FC<MapComponentProps> = ({ orders, selectedOrder, mapboxToken, showRoute = false }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;
    
    mapboxgl.accessToken = mapboxToken;
    
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      bounds: ARGENTINA_BOUNDS,
      fitBoundsOptions: { padding: 50 }
    });
    
    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    newMap.on('load', () => {
      setMapLoaded(true);
    });
    
    map.current = newMap;
    
    return () => {
      // Clear markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      newMap.remove();
    };
  }, [mapboxToken]);

  // Add markers for all orders
  useEffect(() => {
    if (!mapLoaded || !map.current || orders.length === 0) return;

    // Clear previous markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Create a bounds object to fit all markers
    const bounds = new mapboxgl.LngLatBounds();

    orders.forEach(order => {
      // Add origin marker
      const originCoords = getCityCoordinates(order.origen);
      const marker = new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat(originCoords)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div>
            <h3 class="font-bold">Origen: ${order.origen}</h3>
            <p>Destino: ${order.destino}</p>
            <p>ID: #${order.id}</p>
          </div>`
        ))
        .addTo(map.current);
        
      markersRef.current.push(marker);
      bounds.extend(new mapboxgl.LngLat(originCoords[0], originCoords[1]));
      
      // Add destination marker if showing a single order route
      if (showRoute && selectedOrder && selectedOrder.id === order.id) {
        const destCoords = getCityCoordinates(order.destino);
        const destMarker = new mapboxgl.Marker({ color: '#ef4444' })
          .setLngLat(destCoords)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div>
              <h3 class="font-bold">Destino: ${order.destino}</h3>
              <p>Origen: ${order.origen}</p>
              <p>ID: #${order.id}</p>
            </div>`
          ))
          .addTo(map.current);
          
        markersRef.current.push(destMarker);
        bounds.extend(new mapboxgl.LngLat(destCoords[0], destCoords[1]));
        
        // Add route line
        const routeCoords = {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [originCoords, destCoords]
          }
        };
        
        if (map.current.getSource('route')) {
          (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData(routeCoords);
        } else {
          map.current.addSource('route', {
            'type': 'geojson',
            'data': routeCoords
          });
          
          map.current.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#3b82f6',
              'line-width': 4,
              'line-dasharray': [0, 2]
            }
          });
        }
      }
    });

    // Only fit bounds if we have markers
    if (!bounds.isEmpty()) {
      map.current.fitBounds(bounds, {
        padding: 70
      });
    }
  }, [orders, selectedOrder, mapLoaded, showRoute]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      
      {!mapboxToken && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90">
          <div className="text-center p-4">
            <p className="text-lg font-semibold mb-2">Se requiere token de Mapbox</p>
            <p className="text-sm text-gray-500">
              Por favor ingresa tu token público de Mapbox para ver el mapa.
            </p>
          </div>
        </div>
      )}
      
      {selectedOrder && showRoute && (
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between mb-2">
            <div className="text-sm font-medium">Información de la ruta</div>
            <div className="text-sm text-blue-600">Distancia: {selectedOrder.km} km</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Origen</div>
              <div className="font-medium">{selectedOrder.origen}</div>
            </div>
            <div>
              <div className="text-gray-500">Destino</div>
              <div className="font-medium">{selectedOrder.destino}</div>
            </div>
            <div>
              <div className="text-gray-500">Precio</div>
              <div className="font-medium">${selectedOrder.precio}</div>
            </div>
            <div>
              <div className="text-gray-500">Comisión</div>
              <div className="font-medium">${selectedOrder.comision}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
