import React from 'react';
import { useParams } from 'react-router-dom';
import { useSurfConditions } from '@/hooks/useSurfConditions';
import { surfSpots } from '@/lib/spots';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Waves, Wind, Thermometer, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const degreesToCardinal = (deg: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
};

const SpotDetailPage = () => {
  const { spotId } = useParams<{ spotId: string }>();
  const spot = surfSpots.find(s => s.id === spotId);

  const { data: conditions, isLoading, isError, error } = useSurfConditions(spotId || '');

  if (!spot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center">
          <CardTitle className="text-2xl mb-4">Spot no encontrado</CardTitle>
          <CardContent>
            <p className="text-muted-foreground mb-4">El spot de surf que buscas no existe.</p>
            <Button asChild>
              <Link to="/">Volver al mapa</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">{spot.name}</h1>
        </div>

        <p className="text-muted-foreground flex items-center mb-6">
          <MapPin className="h-4 w-4 mr-2" />
          {spot.region}
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          </div>
        ) : isError ? (
          <Card className="p-6 text-center text-destructive">
            <CardTitle className="text-xl mb-2">Error al cargar las condiciones</CardTitle>
            <CardContent>
              <p>{error?.message || 'Ha ocurrido un error desconocido.'}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Condiciones Actuales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Waves className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Altura de Olas</p>
                    <p className="text-lg font-semibold">{conditions?.waveHeight}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Wind className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Viento</p>
                    <p className="text-lg font-semibold">{conditions?.windSpeed} ({degreesToCardinal(conditions?.windDirection || 0)})</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Thermometer className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Temperatura</p>
                    <p className="text-lg font-semibold">{conditions?.temperature}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Última actualización: {new Date(conditions?.lastUpdate || '').toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Detalles del Swell</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Waves className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Altura del Swell</p>
                    <p className="text-lg font-semibold">{conditions?.swellWaveHeight}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Wind className="h-6 w-6 text-primary" /> {/* Reusing Wind icon for direction */}
                  <div>
                    <p className="text-sm text-muted-foreground">Dirección del Swell</p>
                    <p className="text-lg font-semibold">{degreesToCardinal(conditions?.swellWaveDirection || 0)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Thermometer className="h-6 w-6 text-primary" /> {/* Reusing Thermometer icon for period */}
                  <div>
                    <p className="text-sm text-muted-foreground">Período del Swell</p>
                    <p className="text-lg font-semibold">{conditions?.swellWavePeriod}s</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Placeholder for Diagrams/Charts */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl">Diagramas y Previsiones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Aquí se mostrarán diagramas de oleaje, viento y mareas (próximamente).</p>
            {/* Chart components will go here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpotDetailPage;
