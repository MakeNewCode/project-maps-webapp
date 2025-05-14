
import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type OrderStatus = 'Checking' | 'In Transit' | 'Delivered';

export type OrderStep = {
  date: string;
  status: OrderStatus;
  time: string;
};

export type Order = {
  id: string;
  status: OrderStatus;
  progress: number;
  steps: OrderStep[];
  active?: boolean;
};

interface OrderCardProps {
  order: Order;
  onOrderClick: (id: string) => void;
}

const statusColors: Record<OrderStatus, string> = {
  'Checking': 'bg-yellow-500',
  'In Transit': 'bg-blue-600',
  'Delivered': 'bg-green-500',
};

const statusBgColors: Record<OrderStatus, string> = {
  'Checking': 'bg-yellow-100 text-yellow-800',
  'In Transit': 'bg-blue-100 text-blue-800',
  'Delivered': 'bg-green-100 text-green-800',
};

const OrderCard: React.FC<OrderCardProps> = ({ order, onOrderClick }) => {
  return (
    <div 
      className={cn(
        "p-4 bg-white rounded-xl mb-4 cursor-pointer transition-all hover:shadow-md",
        order.active ? "ring-2 ring-blue-500" : "",
        order.status === 'In Transit' ? "bg-blue-600 text-white" : "bg-white"
      )}
      onClick={() => onOrderClick(order.id)}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm font-medium mb-1">Order ID:</div>
          <div className="font-semibold">{order.id}</div>
        </div>
        
        {order.status !== 'In Transit' && (
          <div className={cn("px-3 py-1 rounded-full text-xs font-medium", statusBgColors[order.status])}>
            {order.status}
          </div>
        )}
        
        {order.status === 'In Transit' && (
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
            {order.status}
          </div>
        )}
      </div>
      
      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mb-4">
        <div 
          className={cn(
            "h-full rounded-full",
            order.status === 'In Transit' ? "bg-green-500" : "bg-blue-600"
          )}
          style={{ width: `${order.progress}%` }}
        />
      </div>
      
      <div className="relative pl-6">
        {order.steps.length > 1 && <div className="tracking-status-line" />}
        
        {order.steps.map((step, index) => (
          <div key={index} className="relative mb-6 last:mb-0">
            <div className="flex items-center mb-1">
              <div 
                className={cn(
                  "tracking-status-dot absolute -left-6",
                  step.status === order.status 
                    ? statusColors[step.status] 
                    : index < order.steps.findIndex(s => s.status === order.status)
                      ? "bg-blue-600"
                      : "bg-gray-200 border-2 border-white"
                )}
              />
              <div className={cn(
                "text-sm font-medium",
                order.status === 'In Transit' ? "text-blue-100" : ""
              )}>
                {step.date}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className={cn(
                "text-sm",
                order.status === 'In Transit' ? "text-white" : "text-gray-600"
              )}>
                {step.status}
              </div>
              <div className={cn(
                "text-sm",
                order.status === 'In Transit' ? "text-white" : "text-gray-600"
              )}>
                {step.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="ghost" size="icon" className="absolute top-3 right-2">
        <MoreVertical 
          size={20} 
          className={order.status === 'In Transit' ? "text-white" : "text-gray-500"}
        />
      </Button>
    </div>
  );
};

export default OrderCard;
