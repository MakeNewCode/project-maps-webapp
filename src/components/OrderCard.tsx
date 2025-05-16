
import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export type OrderStatus = 'Active' | 'Completed' | 'Cancelled';

export type Order = {
  id: number;
  origen: string;
  destino: string;
  km: string;
  comision: string;
  precio: string;
  forma_pago: string;
  descripcion_carga: string;
  fecha_creacion: string;
  status?: OrderStatus;
  active?: boolean;
};

interface OrderCardProps {
  order: Order;
  onOrderClick: (id: number) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onOrderClick }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    onOrderClick(order.id);
    navigate(`/route/${order.id}`);
  };

  // Format the date
  const formattedDate = new Date(order.fecha_creacion).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div 
      className={cn(
        "p-4 bg-white rounded-xl mb-4 cursor-pointer transition-all hover:shadow-md",
        order.active ? "ring-2 ring-blue-500" : ""
      )}
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm font-medium mb-1">Orden ID:</div>
          <div className="font-semibold">#{order.id}</div>
        </div>
        
        <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Activa
        </div>
      </div>
      
      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full rounded-full bg-blue-600"
          style={{ width: '60%' }}
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="text-sm text-gray-600">Origen:</div>
          <div className="text-sm font-medium">{order.origen}</div>
        </div>
        
        <div className="flex justify-between">
          <div className="text-sm text-gray-600">Destino:</div>
          <div className="text-sm font-medium">{order.destino}</div>
        </div>
        
        <div className="flex justify-between">
          <div className="text-sm text-gray-600">Fecha:</div>
          <div className="text-sm font-medium">{formattedDate}</div>
        </div>
        
        <div className="flex justify-between">
          <div className="text-sm text-gray-600">Precio:</div>
          <div className="text-sm font-medium">${order.precio}</div>
        </div>
      </div>
      
      <Button variant="ghost" size="icon" className="absolute top-3 right-2">
        <MoreVertical size={20} className="text-gray-500" />
      </Button>
    </div>
  );
};

export default OrderCard;
