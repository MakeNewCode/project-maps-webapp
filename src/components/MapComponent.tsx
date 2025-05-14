
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Order } from './OrderCard';

interface MapComponentProps {
  selectedOrder: Order | null;
  mapboxToken: string;
}

// Argentina bounds
const ARGENTINA_BOUNDS: [[number, number], [number, number]] = [
  [-73.5605, -55.0576], // Southwest coordinates
  [-53.6372, -21.7812]  // Northeast coordinates
];

const MapComponent: React.FC<MapComponentProps> = ({ selectedOrder, mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

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
      newMap.remove();
    };
  }, [mapboxToken]);

  // Add mock route when a delivery is selected
  useEffect(() => {
    if (!mapLoaded || !map.current || !selectedOrder) return;

    // Clear previous markers
    const markers = document.getElementsByClassName('mapboxgl-marker');
    while(markers[0]) {
      markers[0].remove();
    }

    if (selectedOrder.status === 'In Transit') {
      // Mock data for Argentina - explicitly typed as [number, number] tuples
      const startPoint: [number, number] = [-58.3816, -34.6037]; // Buenos Aires
      const endPoint: [number, number] = [-57.5426, -38.0174]; // Mar del Plata
      
      // Create a mock route with proper GeoJSON format and explicit LineString type
      const route: GeoJSON.Feature<GeoJSON.LineString> = {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': [
            startPoint,
            [-58.2, -35.0] as [number, number],
            [-57.8, -36.5] as [number, number],
            [-57.9, -37.5] as [number, number],
            endPoint
          ]
        }
      };
      
      // Add start marker
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat(startPoint)
        .addTo(map.current);
        
      // Add delivery marker  
      new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat(endPoint)
        .addTo(map.current);
        
      // Current location marker (somewhere along the route)
      const currentPoint: [number, number] = [-57.9, -37.5];
      new mapboxgl.Marker({ color: '#10b981' })
        .setLngLat(currentPoint)
        .addTo(map.current);
      
      // Add route line if it doesn't exist
      if (!map.current.getSource('route')) {
        map.current.addSource('route', {
          'type': 'geojson',
          'data': route
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
      } else {
        // Update the route
        (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData(route);
      }
      
      // Fit bounds to the route - now we know for sure we're working with LineString coordinates
      const bounds = new mapboxgl.LngLatBounds();
      route.geometry.coordinates.forEach((coord) => {
        // Fix: Use the LngLat constructor to properly convert the coordinates
        bounds.extend(new mapboxgl.LngLat(coord[0], coord[1]));
      });
      
      map.current.fitBounds(bounds, {
        padding: 50
      });
    }
  }, [selectedOrder, mapLoaded]);

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
      
      {selectedOrder && selectedOrder.status === 'In Transit' && (
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between mb-2">
            <div className="text-sm font-medium">Información de entrega</div>
            <div className="text-sm text-blue-600">En tiempo</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Distancia</div>
              <div className="font-medium">375 km</div>
            </div>
            <div>
              <div className="text-gray-500">Tiempo restante</div>
              <div className="font-medium">3h 45m</div>
            </div>
            <div>
              <div className="text-gray-500">Velocidad</div>
              <div className="font-medium">85 km/h</div>
            </div>
            <div>
              <div className="text-gray-500">Llegada estimada</div>
              <div className="font-medium">14:30</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
