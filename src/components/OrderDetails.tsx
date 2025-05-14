
import React from 'react';
import { Order } from './OrderCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderDetailsProps {
  order: Order | null;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  if (!order) {
    return (
      <div className="bg-white rounded-xl p-6 text-center">
        <p className="text-gray-500">Selecciona una orden para ver sus detalles</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Información Principal</h2>
      
      <Tabs defaultValue="vehicle">
        <TabsList className="mb-4">
          <TabsTrigger value="order">Detalles de Orden</TabsTrigger>
          <TabsTrigger value="vehicle">Vehículo</TabsTrigger>
          <TabsTrigger value="driver">Conductor</TabsTrigger>
          <TabsTrigger value="customer">Cliente</TabsTrigger>
        </TabsList>
        
        <TabsContent value="order">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">ID de Orden</h3>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Fecha de Creación</h3>
              <p className="font-medium">{order.steps[0].date}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Estado Actual</h3>
              <p className="font-medium">{order.status}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Destino</h3>
              <p className="font-medium">Mar del Plata, Buenos Aires</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="vehicle">
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Hyundai_wordmark.svg/1200px-Hyundai_wordmark.svg.png" alt="Hyundai" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h3 className="font-medium">Hyundai</h3>
                  <div className="flex items-center text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">4.9</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-500">MODELO</h3>
                  <p className="font-medium">Cargo Track HD320</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">PESO</h3>
                  <p className="font-medium">7,260 kg</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="relative mb-6">
                <div className="bg-gray-100 h-32 w-full rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-[71%] bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">71%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-500">ESPACIO</h3>
                  <p className="font-medium">71% / 100%</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">VOLUMEN DE CARGA</h3>
                  <p className="font-medium">372,45 m³</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="driver">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200"></div>
              <div>
                <h3 className="font-medium text-lg">Carlos Rodríguez</h3>
                <div className="flex items-center text-sm">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">4.8 (120 viajes)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500">TELÉFONO</h3>
              <p className="font-medium">+54 11 5555-7890</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">LICENCIA</h3>
              <p className="font-medium">AR-CDL-34567890</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">EXPERIENCIA</h3>
              <p className="font-medium">7 años</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="customer">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200"></div>
              <div>
                <h3 className="font-medium text-lg">Empresa Distribuidora S.A.</h3>
                <p className="text-sm text-gray-500">Cliente desde 2019</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500">CONTACTO</h3>
              <p className="font-medium">Laura Méndez</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">EMAIL</h3>
              <p className="font-medium">contacto@distribuidora.com.ar</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">TELÉFONO</h3>
              <p className="font-medium">+54 223 4456-7890</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">DIRECCIÓN</h3>
              <p className="font-medium">Av. Constitución 5687, Mar del Plata</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderDetails;
