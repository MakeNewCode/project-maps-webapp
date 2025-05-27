import { useState } from 'react';
import { toast } from 'sonner';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';
import OrderCard from '@/components/OrderCard';
import MapComponent from '@/components/MapComponent';
import OrderFilters from '@/components/OrderFilters';

interface Order {
  id: string;
  cliente: string;
  fecha: string;
  estado: 'pendiente' | 'en_transito' | 'entregado';
  direccion: string;
  valor: number;
  prioridad: 'alta' | 'media' | 'baja';
  paquetes: number;
  peso: number;
  conductor?: string;
  telefono?: string;
  notas?: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    cliente: "Juan Pérez",
    fecha: "2024-03-15",
    estado: "pendiente",
    direccion: "Av. Libertador 1234, CABA",
    valor: 25000,
    prioridad: "alta",
    paquetes: 3,
    peso: 5.5,
    telefono: "+54 11 1234-5678",
    notas: "Entregar en horario de oficina"
  },
  {
    id: "ORD-002",
    cliente: "María García",
    fecha: "2024-03-16",
    estado: "en_transito",
    direccion: "Calle Corrientes 456, CABA",
    valor: 18000,
    prioridad: "media",
    paquetes: 1,
    peso: 2.2,
    conductor: "Carlos López",
    telefono: "+54 11 4321-8765",
    notas: "Coordinar entrega con el cliente"
  },
  {
    id: "ORD-003",
    cliente: "Ricardo Gómez",
    fecha: "2024-03-17",
    estado: "entregado",
    direccion: "Av. 9 de Julio 789, CABA",
    valor: 32000,
    prioridad: "baja",
    paquetes: 5,
    peso: 8.0,
    conductor: "Laura Torres",
    telefono: "+54 11 9876-5432",
    notas: "Entregado sin inconvenientes"
  },
  {
    id: "ORD-004",
    cliente: "Laura Martínez",
    fecha: "2024-03-18",
    estado: "pendiente",
    direccion: "Calle Florida 1011, CABA",
    valor: 12000,
    prioridad: "media",
    paquetes: 2,
    peso: 3.1,
    telefono: "+54 11 2468-1357",
    notas: "Confirmar dirección antes de la entrega"
  },
  {
    id: "ORD-005",
    cliente: "Carlos Rodríguez",
    fecha: "2024-03-19",
    estado: "en_transito",
    direccion: "Av. Santa Fe 2222, CABA",
    valor: 45000,
    prioridad: "alta",
    paquetes: 4,
    peso: 6.7,
    conductor: "Ana Fernández",
    telefono: "+54 11 8642-0975",
    notas: "Entrega urgente"
  }
];

const Index = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);

  const handleFilterChange = (filters: any) => {
    let filtered = orders;
    
    if (filters.estado) {
      filtered = filtered.filter(order => order.estado === filters.estado);
    }
    
    if (filters.prioridad) {
      filtered = filtered.filter(order => order.prioridad === filters.prioridad);
    }
    
    if (filters.cliente) {
      filtered = filtered.filter(order => 
        order.cliente.toLowerCase().includes(filters.cliente.toLowerCase())
      );
    }
    
    setFilteredOrders(filtered);
  };

  const handleOrderUpdate = (orderId: string, newStatus: Order['estado']) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, estado: newStatus } : order
    );
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    toast.success(`Orden ${orderId} actualizada a ${newStatus}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col h-full">
            <header className="flex items-center gap-2 px-4 py-2 border-b">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Dashboard de Entregas</h1>
            </header>
            
            <div className="flex-1 p-6">
              <div className="mb-6">
                <OrderFilters onFilterChange={handleFilterChange} />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-800">Órdenes Pendientes</h2>
                  <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                    {filteredOrders.map((order) => (
                      <OrderCard 
                        key={order.id} 
                        order={order} 
                        onStatusUpdate={handleOrderUpdate}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-800">Mapa de Entregas</h2>
                  <div className="h-[calc(100vh-300px)] rounded-lg overflow-hidden">
                    <MapComponent orders={filteredOrders} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
