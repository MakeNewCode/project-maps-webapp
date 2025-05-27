import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

const CreateCargo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cliente: '',
    direccion: '',
    descripcion: '',
    peso: '',
    paquetes: '',
    valor: '',
    prioridad: '',
    telefono: '',
    notas: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // such as sending the data to an API.
    console.log(formData);
    toast.success('Carga creada exitosamente!');
    // After successful submission, navigate back to cargo management
    navigate('/cargo-management');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col h-full">
            <header className="flex items-center gap-2 px-4 py-2 border-b">
              <SidebarTrigger />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/cargo-management')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
              <h1 className="text-xl font-semibold">Crear Nueva Carga</h1>
            </header>
            
            <div className="flex-1 p-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de la Carga</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="cliente">Cliente</Label>
                      <Input
                        type="text"
                        id="cliente"
                        name="cliente"
                        value={formData.cliente}
                        onChange={handleInputChange}
                        placeholder="Nombre del cliente"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="direccion">Dirección de Entrega</Label>
                      <Input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        placeholder="Dirección completa"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="descripcion">Descripción</Label>
                      <Textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        placeholder="Descripción detallada de la carga"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="peso">Peso (kg)</Label>
                        <Input
                          type="number"
                          id="peso"
                          name="peso"
                          value={formData.peso}
                          onChange={handleInputChange}
                          placeholder="Peso en kilogramos"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="paquetes">Número de Paquetes</Label>
                        <Input
                          type="number"
                          id="paquetes"
                          name="paquetes"
                          value={formData.paquetes}
                          onChange={handleInputChange}
                          placeholder="Cantidad de paquetes"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="valor">Valor Declarado</Label>
                        <Input
                          type="number"
                          id="valor"
                          name="valor"
                          value={formData.valor}
                          onChange={handleInputChange}
                          placeholder="Valor en pesos"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefono">Teléfono de Contacto</Label>
                        <Input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          placeholder="Número de teléfono"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="prioridad">Prioridad</Label>
                      <Select onValueChange={(value) => handleSelectChange('prioridad', value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar prioridad" defaultValue={formData.prioridad} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alta">Alta</SelectItem>
                          <SelectItem value="media">Media</SelectItem>
                          <SelectItem value="baja">Baja</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="notas">Notas Adicionales</Label>
                      <Textarea
                        id="notas"
                        name="notas"
                        value={formData.notas}
                        onChange={handleInputChange}
                        placeholder="Información adicional relevante"
                      />
                    </div>
                    <Button type="submit" className="w-full flex items-center gap-2 justify-center">
                      <Save className="h-4 w-4" />
                      Crear Carga
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CreateCargo;
