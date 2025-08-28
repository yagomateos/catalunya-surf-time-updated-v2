import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Bell, BellRing, Waves, Wind, TrendingUp, Star } from "lucide-react";
import { useState } from "react";
import { usePWA } from "@/hooks/usePWA";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  type: 'excellent' | 'warning' | 'info' | 'epic';
  title: string;
  message: string;
  time: string;
  location: string;
  waveHeight: string;
  period: string;
  windDirection: string;
  windSpeed: string;
  rating: number;
  swellDirection: string;
}

const SurfAlerts = () => {
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const { requestNotificationPermission } = usePWA();
  const { toast } = useToast();

  const toggleAlerts = async () => {
    if (!alertsEnabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        setAlertsEnabled(true);
        toast({
          title: "Alertas Activadas",
          description: "Recibirás notificaciones de las mejores condiciones de surf",
        });
      } else {
        toast({
          title: "Permisos Necesarios", 
          description: "Activa las notificaciones en la configuración del navegador",
          variant: "destructive"
        });
      }
    } else {
      setAlertsEnabled(false);
      toast({
        title: "Alertas Desactivadas",
        description: "Ya no recibirás notificaciones de surf",
      });
    }
  };
  
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'epic',
      title: 'Sesión Épica - Mundaka',
      message: 'Olas perfectas con marea ideal para el famoso left de Mundaka',
      time: '14:00 - 16:30',
      location: 'Mundaka',
      waveHeight: '2.5-3.5m',
      period: '14s',
      windDirection: 'SE',
      windSpeed: '12 km/h',
      rating: 9.2,
      swellDirection: 'NW'
    },
    {
      id: '2',
      type: 'excellent',
      title: 'Condiciones Premium - Pantin',
      message: 'Sede del campeonato mundial con olas consistentes',
      time: '09:00 - 12:00',
      location: 'Pantin',
      waveHeight: '2.0-2.8m',
      period: '11s',
      windDirection: 'E',
      windSpeed: '8 km/h',
      rating: 8.7,
      swellDirection: 'NW'
    },
    {
      id: '3',
      type: 'excellent',
      title: 'El Quemao Firing',
      message: 'Condiciones perfectas en la izquierda más potente de Canarias',
      time: '15:00 - 18:00',
      location: 'El Quemao',
      waveHeight: '3.0-4.0m',
      period: '16s',
      windDirection: 'NE',
      windSpeed: '15 km/h',
      rating: 9.0,
      swellDirection: 'NW'
    },
    {
      id: '4',
      type: 'excellent',
      title: 'Zarautz Perfecto',
      message: 'La reina de las playas del País Vasco en su mejor momento',
      time: '11:00 - 14:00',
      location: 'Zarautz',
      waveHeight: '1.8-2.5m',
      period: '12s',
      windDirection: 'S',
      windSpeed: '10 km/h',
      rating: 8.5,
      swellDirection: 'NW'
    },
    {
      id: '5',
      type: 'info',
      title: 'Sopelana Consistente',
      message: 'Olas regulares ideales para perfeccionar técnica',
      time: '08:00 - 11:00',
      location: 'Sopelana',
      waveHeight: '1.5-2.0m',
      period: '9s',
      windDirection: 'E',
      windSpeed: '5 km/h',
      rating: 7.2,
      swellDirection: 'NW'
    },
    {
      id: '6',
      type: 'warning',
      title: 'Tarifa Ventoso',
      message: 'Viento fuerte, mejor para windsurf que surf',
      time: '12:00 - 15:00',
      location: 'Tarifa',
      waveHeight: '1.2-1.8m',
      period: '7s',
      windDirection: 'W',
      windSpeed: '28 km/h',
      rating: 5.5,
      swellDirection: 'W'
    },
    {
      id: '7',
      type: 'info',
      title: 'Famara Training',
      message: 'Condiciones ideales para principiantes e intermedios',
      time: '10:00 - 13:00',
      location: 'Famara',
      waveHeight: '1.0-1.5m',
      period: '8s',
      windDirection: 'NE',
      windSpeed: '12 km/h',
      rating: 7.0,
      swellDirection: 'NW'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'epic':
        return <Star className="h-5 w-5 text-accent fill-accent" />;
      case 'excellent':
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'info':
        return <Bell className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'epic':
        return 'border-l-4 border-l-accent bg-gradient-to-r from-accent/10 to-accent/5 shadow-foam';
      case 'excellent':
        return 'border-l-4 border-l-primary bg-gradient-to-r from-primary/8 to-primary/3 shadow-wave';
      case 'warning':
        return 'border-l-4 border-l-destructive bg-gradient-to-r from-destructive/8 to-destructive/3';
      case 'info':
        return 'border-l-4 border-l-muted-foreground bg-gradient-to-r from-muted/80 to-muted/40';
      default:
        return 'border-l-4 border-l-muted';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return 'text-accent font-bold';
    if (rating >= 8) return 'text-primary font-semibold';
    if (rating >= 7) return 'text-secondary-foreground font-medium';
    return 'text-muted-foreground';
  };

  return (
    <Card className="p-6 shadow-deep bg-gradient-wave">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Waves className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Alertas Surf España</h2>
            <p className="text-sm text-muted-foreground">Las mejores condiciones del momento</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleAlerts}
          className="flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-wave"
        >
          {alertsEnabled ? (
            <BellRing className="h-4 w-4 text-primary" />
          ) : (
            <Bell className="h-4 w-4" />
          )}
          <span>{alertsEnabled ? 'Activadas' : 'Activar'}</span>
        </Button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-5 rounded-xl ${getAlertStyle(alert.type)} transition-wave hover:shadow-deep group`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-2 bg-background/20 rounded-lg group-hover:bg-background/30 transition-wave">
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-foreground text-base">{alert.title}</h3>
                    <div className={`text-lg font-bold ${getRatingColor(alert.rating)}`}>
                      {alert.rating}/10
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-background/50 text-foreground text-xs font-medium">
                    {alert.location}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{alert.message}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div className="flex items-center space-x-2 text-xs">
                    <Waves className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">Olas:</span>
                    <span className="font-medium text-foreground">{alert.waveHeight}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">Período:</span>
                    <span className="font-medium text-foreground">{alert.period}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs">
                    <Wind className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">Viento:</span>
                    <span className="font-medium text-foreground">{alert.windDirection} {alert.windSpeed}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="h-3 w-3 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-muted-foreground">Swell:</span>
                    <span className="font-medium text-foreground">{alert.swellDirection}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-xs text-muted-foreground font-medium">Mejor ventana: {alert.time}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Actualizado hace 5 min
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!alertsEnabled && (
        <div className="mt-6 mb-8 p-4 bg-gradient-to-r from-muted/80 to-muted/60 rounded-xl text-center border border-border/50">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">
              Alertas Desactivadas
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Activa las alertas para recibir notificaciones push de las mejores condiciones de surf
          </p>
        </div>
      )}
    </Card>
  );
};

export default SurfAlerts;