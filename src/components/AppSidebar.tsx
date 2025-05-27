
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Package2, 
  Home, 
  Map, 
  Settings, 
  List
} from 'lucide-react';

interface AppSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed = false, onToggle }) => {
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Home,
      current: location.pathname === '/'
    },
    {
      name: 'Gestión de Cargas',
      href: '/cargo-management',
      icon: List,
      current: location.pathname === '/cargo-management'
    },
    {
      name: 'Mapa',
      href: '/',
      icon: Map,
      current: false
    },
    {
      name: 'Configuración',
      href: '/settings',
      icon: Settings,
      current: location.pathname === '/settings'
    }
  ];

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Package2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CargoTrack</span>
          </div>
        )}
        {collapsed && (
          <Package2 className="h-8 w-8 text-blue-600" />
        )}
      </div>
      
      <nav className="mt-8">
        <ul className="space-y-1 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    item.current
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AppSidebar;
