import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Waves, Wind, Thermometer, Eye } from "lucide-react";

interface SurfConditionsCardProps {
  location: string;
  waveHeight: string;
  waveDirection: string;
  windSpeed: string;
  windDirection: string;
  temperature: string;
  visibility: string;
  rating: 'excellent' | 'good' | 'fair' | 'poor';
}

const SurfConditionsCard = ({
  location,
  waveHeight,
  waveDirection,
  windSpeed,
  windDirection,
  temperature,
  visibility,
  rating
}: SurfConditionsCardProps) => {
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

  return (
    <Card className="p-6 shadow-wave hover:shadow-deep transition-wave bg-gradient-to-br from-card to-secondary/20">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-foreground">{location}</h3>
        <Badge className={`${getRatingColor(rating)} px-3 py-1 font-medium`}>
          {getRatingText(rating)}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Waves className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Olas</p>
            <p className="font-medium">{waveHeight} ({waveDirection})</p>
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
            <p className="text-sm text-muted-foreground">Temperatura</p>
            <p className="font-medium">{temperature}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Visibilidad</p>
            <p className="font-medium">{visibility}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SurfConditionsCard;