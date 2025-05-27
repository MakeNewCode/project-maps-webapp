
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const CreateCargo: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    km: '',
    comision: '',
    precio: '',
    forma_pago: '',
    descripcion_carga: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.origen || !formData.destino || !formData.precio) {
      toast({
        title: "Error",
        description: "Por favor completa los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    // Aquí normalmente enviarías los datos a la API
    console.log('Nueva carga creada:', formData);
    
    toast({
      title: "Éxito",
      description: "Carga creada correctamente",
    });

    // Redirigir a la lista de cargas
    navigate('/cargo-management');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/cargo-management')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Crear Nueva Carga</h1>
          <p className="text-gray-600 mt-1">Completa los datos para registrar una nueva carga</p>
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Información de la Carga</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="origen">Origen *</Label>
                <Input
                  id="origen"
                  value={formData.origen}
                  onChange={(e) => handleInputChange('origen', e.target.value)}
                  placeholder="Ciudad de origen"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="destino">Destino *</Label>
                <Input
                  id="destino"
                  value={formData.destino}
                  onChange={(e) => handleInputChange('destino', e.target.value)}
                  placeholder="Ciudad de destino"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="km">Kilómetros</Label>
                <Input
                  id="km"
                  type="number"
                  step="0.01"
                  value={formData.km}
                  onChange={(e) => handleInputChange('km', e.target.value)}
                  placeholder="0.00"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="precio">Precio *</Label>
                <Input
                  id="precio"
                  type="number"
                  step="0.01"
                  value={formData.precio}
                  onChange={(e) => handleInputChange('precio', e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comision">Comisión</Label>
                <Input
                  id="comision"
                  type="number"
                  step="0.01"
                  value={formData.comision}
                  onChange={(e) => handleInputChange('comision', e.target.value)}
                  placeholder="0.00"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="forma_pago">Forma de Pago</Label>
                <Select value={formData.forma_pago} onValueChange={(value) => handleInputChange('forma_pago', value)}>
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="descripcion_carga">Descripción de la Carga</Label>
              <Textarea
                id="descripcion_carga"
                value={formData.descripcion_carga}
                onChange={(e) => handleInputChange('descripcion_carga', e.target.value)}
                placeholder="Describe el tipo de carga..."
                rows={4}
              />
            </div>
            
            <div className="flex justify-end gap-4 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/cargo-management')}
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Save size={16} />
                Crear Carga
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCargo;
