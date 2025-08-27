import { Card } from "@/components/ui/card";
import { Waves, Wind } from "lucide-react";

interface HourlyData {
  time: string;
  waveHeight: string;
  windSpeed: string;
  rating: 'excellent' | 'good' | 'fair' | 'poor';
}

interface HourlyForecastProps {
  data: HourlyData[];
}

const HourlyForecast = ({ data }: HourlyForecastProps) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-primary';
      case 'good': return 'bg-secondary';
      case 'fair': return 'bg-accent';
      case 'poor': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="p-6 shadow-foam">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Previsión por Horas</h2>
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {data.map((hour, index) => (
          <div
            key={index}
            className="flex-shrink-0 text-center p-4 bg-gradient-wave rounded-lg min-w-[120px] shadow-sm"
          >
            <p className="text-sm font-medium text-foreground mb-2">{hour.time}</p>
            
            <div className={`w-4 h-4 rounded-full ${getRatingColor(hour.rating)} mx-auto mb-3`} />
            
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-1">
                <Waves className="h-3 w-3 text-primary" />
                <span className="text-xs text-muted-foreground">{hour.waveHeight}</span>
              </div>
              
              <div className="flex items-center justify-center space-x-1">
                <Wind className="h-3 w-3 text-primary" />
                <span className="text-xs text-muted-foreground">{hour.windSpeed}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HourlyForecast;