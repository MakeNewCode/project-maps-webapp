
import React from 'react';
import { Home, Package, Truck, Calendar, Settings, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const AppSidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={cn(
        "bg-white h-screen transition-all duration-300 flex flex-col border-r",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center">
              <Package className="text-white" size={20} />
            </div>
            {!collapsed && <span className="ml-3 font-semibold">LogiTrack</span>}
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={onToggle} className="ml-auto">
          <Menu size={20} />
        </Button>
      </div>
      
      <div className="flex-1 py-8">
        <div className="space-y-2 px-3">
          <NavItem icon={Home} label="Inicio" active={false} collapsed={collapsed} />
          <NavItem icon={Package} label="Entregas" active={true} collapsed={collapsed} />
          <NavItem icon={Truck} label="Vehículos" active={false} collapsed={collapsed} />
          <NavItem icon={Calendar} label="Calendario" active={false} collapsed={collapsed} />
          <NavItem icon={Settings} label="Configuración" active={false} collapsed={collapsed} />
        </div>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200">
            {/* User avatar could go here */}
          </div>
          {!collapsed && <span className="ml-3 text-sm">Usuario Admin</span>}
        </div>
      </div>
    </div>
  );
};

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed: boolean;
};

const NavItem = ({ icon: Icon, label, active, collapsed }: NavItemProps) => {
  return (
    <div 
      className={cn(
        "flex items-center py-3 px-3 rounded-md cursor-pointer transition-colors",
        active ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
      )}
    >
      <Icon size={20} className={active ? "text-blue-600" : "text-gray-500"} />
      {!collapsed && <span className="ml-3 text-sm">{label}</span>}
    </div>
  );
};

export default AppSidebar;
