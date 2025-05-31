import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Eye, Trash2, Edit } from 'lucide-react';
import { Order } from '@/components/OrderCard';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog';

// Mock data - same as other pages
const INITIAL_ORDERS: Order[] = [
  {
    id: 1,
    origen: "Buenos Aires",
    destino: "Córdoba",
    km: "700.50",
    comision: "50.00",
    precio: "1500.00",
    forma_pago: "Transferencia",
    descripcion_carga: "Electrodomésticos varios",
    fecha_creacion: "2025-05-16T14:23:45Z"
  },
  {
    id: 2,
    origen: "Rosario",
    destino: "Mendoza",
    km: "850.75",
    comision: "60.00",
    precio: "2000.00",
    forma_pago: "Contado",
    descripcion_carga: "Material de construcción",
    fecha_creacion: "2025-05-15T10:12:30Z"
  },
  {
    id: 3,
    origen: "La Plata",
    destino: "Mar del Plata",
    km: "350.25",
    comision: "40.00",
    precio: "1200.00",
    forma_pago: "Tarjeta",
    descripcion_carga: "Productos alimenticios",
    fecha_creacion: "2025-05-14T08:45:15Z"
  },
  {
    id: 4,
    origen: "Bahía Blanca",
    destino: "Neuquén",
    km: "550.80",
    comision: "55.00",
    precio: "1800.00",
    forma_pago: "Transferencia",
    descripcion_carga: "Maquinaria industrial",
    fecha_creacion: "2025-05-13T16:30:20Z"
  }
];

const CargoManagement: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    km: '',
    comision: '',
    precio: '',
    forma_pago: '',
    descripcion_carga: ''
  });

  const resetForm = () => {
    setFormData({
      origen: '',
      destino: '',
      km: '',
      comision: '',
      precio: '',
      forma_pago: '',
      descripcion_carga: ''
    });
  };

  const handleCreate = () => {
    const newOrder: Order = {
      id: Math.max(...orders.map(o => o.id)) + 1,
      ...formData,
      fecha_creacion: new Date().toISOString()
    };
    setOrders([...orders, newOrder]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setFormData({
      origen: order.origen,
      destino: order.destino,
      km: order.km,
      comision: order.comision,
      precio: order.precio,
      forma_pago: order.forma_pago,
      descripcion_carga: order.descripcion_carga
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedOrder) return;
    
    const updatedOrders = orders.map(order =>
      order.id === selectedOrder.id
        ? { ...order, ...formData }
        : order
    );
    setOrders(updatedOrders);
    setIsEditDialogOpen(false);
    setSelectedOrder(null);
    resetForm();
  };

  const handleDeleteClick = (order: Order) => {
    setOrderToDelete(order);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      setOrders(orders.filter(order => order.id !== orderToDelete.id));
      setIsDeleteDialogOpen(false);
      setOrderToDelete(null);
    }
  };

  const handleViewDetails = (id: number) => {
    navigate(`/route/${id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodBadgeColor = (method: string) => {
    switch (method.toLowerCase()) {
      case 'transferencia': return 'bg-blue-100 text-blue-800';
      case 'contado': return 'bg-green-100 text-green-800';
      case 'tarjeta': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Cargas</h1>
          <p className="text-gray-600 mt-1">Administra todas las cargas del sistema</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
              <Plus size={20} />
              Nueva Carga
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Carga</DialogTitle>
              <DialogDescription>
                Completa los datos para crear una nueva carga
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="origen">Origen</Label>
                <Input
                  id="origen"
                  value={formData.origen}
                  onChange={(e) => setFormData({...formData, origen: e.target.value})}
                  placeholder="Ciudad de origen"
                />
              </div>
              <div>
                <Label htmlFor="destino">Destino</Label>
                <Input
                  id="destino"
                  value={formData.destino}
                  onChange={(e) => setFormData({...formData, destino: e.target.value})}
                  placeholder="Ciudad de destino"
                />
              </div>
              <div>
                <Label htmlFor="km">Kilómetros</Label>
                <Input
                  id="km"
                  value={formData.km}
                  onChange={(e) => setFormData({...formData, km: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="precio">Precio</Label>
                <Input
                  id="precio"
                  value={formData.precio}
                  onChange={(e) => setFormData({...formData, precio: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="comision">Comisión</Label>
                <Input
                  id="comision"
                  value={formData.comision}
                  onChange={(e) => setFormData({...formData, comision: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="forma_pago">Forma de Pago</Label>
                <Select value={formData.forma_pago} onValueChange={(value) => setFormData({...formData, forma_pago: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar forma de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Transferencia">Transferencia</SelectItem>
                    <SelectItem value="Contado">Contado</SelectItem>
                    <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="descripcion_carga">Descripción de la Carga</Label>
                <Textarea
                  id="descripcion_carga"
                  value={formData.descripcion_carga}
                  onChange={(e) => setFormData({...formData, descripcion_carga: e.target.value})}
                  placeholder="Describe el tipo de carga..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreate}>
                Crear Carga
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Cargas ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ID</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Distancia</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Comisión</TableHead>
                <TableHead>Forma de Pago</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.origen}</TableCell>
                  <TableCell>{order.destino}</TableCell>
                  <TableCell>{order.km} km</TableCell>
                  <TableCell>${order.precio}</TableCell>
                  <TableCell>${order.comision}</TableCell>
                  <TableCell>
                    <Badge className={getPaymentMethodBadgeColor(order.forma_pago)}>
                      {order.forma_pago}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(order.fecha_creacion)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(order.id)}
                        title="Ver detalles"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(order)}
                        title="Editar"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(order)}
                        title="Eliminar"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Carga #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Modifica los datos de la carga
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-origen">Origen</Label>
              <Input
                id="edit-origen"
                value={formData.origen}
                onChange={(e) => setFormData({...formData, origen: e.target.value})}
                placeholder="Ciudad de origen"
              />
            </div>
            <div>
              <Label htmlFor="edit-destino">Destino</Label>
              <Input
                id="edit-destino"
                value={formData.destino}
                onChange={(e) => setFormData({...formData, destino: e.target.value})}
                placeholder="Ciudad de destino"
              />
            </div>
            <div>
              <Label htmlFor="edit-km">Kilómetros</Label>
              <Input
                id="edit-km"
                value={formData.km}
                onChange={(e) => setFormData({...formData, km: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="edit-precio">Precio</Label>
              <Input
                id="edit-precio"
                value={formData.precio}
                onChange={(e) => setFormData({...formData, precio: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="edit-comision">Comisión</Label>
              <Input
                id="edit-comision"
                value={formData.comision}
                onChange={(e) => setFormData({...formData, comision: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="edit-forma_pago">Forma de Pago</Label>
              <Select value={formData.forma_pago} onValueChange={(value) => setFormData({...formData, forma_pago: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar forma de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Transferencia">Transferencia</SelectItem>
                  <SelectItem value="Contado">Contado</SelectItem>
                  <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-descripcion_carga">Descripción de la Carga</Label>
              <Textarea
                id="edit-descripcion_carga"
                value={formData.descripcion_carga}
                onChange={(e) => setFormData({...formData, descripcion_carga: e.target.value})}
                placeholder="Describe el tipo de carga..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdate}>
              Actualizar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar carga?"
        itemName={orderToDelete ? `Carga #${orderToDelete.id} (${orderToDelete.origen} → ${orderToDelete.destino})` : undefined}
      />
    </div>
  );
};

export default CargoManagement;
