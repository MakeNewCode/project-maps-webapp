
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MapComponent from '@/components/MapComponent';
import MapboxTokenInput from '@/components/MapboxTokenInput';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft } from 'lucide-react';
import { Order } from '@/components/OrderCard';

// Mock orders data - same as Index page
const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    origen: "Buenos Aires",
    destino: "Córdoba",
    km: "700.50",
    comision: "50.00",
    precio: "1500.00",
    forma_pago: "Transferencia",
    descripcion_carga: "Electrodomésticos varios",
    fecha_creacion: "2025-05-16T14:23:45Z"
  },
  {
    id: 2,
    origen: "Rosario",
    destino: "Mendoza",
    km: "850.75",
    comision: "60.00",
    precio: "2000.00",
    forma_pago: "Contado",
    descripcion_carga: "Material de construcción",
    fecha_creacion: "2025-05-15T10:12:30Z"
  },
  {
    id: 3,
    origen: "La Plata",
    destino: "Mar del Plata",
    km: "350.25",
    comision: "40.00",
    precio: "1200.00",
    forma_pago: "Tarjeta",
    descripcion_carga: "Productos alimenticios",
    fecha_creacion: "2025-05-14T08:45:15Z"
  },
  {
    id: 4,
    origen: "Bahía Blanca",
    destino: "Neuquén",
    km: "550.80",
    comision: "55.00",
    precio: "1800.00",
    forma_pago: "Transferencia",
    descripcion_carga: "Maquinaria industrial",
    fecha_creacion: "2025-05-13T16:30:20Z"
  }
];

const RouteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Get mapbox token from localStorage
    const savedToken = localStorage.getItem('mapboxToken');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
    
    // Find the order by ID
    if (id) {
      const foundOrder = MOCK_ORDERS.find(o => o.id === parseInt(id));
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [id]);
  
  const handleMapboxTokenSubmit = (token: string) => {
    setMapboxToken(token);
    localStorage.setItem('mapboxToken', token);
  };
  
  // Format the date
  const formattedDate = order ? new Date(order.fecha_creacion).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : '';

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Orden no encontrada</h2>
          <Button onClick={() => navigate('/')}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Button 
        variant="ghost" 
        className="mb-4 flex items-center gap-2"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={18} />
        <span>Volver al listado</span>
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map column */}
        <div className="lg:col-span-2">
          <Card className="h-[500px] mb-6">
            <CardContent className="p-0 h-full">
              {!mapboxToken && (
                <div className="p-6">
                  <MapboxTokenInput onSubmit={handleMapboxTokenSubmit} />
                </div>
              )}
              {mapboxToken && (
                <MapComponent
                  orders={[order]}
                  selectedOrder={order}
                  mapboxToken={mapboxToken}
                  showRoute={true}
                />
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Details column */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Detalles de la Carga</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  Activa
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-500">ID DE ORDEN</h3>
                <p className="font-medium">#{order.id}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">ORIGEN</h3>
                <p className="font-medium">{order.origen}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">DESTINO</h3>
                <p className="font-medium">{order.destino}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">DISTANCIA</h3>
                <p className="font-medium">{order.km} km</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">PRECIO</h3>
                <p className="font-medium">${order.precio}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">COMISIÓN</h3>
                <p className="font-medium">${order.comision}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">FORMA DE PAGO</h3>
                <p className="font-medium">{order.forma_pago}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">DESCRIPCIÓN DE CARGA</h3>
                <p className="font-medium">{order.descripcion_carga}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">FECHA DE CREACIÓN</h3>
                <p className="font-medium">{formattedDate}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;
