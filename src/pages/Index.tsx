
import React, { useState, useEffect } from 'react';
import AppSidebar from '@/components/AppSidebar';
import OrderCard, { Order } from '@/components/OrderCard';
import OrderFilters, { FilterType } from '@/components/OrderFilters';
import MapComponent from '@/components/MapComponent';
import OrderDetails from '@/components/OrderDetails';
import MapboxTokenInput from '@/components/MapboxTokenInput';
import { useIsMobile } from '@/hooks/use-mobile';

const MOCK_ORDERS: Order[] = [
  {
    id: '#AD345Jk758',
    status: 'In Transit',
    progress: 60,
    steps: [
      { date: '21 Jan', status: 'Checking', time: '10:23 AM' },
      { date: '25 Jan', status: 'In Transit', time: '12:02 PM' },
      { date: '25 Jan', status: 'Delivered', time: '--:--' },
    ],
  },
  {
    id: '#FR156KL89K',
    status: 'Checking',
    progress: 20,
    steps: [
      { date: '22 Jan', status: 'Checking', time: '11:28 AM' },
      { date: '26 Jan', status: 'In Transit', time: '--:--' },
      { date: '30 Jan', status: 'Delivered', time: '--:--' },
    ],
  },
  {
    id: '#LN236NB89R',
    status: 'Checking',
    progress: 15,
    steps: [
      { date: '23 Jan', status: 'Checking', time: '09:28 AM' },
      { date: '27 Jan', status: 'In Transit', time: '--:--' },
      { date: '1 Feb', status: 'Delivered', time: '--:--' },
    ],
  },
  {
    id: '#CT789MP45Q',
    status: 'Delivered',
    progress: 100,
    steps: [
      { date: '18 Jan', status: 'Checking', time: '08:15 AM' },
      { date: '19 Jan', status: 'In Transit', time: '10:45 AM' },
      { date: '22 Jan', status: 'Delivered', time: '14:30 PM' },
    ],
  },
];

const Index: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(MOCK_ORDERS);
  const [filters, setFilters] = useState<FilterType>({
    dateRange: '21 Jan - 1 Feb',
    status: ['Checking', 'In Transit'],
  });
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('mapboxToken');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...MOCK_ORDERS];
    
    if (searchQuery) {
      result = result.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filters.status && filters.status.length > 0) {
      result = result.filter(order => 
        filters.status?.includes(order.status)
      );
    }
    
    // Mark the selected order in the filtered list
    result = result.map(order => ({
      ...order,
      active: selectedOrder?.id === order.id
    }));
    
    setFilteredOrders(result);
  }, [filters, searchQuery, selectedOrder]);

  const handleOrderClick = (orderId: string) => {
    const order = MOCK_ORDERS.find(o => o.id === orderId) || null;
    setSelectedOrder(order);
    if (isMobile) {
      setShowDetails(true);
    }
  };

  const handleMapboxTokenSubmit = (token: string) => {
    setMapboxToken(token);
    localStorage.setItem('mapboxToken', token);
  };

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AppSidebar collapsed={sidebarCollapsed || isMobile} onToggle={toggleSidebar} />
      
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Orders List - Left column */}
        {(!isMobile || !showDetails) && (
          <div className="w-full md:w-[400px] p-4 overflow-y-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Seguimiento de Entregas</h1>
              <p className="text-gray-500">Monitorea y gestiona tus envíos</p>
            </div>
            
            <OrderFilters 
              filters={filters} 
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
            />
            
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order}
                  onOrderClick={handleOrderClick}
                />
              ))}
              
              {filteredOrders.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">No se encontraron órdenes</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Map and Details - Right column */}
        {(!isMobile || showDetails) && (
          <div className="flex-1 p-4 flex flex-col overflow-y-auto">
            {isMobile && (
              <button 
                className="mb-4 text-blue-600 flex items-center"
                onClick={() => setShowDetails(false)}
              >
                ← Volver a la lista
              </button>
            )}
            
            {!mapboxToken && (
              <MapboxTokenInput onSubmit={handleMapboxTokenSubmit} />
            )}
            
            <div className="h-[400px] mb-4">
              <MapComponent selectedOrder={selectedOrder} mapboxToken={mapboxToken} />
            </div>
            
            <OrderDetails order={selectedOrder} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
