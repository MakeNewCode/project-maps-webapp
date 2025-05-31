import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppNavbar from '@/components/AppNavbar';
import MapComponent from '@/components/MapComponent';
import MapboxTokenInput from '@/components/MapboxTokenInput';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft, MapPin, Calendar, DollarSign, Truck, CreditCard } from 'lucide-react';
import { Order } from '@/components/OrderCard';
import { Badge } from "@/components/ui/badge";

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
      <div className="min-h-screen bg-gray-100">
        <AppNavbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Orden no encontrada</h2>
            <Button onClick={() => navigate('/')}>Volver al inicio</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AppNavbar />
      
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
          
          {/* Details column - Updated with new style */}
          <div className="lg:col-span-1">
            <Card className="shadow-md border-0">
              <CardHeader className="pb-0">
                <CardTitle className="text-xl font-bold">
                  Detalles de la Carga
                  <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                    Activa
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mt-6">
                  <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MapPin className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs text-gray-500">UBICACIÓN</h3>
                      <p className="font-medium">
                        {order.origen} → {order.destino}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-xl p-4 flex items-center gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <Truck className="text-yellow-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs text-gray-500">DESCRIPCIÓN</h3>
                      <p className="font-medium">
                        {order.descripcion_carga}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <DollarSign className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs text-gray-500">PRECIO</h3>
                      <p className="font-medium">${order.precio}</p>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <DollarSign className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs text-gray-500">COMISIÓN</h3>
                      <p className="font-medium">${order.comision}</p>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 rounded-xl p-4 flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <CreditCard className="text-red-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs text-gray-500">FORMA DE PAGO</h3>
                      <p className="font-medium">{order.forma_pago}</p>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-xl p-4 flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <Calendar className="text-orange-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs text-gray-500">FECHA DE CREACIÓN</h3>
                      <p className="font-medium">{formattedDate}</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <MapPin className="text-slate-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs text-gray-500">DISTANCIA</h3>
                      <p className="font-medium">{order.km} km</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="w-full">
                    Ver más detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;
