import SurfConditionsCard from "@/components/SurfConditionsCard";
import HourlyForecast from "@/components/HourlyForecast";
import SurfAlerts from "@/components/SurfAlerts";
import { Button } from "@/components/ui/button";
import { RefreshCw, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-surf.jpg";

const Index = () => {
  const surfSpots = [
    // Cataluña
    {
      location: "Tossa de Mar",
      waveHeight: "1.3-1.9m",
      waveDirection: "NE",
      windSpeed: "10 km/h",
      windDirection: "W",
      temperature: "20°C",
      visibility: "12km",
      rating: 'excellent' as const
    },
    {
      location: "Palamós",
      waveHeight: "1.4-2.0m",
      waveDirection: "E",
      windSpeed: "9 km/h",
      windDirection: "SW",
      temperature: "19°C",
      visibility: "11km",
      rating: 'excellent' as const
    },
    {
      location: "Roses",
      waveHeight: "1.6-2.2m",
      waveDirection: "N",
      windSpeed: "11 km/h",
      windDirection: "W",
      temperature: "18°C",
      visibility: "9km",
      rating: 'excellent' as const
    },
    {
      location: "El Port de la Selva",
      waveHeight: "1.8-2.5m",
      waveDirection: "NE",
      windSpeed: "7 km/h",
      windDirection: "SW",
      temperature: "17°C",
      visibility: "13km",
      rating: 'excellent' as const
    },
    // País Vasco
    {
      location: "Mundaka",
      waveHeight: "2.1-3.2m",
      waveDirection: "NW",
      windSpeed: "6 km/h",
      windDirection: "E",
      temperature: "16°C",
      visibility: "15km",
      rating: 'excellent' as const
    },
    {
      location: "Zarautz",
      waveHeight: "1.8-2.4m",
      waveDirection: "NW",
      windSpeed: "8 km/h",
      windDirection: "SE",
      temperature: "17°C",
      visibility: "12km",
      rating: 'excellent' as const
    },
    {
      location: "Deba",
      waveHeight: "1.9-2.6m",
      waveDirection: "NW",
      windSpeed: "9 km/h",
      windDirection: "E",
      temperature: "15°C",
      visibility: "13km",
      rating: 'excellent' as const
    },
    // Cantabria
    {
      location: "Somo",
      waveHeight: "1.6-2.2m",
      waveDirection: "NW",
      windSpeed: "11 km/h",
      windDirection: "S",
      temperature: "16°C",
      visibility: "12km",
      rating: 'excellent' as const
    },
    {
      location: "Oyambre",
      waveHeight: "1.8-2.5m",
      waveDirection: "NW",
      windSpeed: "7 km/h",
      windDirection: "S",
      temperature: "15°C",
      visibility: "14km",
      rating: 'excellent' as const
    },
    // Asturias
    {
      location: "Rodiles",
      waveHeight: "1.7-2.4m",
      waveDirection: "NW",
      windSpeed: "8 km/h",
      windDirection: "S",
      temperature: "15°C",
      visibility: "13km",
      rating: 'excellent' as const
    },
    {
      location: "Tapia de Casariego",
      waveHeight: "1.9-2.7m",
      waveDirection: "NW",
      windSpeed: "6 km/h",
      windDirection: "SE",
      temperature: "14°C",
      visibility: "15km",
      rating: 'excellent' as const
    },
    {
      location: "Luarca",
      waveHeight: "1.6-2.3m",
      waveDirection: "NW",
      windSpeed: "9 km/h",
      windDirection: "E",
      temperature: "15°C",
      visibility: "12km",
      rating: 'excellent' as const
    },
    // Galicia
    {
      location: "Pantin",
      waveHeight: "2.0-2.8m",
      waveDirection: "NW",
      windSpeed: "5 km/h",
      windDirection: "S",
      temperature: "14°C",
      visibility: "16km",
      rating: 'excellent' as const
    },
    {
      location: "Razo",
      waveHeight: "1.8-2.5m",
      waveDirection: "NW",
      windSpeed: "7 km/h",
      windDirection: "SE",
      temperature: "15°C",
      visibility: "14km",
      rating: 'excellent' as const
    },
    {
      location: "Baldaio",
      waveHeight: "1.7-2.4m",
      waveDirection: "NW",
      windSpeed: "8 km/h",
      windDirection: "E",
      temperature: "14°C",
      visibility: "13km",
      rating: 'excellent' as const
    },
    {
      location: "Doniños",
      waveHeight: "1.9-2.6m",
      waveDirection: "NW",
      windSpeed: "6 km/h",
      windDirection: "S",
      temperature: "13°C",
      visibility: "15km",
      rating: 'excellent' as const
    },
    // Andalucía
    {
      location: "El Palmar, Cádiz",
      waveHeight: "1.4-2.1m",
      waveDirection: "SW",
      windSpeed: "10 km/h",
      windDirection: "E",
      temperature: "20°C",
      visibility: "12km",
      rating: 'excellent' as const
    },
    // Canarias
    {
      location: "Las Canteras, Gran Canaria",
      waveHeight: "1.5-2.2m",
      waveDirection: "NW",
      windSpeed: "18 km/h",
      windDirection: "NE",
      temperature: "24°C",
      visibility: "8km",
      rating: 'good' as const
    },
    {
      location: "El Confital, Gran Canaria",
      waveHeight: "1.8-2.6m",
      waveDirection: "NW",
      windSpeed: "15 km/h",
      windDirection: "N",
      temperature: "23°C",
      visibility: "10km",
      rating: 'excellent' as const
    },
    {
      location: "La Santa, Lanzarote",
      waveHeight: "2.1-3.0m",
      waveDirection: "NW",
      windSpeed: "12 km/h",
      windDirection: "NE",
      temperature: "22°C",
      visibility: "12km",
      rating: 'excellent' as const
    },
    {
      location: "El Quemao, Lanzarote",
      waveHeight: "2.3-3.2m",
      waveDirection: "NW",
      windSpeed: "8 km/h",
      windDirection: "E",
      temperature: "21°C",
      visibility: "14km",
      rating: 'excellent' as const
    },
    {
      location: "La Izquierda, Tenerife",
      waveHeight: "1.9-2.7m",
      waveDirection: "NW",
      windSpeed: "10 km/h",
      windDirection: "NE",
      temperature: "23°C",
      visibility: "11km",
      rating: 'excellent' as const
    },
    {
      location: "Punta Blanca, Fuerteventura",
      waveHeight: "2.0-2.8m",
      waveDirection: "NW",
      windSpeed: "20 km/h",
      windDirection: "N",
      temperature: "22°C",
      visibility: "9km",
      rating: 'good' as const
    }
  ];

  const hourlyData = [
    { time: "12:00", waveHeight: "1.2m", windSpeed: "12km/h", rating: 'good' as const },
    { time: "13:00", waveHeight: "1.4m", windSpeed: "10km/h", rating: 'excellent' as const },
    { time: "14:00", waveHeight: "1.6m", windSpeed: "8km/h", rating: 'excellent' as const },
    { time: "15:00", waveHeight: "1.5m", windSpeed: "11km/h", rating: 'good' as const },
    { time: "16:00", waveHeight: "1.3m", windSpeed: "14km/h", rating: 'good' as const },
    { time: "17:00", waveHeight: "1.1m", windSpeed: "16km/h", rating: 'fair' as const },
    { time: "18:00", waveHeight: "0.9m", windSpeed: "18km/h", rating: 'fair' as const },
  ];

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
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Actualizar</span>
            </Button>
          </div>

          {/* Surf Spots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {surfSpots.map((spot, index) => (
              <SurfConditionsCard key={index} {...spot} />
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
