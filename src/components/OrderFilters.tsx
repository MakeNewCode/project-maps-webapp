
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FilterType = {
  dateRange?: string;
  status?: string[];
};

interface OrderFiltersProps {
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
  onSearch: (query: string) => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({ filters, onFilterChange, onSearch }) => {
  const removeFilter = (type: keyof FilterType, value?: string) => {
    if (type === 'dateRange') {
      onFilterChange({ ...filters, dateRange: undefined });
    } else if (type === 'status' && value && filters.status) {
      onFilterChange({
        ...filters,
        status: filters.status.filter(s => s !== value)
      });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Buscar por ID de orden..."
          className="pl-10"
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filters.dateRange && (
          <div className="filter-chip">
            <span className="text-sm">{filters.dateRange}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 p-0 ml-1"
              onClick={() => removeFilter('dateRange')}
            >
              <X size={14} />
            </Button>
          </div>
        )}
        
        {filters.status && filters.status.map(status => (
          <div key={status} className="filter-chip">
            <span className="text-sm">{status}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 p-0 ml-1"
              onClick={() => removeFilter('status', status)}
            >
              <X size={14} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderFilters;
