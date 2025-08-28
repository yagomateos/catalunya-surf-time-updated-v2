import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from "@/components/ui/button";
import { RefreshCw, Heart } from "lucide-react";
import { useQueryClient } from '@tanstack/react-query';
import { useSurfConditions } from '@/hooks/useSurfConditions';
import { surfSpots, type SurfSpot } from '@/lib/spots';
import { useFavorites } from '@/context/FavoritesContext';
import { Link } from 'react-router-dom';

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
  const queryClient = useQueryClient();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  // Fetch surf conditions for the selected spot
  const { data: conditions, isLoading, isError, error } = useSurfConditions(selectedSpot?.id ?? '');

  const handleRefresh = () => {
    if (selectedSpot) {
      queryClient.invalidateQueries({ queryKey: ['surfConditions', selectedSpot.id] });
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent, spot: SurfSpot) => {
    e.stopPropagation();
    if (isFavorite(spot.id)) {
      removeFavorite(spot.id);
    } else {
      addFavorite(spot.id);
    }
    (e.currentTarget as HTMLElement).blur();
    // Re-render popup
    const marker = (e.target as HTMLElement).closest('.leaflet-marker-icon');
    if (marker) {
      (marker as any).openPopup();
    }
  };

  return (
    <div className="relative h-screen bg-background">
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
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{spot.name}</h3>
                    <p className="text-sm text-gray-600">{spot.region}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={(e) => handleFavoriteClick(e, spot)} className="h-8 w-8">
                    <Heart className={`h-5 w-5 ${isFavorite(spot.id) ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                  </Button>
                </div>
                {conditions && selectedSpot?.id === spot.id && (
                  <div className="space-y-1 text-sm">
                    <div>Olas: {conditions.waveHeight}</div>
                    <div>Viento: {conditions.windSpeed} ({degreesToCardinal(conditions.windDirection)})</div>
                    <div>Temperatura: {conditions.temperature}</div>
                    <div className="text-xs text-muted-foreground">
                      Actualizado: {new Date(conditions.lastUpdate).toLocaleTimeString()}
                    </div>
                  </div>
                )}
                {isLoading && selectedSpot?.id === spot.id && (
                  <div className="flex items-center justify-center py-2">
                    <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  </div>
                )}
                {isError && selectedSpot?.id === spot.id && (
                  <div className="text-destructive text-sm">
                    Error: {error?.message || 'Desconocido'}
                  </div>
                )}
                <div className="mt-4 text-right">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/spot/${spot.id}`}>Más Info</Link>
                  </Button>
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

      {/* Refresh Button */}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleRefresh}
        className="absolute top-4 right-4 z-10 hidden"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Actualizar
      </Button>
    </div>
  );
};

export default SurfMap;
