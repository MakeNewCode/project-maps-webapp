
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MapboxTokenInputProps {
  onSubmit: (token: string) => void;
}

const MapboxTokenInput: React.FC<MapboxTokenInputProps> = ({ onSubmit }) => {
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onSubmit(token.trim());
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-4">
      <h3 className="text-lg font-medium mb-2">Configuración del Mapa</h3>
      <p className="text-sm text-gray-500 mb-4">
        Para ver el mapa, por favor ingresa tu token público de Mapbox.
        Puedes obtenerlo en <a href="https://account.mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>.
      </p>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="pk.eyJ1Ijoi..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={!token.trim()}>
          Guardar
        </Button>
      </form>
    </div>
  );
};

export default MapboxTokenInput;
