import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Trash2, Plus, Package, MapPin, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface Cargo {
  id: string;
  cliente: string;
  direccion: string;
  descripcion: string;
  peso: number;
  paquetes: number;
  valor: number;
  prioridad: 'alta' | 'media' | 'baja';
  estado: 'pendiente' | 'en_transito' | 'entregado' | 'cancelado';
  fechaEntrega: string;
}

const mockCargos: Cargo[] = [
  {
    id: "CRG-001",
    cliente: "Distribuidora Acme",
    direccion: "Calle Principal 123, Ciudad",
    descripcion: "Carga de productos electrónicos",
    peso: 1200,
    paquetes: 50,
    valor: 75000,
    prioridad: "alta",
    estado: "pendiente",
    fechaEntrega: "2024-03-20"
  },
  {
    id: "CRG-002",
    cliente: "Importaciones Beta",
    direccion: "Avenida Central 456, Ciudad",
    descripcion: "Carga de repuestos automotrices",
    peso: 850,
    paquetes: 30,
    valor: 48000,
    prioridad: "media",
    estado: "en_transito",
    fechaEntrega: "2024-03-22"
  },
  {
    id: "CRG-003",
    cliente: "Logística Gamma",
    direccion: "Calle Secundaria 789, Ciudad",
    descripcion: "Carga de textiles",
    peso: 500,
    paquetes: 100,
    valor: 32000,
    prioridad: "baja",
    estado: "entregado",
    fechaEntrega: "2024-03-15"
  },
  {
    id: "CRG-004",
    cliente: "Exportaciones Delta",
    direccion: "Avenida Costanera 101, Ciudad",
    descripcion: "Carga de productos alimenticios",
    peso: 1500,
    paquetes: 60,
    valor: 92000,
    prioridad: "alta",
    estado: "pendiente",
    fechaEntrega: "2024-03-25"
  },
  {
    id: "CRG-005",
    cliente: "Comercializadora Omega",
    direccion: "Calle Industrial 222, Ciudad",
    descripcion: "Carga de maquinaria industrial",
    peso: 2000,
    paquetes: 10,
    valor: 120000,
    prioridad: "media",
    estado: "en_transito",
    fechaEntrega: "2024-03-28"
  }
];

const CargoManagement = () => {
  const [cargos, setCargos] = useState<Cargo[]>(mockCargos);

  const handleDelete = (cargoId: string) => {
    setCargos(cargos.filter(cargo => cargo.id !== cargoId));
    toast.success(`Carga ${cargoId} eliminada`);
  };

  const getStatusBadge = (status: Cargo['estado']) => {
    const statusConfig = {
      pendiente: { color: 'bg-yellow-100 text-yellow-800', label: 'Pendiente' },
      en_transito: { color: 'bg-blue-100 text-blue-800', label: 'En Tránsito' },
      entregado: { color: 'bg-green-100 text-green-800', label: 'Entregado' },
      cancelado: { color: 'bg-red-100 text-red-800', label: 'Cancelado' }
    };
    return statusConfig[status];
  };

  const getPriorityBadge = (priority: Cargo['prioridad']) => {
    const priorityConfig = {
      alta: { color: 'bg-red-100 text-red-800', label: 'Alta' },
      media: { color: 'bg-orange-100 text-orange-800', label: 'Media' },
      baja: { color: 'bg-gray-100 text-gray-800', label: 'Baja' }
    };
    return priorityConfig[priority];
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col h-full">
            <header className="flex items-center justify-between px-4 py-2 border-b">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold">Gestión de Cargas</h1>
              </div>
              <Link to="/cargo-management/create">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Carga
                </Button>
              </Link>
            </header>
            
            <div className="flex-1 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Cargas Pendientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{cargos.filter(cargo => cargo.estado === 'pendiente').length}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Cargas En Tránsito</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{cargos.filter(cargo => cargo.estado === 'en_transito').length}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Cargas Entregadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{cargos.filter(cargo => cargo.estado === 'entregado').length}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Lista de Cargas</CardTitle>
                </CardHeader>
                <CardContent className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Dirección</TableHead>
                        <TableHead>Peso</TableHead>
                        <TableHead>Paquetes</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Prioridad</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha Entrega</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cargos.map((cargo) => {
                        const statusBadge = getStatusBadge(cargo.estado);
                        const priorityBadge = getPriorityBadge(cargo.prioridad);

                        return (
                          <TableRow key={cargo.id}>
                            <TableCell>{cargo.cliente}</TableCell>
                            <TableCell>{cargo.direccion}</TableCell>
                            <TableCell>{cargo.peso} kg</TableCell>
                            <TableCell>{cargo.paquetes}</TableCell>
                            <TableCell>${cargo.valor}</TableCell>
                            <TableCell>
                              <Badge className={priorityBadge.color}>{priorityBadge.label}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={statusBadge.color}>{statusBadge.label}</Badge>
                            </TableCell>
                            <TableCell>{cargo.fechaEntrega}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="icon" variant="ghost">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => handleDelete(cargo.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CargoManagement;
