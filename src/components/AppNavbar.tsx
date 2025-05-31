
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Package2, 
  Home, 
  Map, 
  Settings, 
  List,
  Menu,
  X,
  Plus,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AppNavbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      current: location.pathname === '/cargo-management' || location.pathname === '/create-cargo',
      submenu: [
        {
          name: 'Ver Cargas',
          href: '/cargo-management',
          icon: Eye
        },
        {
          name: 'Crear Carga',
          href: '/create-cargo',
          icon: Plus
        }
      ]
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Package2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">CargoTrack</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              
              if (item.submenu) {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          item.current
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        <Icon className="h-5 w-5 mr-2" />
                        <span>{item.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.submenu.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <DropdownMenuItem key={subItem.name} asChild>
                            <Link
                              to={subItem.href}
                              className="flex items-center px-2 py-2 text-sm"
                            >
                              <SubIcon className="h-4 w-4 mr-2" />
                              {subItem.name}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    item.current
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-gray-600"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              
              if (item.submenu) {
                return (
                  <div key={item.name} className="space-y-1">
                    <div className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                      item.current
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600"
                    )}>
                      <Icon className="h-5 w-5 mr-3" />
                      <span>{item.name}</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      {item.submenu.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="flex items-center px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <SubIcon className="h-4 w-4 mr-3" />
                            {subItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    item.current
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
