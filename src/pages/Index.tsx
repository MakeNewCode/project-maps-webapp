import React, { useState, useEffect } from 'react';
import AppSidebar from '@/components/AppSidebar';
import OrderCard, { Order } from '@/components/OrderCard';
import OrderFilters, { FilterType } from '@/components/OrderFilters';
import MapComponent from '@/components/MapComponent';
import OrderDetails from '@/components/OrderDetails';
import MapboxTokenInput from '@/components/MapboxTokenInput';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3; // Número de órdenes por página
  
  // Calculate paginated orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

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
    setCurrentPage(1); // Reset to first page when filters change
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              {currentOrders.map((order) => (
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

            {/* Pagination Component */}
            {filteredOrders.length > 0 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                      // Logic to show around current page
                      let pageNumber;
                      if (totalPages <= 5) {
                        // Show all page numbers if total pages is 5 or less
                        pageNumber = index + 1;
                      } else if (currentPage <= 3) {
                        // For pages 1-3, show pages 1-5
                        pageNumber = index + 1;
                      } else if (currentPage >= totalPages - 2) {
                        // For the last 3 pages, show the last 5 pages
                        pageNumber = totalPages - 4 + index;
                      } else {
                        // Otherwise show 2 pages before and after current page
                        pageNumber = currentPage - 2 + index;
                      }
                      
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            isActive={pageNumber === currentPage}
                            onClick={() => handlePageChange(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
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
