import { useState } from "react";
import HourlyForecast from "@/components/HourlyForecast";
import SurfAlerts from "@/components/SurfAlerts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, MapPin, Search } from "lucide-react";
import heroImage from "@/assets/hero-surf.jpg";
import { surfSpots } from "@/lib/spots";
import SurfConditionsWrapper from "@/components/SurfConditionsWrapper";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const hourlyData = [
    { time: "12:00", waveHeight: "1.2m", windSpeed: "12km/h", rating: 'good' as const },
    { time: "13:00", waveHeight: "1.4m", windSpeed: "10km/h", rating: 'excellent' as const },
    { time: "14:00", waveHeight: "1.6m", windSpeed: "8km/h", rating: 'excellent' as const },
    { time: "15:00", waveHeight: "1.5m", windSpeed: "11km/h", rating: 'good' as const },
    { time: "16:00", waveHeight: "1.3m", windSpeed: "14km/h", rating: 'good' as const },
    { time: "17:00", waveHeight: "1.1m", windSpeed: "16km/h", rating: 'fair' as const },
    { time: "18:00", waveHeight: "0.9m", windSpeed: "18km/h", rating: 'fair' as const },
  ];

  const filteredSpots = surfSpots.filter(
    (spot) =>
      spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spot.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-deep overflow-hidden">
        <img 
          src={heroImage} 
          alt="Surfing conditions in Cataluña" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-primary/60" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Surf España
            </h1>
            <p className="text-xl opacity-90 mb-4">
              Las mejores condiciones de surf en tiempo real
            </p>
            <div className="flex items-center space-x-2 text-sm opacity-80">
              <MapPin className="h-4 w-4" />
              <span>Costa Española • Actualizado hace 5 minutos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Current Conditions Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-foreground">Condiciones Actuales</h2>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar playa o región..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/90 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Surf Spots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSpots.map((spot) => (
              <SurfConditionsWrapper key={spot.id} spot={spot} />
            ))}
          </div>

          {/* Hourly Forecast and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <HourlyForecast data={hourlyData} />
            </div>
            <div>
              <SurfAlerts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
