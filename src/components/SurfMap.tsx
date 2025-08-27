import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";
import { useQueryClient } from '@tanstack/react-query';
import { useSurfConditions } from '@/hooks/useSurfConditions';
import type { SurfConditions } from '@/services/surfService';

const surfSpots: SurfSpot[] = [
  // País Vasco
  { id: '1', name: 'Mundaka', coordinates: [-2.6892, 43.4081], rating: 'excellent', region: 'País Vasco', waveHeight: '2.1-3.2m', windSpeed: '6 km/h' },
  { id: '2', name: 'Zarautz', coordinates: [-2.1661, 43.2831], rating: 'excellent', region: 'País Vasco', waveHeight: '1.8-2.4m', windSpeed: '8 km/h' },
  { id: '3', name: 'Deba', coordinates: [-2.3480, 43.2947], rating: 'excellent', region: 'País Vasco', waveHeight: '1.9-2.6m', windSpeed: '9 km/h' },
  { id: '4', name: 'Sopelana', coordinates: [-2.9833, 43.3833], rating: 'good', region: 'País Vasco' },
  { id: '5', name: 'Bakio', coordinates: [-2.8167, 43.4167], rating: 'good', region: 'País Vasco' },
  
  // Cantabria
  { id: '6', name: 'Somo', coordinates: [-3.9167, 43.4667], rating: 'excellent', region: 'Cantabria', waveHeight: '1.6-2.2m', windSpeed: '11 km/h' },
  { id: '7', name: 'Oyambre', coordinates: [-4.3833, 43.4333], rating: 'excellent', region: 'Cantabria', waveHeight: '1.8-2.5m', windSpeed: '7 km/h' },
  { id: '8', name: 'Langre', coordinates: [-3.8833, 43.4500], rating: 'good', region: 'Cantabria' },
  { id: '9', name: 'Liencres', coordinates: [-3.9667, 43.4500], rating: 'good', region: 'Cantabria' },
  
  // Asturias
  { id: '10', name: 'Rodiles', coordinates: [-5.3667, 43.5333], rating: 'excellent', region: 'Asturias', waveHeight: '1.7-2.4m', windSpeed: '8 km/h' },
  { id: '11', name: 'Tapia de Casariego', coordinates: [-6.9500, 43.5667], rating: 'excellent', region: 'Asturias', waveHeight: '1.9-2.7m', windSpeed: '6 km/h' },
  { id: '12', name: 'Luarca', coordinates: [-6.5333, 43.5417], rating: 'excellent', region: 'Asturias', waveHeight: '1.6-2.3m', windSpeed: '9 km/h' },
  { id: '13', name: 'Salinas', coordinates: [-6.1333, 43.5667], rating: 'good', region: 'Asturias' },
  { id: '14', name: 'Gijón', coordinates: [-5.6611, 43.5322], rating: 'fair', region: 'Asturias' },
  
  // Galicia
  { id: '15', name: 'Pantin', coordinates: [-7.8833, 43.6167], rating: 'excellent', region: 'Galicia', waveHeight: '2.0-2.8m', windSpeed: '5 km/h' },
  { id: '16', name: 'Razo', coordinates: [-8.6000, 43.2833], rating: 'excellent', region: 'Galicia', waveHeight: '1.8-2.5m', windSpeed: '7 km/h' },
  { id: '17', name: 'Baldaio', coordinates: [-8.6167, 43.2167], rating: 'excellent', region: 'Galicia', waveHeight: '1.7-2.4m', windSpeed: '8 km/h' },
  { id: '18', name: 'Doniños', coordinates: [-8.2833, 43.3667], rating: 'excellent', region: 'Galicia', waveHeight: '1.9-2.6m', windSpeed: '6 km/h' },
  { id: '19', name: 'Barrañán', coordinates: [-8.6500, 43.2500], rating: 'good', region: 'Galicia' },
  { id: '20', name: 'Ézaro', coordinates: [-9.1167, 42.9000], rating: 'good', region: 'Galicia' },
  
  // Cataluña
  { id: '21', name: 'Tossa de Mar', coordinates: [2.9319, 41.7194], rating: 'excellent', region: 'Cataluña', waveHeight: '1.3-1.9m', windSpeed: '10 km/h' },
  { id: '22', name: 'Palamós', coordinates: [3.1294, 41.8469], rating: 'excellent', region: 'Cataluña', waveHeight: '1.4-2.0m', windSpeed: '9 km/h' },
  { id: '23', name: 'Roses', coordinates: [3.1761, 42.2619], rating: 'excellent', region: 'Cataluña', waveHeight: '1.6-2.2m', windSpeed: '11 km/h' },
  { id: '24', name: 'El Port de la Selva', coordinates: [3.2022, 42.3367], rating: 'excellent', region: 'Cataluña', waveHeight: '1.8-2.5m', windSpeed: '7 km/h' },
  { id: '25', name: 'Sitges', coordinates: [1.8061, 41.2372], rating: 'good', region: 'Cataluña' },
  { id: '26', name: 'Barcelona', coordinates: [2.1734, 41.3851], rating: 'fair', region: 'Cataluña' },
  
  // Andalucía
  { id: '27', name: 'El Palmar, Cádiz', coordinates: [-6.1833, 36.2167], rating: 'excellent', region: 'Andalucía', waveHeight: '1.4-2.1m', windSpeed: '10 km/h' },
  { id: '28', name: 'Conil de la Frontera', coordinates: [-6.0881, 36.2792], rating: 'good', region: 'Andalucía' },
  { id: '29', name: 'Tarifa', coordinates: [-5.6067, 36.0133], rating: 'good', region: 'Andalucía' },
  { id: '30', name: 'Zahara de los Atunes', coordinates: [-5.8439, 36.1381], rating: 'good', region: 'Andalucía' },
  
  // Canarias
  { id: '31', name: 'Las Canteras, Gran Canaria', coordinates: [-15.4500, 28.1500], rating: 'good', region: 'Gran Canaria', waveHeight: '1.5-2.2m', windSpeed: '18 km/h' },
  { id: '32', name: 'El Confital, Gran Canaria', coordinates: [-15.4333, 28.1667], rating: 'excellent', region: 'Gran Canaria', waveHeight: '1.8-2.6m', windSpeed: '15 km/h' },
  { id: '33', name: 'La Santa, Lanzarote', coordinates: [-13.8667, 29.1333], rating: 'excellent', region: 'Lanzarote', waveHeight: '2.1-3.0m', windSpeed: '12 km/h' },
  { id: '34', name: 'El Quemao, Lanzarote', coordinates: [-13.8500, 29.1167], rating: 'excellent', region: 'Lanzarote', waveHeight: '2.3-3.2m', windSpeed: '8 km/h' },
  { id: '35', name: 'La Izquierda, Tenerife', coordinates: [-16.6167, 28.3833], rating: 'excellent', region: 'Tenerife', waveHeight: '1.9-2.7m', windSpeed: '10 km/h' },
  { id: '36', name: 'Punta Blanca, Fuerteventura', coordinates: [-13.8667, 28.7000], rating: 'good', region: 'Fuerteventura', waveHeight: '2.0-2.8m', windSpeed: '20 km/h' },
  { id: '37', name: 'El Hierro', coordinates: [-17.9000, 27.7500], rating: 'good', region: 'El Hierro' },
  { id: '38', name: 'La Palma', coordinates: [-17.8833, 28.6833], rating: 'fair', region: 'La Palma' },
];

// Create simple custom icons for different ratings using CSS colors
const createCustomIcon = (rating: 'excellent' | 'good' | 'fair') => {
  const color = rating === 'excellent' ? '#3b82f6' : 
                rating === 'good' ? '#10b981' : '#ef4444';
  
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const SurfMap = () => {
  const [selectedSpot, setSelectedSpot] = useState<SurfSpot | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();
  const [visibleSpots, setVisibleSpots] = useState<string[]>([]);

  // Schedule regular updates for surf conditions
  useEffect(() => {
    const updateInterval = setInterval(() => {
      // Update conditions for visible spots and selected spot
      const spotsToUpdate = new Set([
        ...visibleSpots,
        ...(selectedSpot ? [selectedSpot.id] : [])
      ]);

      spotsToUpdate.forEach(spotId => {
        queryClient.invalidateQueries(['surfConditions', spotId]);
      });
    }, 300000); // Every 5 minutes

    return () => clearInterval(updateInterval);
  }, [visibleSpots, selectedSpot, queryClient]);

  // Track visible spots when map bounds change
  const handleMapChange = (bounds: L.LatLngBounds) => {
    const newVisibleSpots = surfSpots
      .filter(spot => bounds.contains([spot.coordinates[1], spot.coordinates[0]]))
      .map(spot => spot.id);
    setVisibleSpots(newVisibleSpots);
  };

  const filteredSpots = surfSpots.filter(spot =>
    spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spot.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch surf conditions for the selected spot
  const { data: conditions, isLoading } = useSurfConditions(selectedSpot?.id ?? '');

  // Add refresh button
  const handleRefresh = () => {
    if (selectedSpot) {
      queryClient.invalidateQueries(['surfConditions', selectedSpot.id]);
    }
  };

  return (
    <div className="relative h-screen bg-background">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar playas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card/90 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        center={[40.0, -4.0]}
        zoom={6}
        className="absolute inset-0 z-0"
        zoomControl={false}
        whenReady={(map) => {
          map.target.on('moveend', () => handleMapChange(map.target.getBounds()));
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {surfSpots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.coordinates[1], spot.coordinates[0]]}
            icon={createCustomIcon(spot.rating)}
            eventHandlers={{
              click: () => setSelectedSpot(spot),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-semibold text-lg">{spot.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{spot.region}</p>
                {spot.waveHeight && (
                  <div className="space-y-1 text-sm">
                    <div>Olas: {spot.waveHeight}</div>
                    <div>Viento: {spot.windSpeed}</div>
                  </div>
                )}
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    spot.rating === 'excellent' 
                      ? 'bg-blue-100 text-blue-800'
                      : spot.rating === 'good'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {spot.rating === 'excellent' ? 'Excelente' : 
                     spot.rating === 'good' ? 'Bueno' : 'Regular'}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-20 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <h3 className="text-sm font-semibold mb-2">Condiciones</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 border border-white"></div>
            <span className="text-xs">Excelente</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500 border border-white"></div>
            <span className="text-xs">Bueno</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 border border-white"></div>
            <span className="text-xs">Regular</span>
          </div>
        </div>
      </div>

      {/* Selected Spot Info */}
      {selectedSpot && (
        <div className="absolute bottom-20 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{selectedSpot.name}</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedSpot(null)}
              className="p-1 h-6 w-6"
            >
              ×
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{selectedSpot.region}</p>
          {conditions && (
            <>
              <div className="space-y-1 text-sm">
                <div>Olas: {conditions.waveHeight}</div>
                <div>Viento: {conditions.windSpeed} ({conditions.windDirection})</div>
                <div>Temperatura: {conditions.temperature}</div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Actualizado: {new Date(conditions.lastUpdate).toLocaleTimeString()}
              </div>
            </>
          )}
          {isLoading && (
            <div className="flex items-center justify-center py-2">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          )}
        </div>
      )}

      {/* Refresh Button */}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleRefresh}
        className="absolute top-4 right-4 z-10"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Actualizar
      </Button>

      {/* Search Results */}
      {searchTerm && filteredSpots.length > 0 && (
        <div className="absolute top-16 left-4 right-4 max-h-60 overflow-y-auto bg-card/90 backdrop-blur-sm rounded-lg shadow-lg z-10">
          {filteredSpots.map((spot) => (
            <div
              key={spot.id}
              className="p-3 border-b border-border/50 cursor-pointer hover:bg-accent/50"
              onClick={() => {
                setSearchTerm('');
                setSelectedSpot(spot);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full border border-white ${
                    spot.rating === 'excellent' 
                      ? 'bg-blue-500'
                      : spot.rating === 'good'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium">{spot.name}</h4>
                    <p className="text-sm text-muted-foreground">{spot.region}</p>
                  </div>
                </div>
                <div className="text-sm">
                  {spot.windSpeed && <div>Viento: {spot.windSpeed}</div>}
                  {spot.waveHeight && <div>Olas: {spot.waveHeight}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurfMap;