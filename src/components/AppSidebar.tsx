
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Package2, 
  Home, 
  Map, 
  Settings, 
  List,
  Plus,
  Eye,
  ChevronRight
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AppSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed = false, onToggle }) => {
  const location = useLocation();
  const { state } = useSidebar();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Home,
      current: location.pathname === '/'
    },
    {
      name: 'Gestión de Cargas',
      icon: List,
      current: location.pathname === '/cargo-management' || location.pathname === '/cargo-management/create',
      items: [
        {
          name: 'Ver Cargas',
          href: '/cargo-management',
          icon: Eye,
          current: location.pathname === '/cargo-management'
        },
        {
          name: 'Crear Carga',
          href: '/cargo-management/create',
          icon: Plus,
          current: location.pathname === '/cargo-management/create'
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

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-center p-4">
          {state === "expanded" ? (
            <div className="flex items-center space-x-2">
              <Package2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CargoTrack</span>
            </div>
          ) : (
            <Package2 className="h-8 w-8 text-blue-600" />
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon;
                
                if (item.items) {
                  return (
                    <Collapsible key={item.name} asChild defaultOpen={item.current}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.name}
                            isActive={item.current}
                            className="w-full"
                          >
                            <Icon className="h-5 w-5" />
                            <span>{item.name}</span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => {
                              const SubIcon = subItem.icon;
                              return (
                                <SidebarMenuSubItem key={subItem.name}>
                                  <SidebarMenuSubButton asChild isActive={subItem.current}>
                                    <Link to={subItem.href}>
                                      <SubIcon className="h-4 w-4" />
                                      <span>{subItem.name}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }
                
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild tooltip={item.name} isActive={item.current}>
                      <Link to={item.href}>
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
