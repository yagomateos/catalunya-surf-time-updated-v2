import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Waves, Wind, Thermometer, Heart, Sunrise, Sunset } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { Button } from "./ui/button";
import { Link } from "react-router-dom"; // Re-add Link

interface SurfConditionsCardProps {
  spotId: string;
  location: string;
  waveHeight: string;
  waveDirection: string;
  swellWaveHeight: string;
  swellWaveDirection: string;
  swellWavePeriod: string;
  windSpeed: string;
  windDirection: string;
  temperature: string; // Sea temperature
  sunrise: string; // New
  sunset: string; // New
  rating: 'excellent' | 'good' | 'fair' | 'poor';
}

const SurfConditionsCard = ({
  spotId,
  location,
  waveHeight,
  waveDirection,
  swellWaveHeight,
  swellWaveDirection,
  swellWavePeriod,
  windSpeed,
  windDirection,
  temperature,
  sunrise,
  sunset,
  rating
}: SurfConditionsCardProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-gradient-ocean text-primary-foreground';
      case 'good': return 'bg-secondary text-secondary-foreground';
      case 'fair': return 'bg-accent text-accent-foreground';
      case 'poor': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRatingText = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Bueno';
      case 'fair': return 'Regular';
      case 'poor': return 'Malo';
      default: return 'Sin datos';
    }
  };

  const getWaveHeightVisualTranslation = (height: string) => {
    const h = parseFloat(height);
    if (isNaN(h)) return "";
    if (h < 0.3) return "Ankle to knee";
    if (h < 0.6) return "Knee to waist";
    if (h < 0.9) return "Waist to chest";
    if (h < 1.5) return "Chest to head";
    if (h < 2.0) return "Head high";
    return "Overhead";
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering
    e.preventDefault(); // Prevent default link behavior
    if (isFavorite(spotId)) {
      removeFavorite(spotId);
    } else {
      addFavorite(spotId);
    }
    (e.currentTarget as HTMLElement).blur();
  };

  return (
    <Link to={`/spot/${spotId}`} className="block"> {/* Re-add Link wrapper */}
      <Card className="p-6 shadow-wave hover:shadow-deep transition-wave bg-gradient-to-br from-card to-secondary/20">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-foreground">{location}</h3>
          <div className="flex items-center space-x-2">
            <Badge className={`${getRatingColor(rating)} px-3 py-1 font-medium`}>
              {getRatingText(rating)}
            </Badge>
            <Button variant="ghost" size="icon" onClick={handleFavoriteClick} className="h-8 w-8">
              <Heart className={`h-5 w-5 ${isFavorite(spotId) ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Waves className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Olas</p>
              <p className="font-medium">{waveHeight} ({getWaveHeightVisualTranslation(waveHeight)})</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Waves className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Swell</p>
              <p className="font-medium">{swellWaveHeight} {swellWavePeriod}s ({swellWaveDirection})</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Viento</p>
              <p className="font-medium">{windSpeed} ({windDirection})</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Temp. Mar</p>
              <p className="font-medium">{temperature}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Sunrise className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Amanecer</p>
              <p className="font-medium">{sunrise}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Sunset className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Atardecer</p>
              <p className="font-medium">{sunset}</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default SurfConditionsCard;