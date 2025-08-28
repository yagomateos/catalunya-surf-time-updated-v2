import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";
import { useQueryClient } from '@tanstack/react-query';
import { useSurfConditions } from '@/hooks/useSurfConditions';
import type { SurfConditions } from '@/services/surfService';
import { surfSpots, type SurfSpot } from '@/lib/spots';
import { Skeleton } from "@/components/ui/skeleton";

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

const degreesToCardinal = (deg: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
};

const SurfMap = () => {
  const [selectedSpot, setSelectedSpot] = useState<SurfSpot | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const filteredSpots = surfSpots.filter(spot =>
    spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spot.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch surf conditions for the selected spot
  const { data: conditions, isLoading, isError, error } = useSurfConditions(selectedSpot?.id ?? '');

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
                {conditions && (
                  <div className="space-y-1 text-sm">
                    <div>Olas: {conditions.waveHeight}</div>
                    <div>Viento: {conditions.windSpeed} ({degreesToCardinal(conditions.windDirection)})</div>
                    <div>Temperatura: {conditions.temperature}</div>
                    <div className="text-xs text-muted-foreground">
                      Actualizado: {new Date(conditions.lastUpdate).toLocaleTimeString()}
                    </div>
                  </div>
                )}
                {isLoading && (
                  <div className="flex items-center justify-center py-2">
                    <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  </div>
                )}
                {isError && (
                  <div className="text-destructive text-sm">
                    Error: {error?.message || 'Desconocido'}
                  </div>
                )}
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
                <div>Viento: {conditions.windSpeed} ({degreesToCardinal(conditions.windDirection)})</div>
                <div>Temperatura: {conditions.temperature}</div>
                <div className="text-xs text-muted-foreground">
                  Actualizado: {new Date(conditions.lastUpdate).toLocaleTimeString()}
                </div>
              </div>
            </>
          )}
          {isLoading && (
            <div className="flex items-center justify-center py-2">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          )}
          {isError && (
            <div className="text-destructive text-sm">
              Error: {error?.message || 'Desconocido'}
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