import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Wind, Waves } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface FavoriteSpot {
  id: string;
  name: string;
  region: string;
  rating: 'excellent' | 'good' | 'fair';
  waveHeight?: string;
  windSpeed?: string;
  addedAt: string;
}

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<FavoriteSpot[]>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const saved = localStorage.getItem('surf-favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    } else {
      // Demo favorites
      setFavorites([
        {
          id: '1',
          name: 'Mundaka',
          region: 'País Vasco',
          rating: 'excellent',
          waveHeight: '2.1-3.2m',
          windSpeed: '6 km/h',
          addedAt: new Date().toISOString()
        },
        {
          id: '15',
          name: 'Pantin',
          region: 'Galicia',
          rating: 'excellent',
          waveHeight: '2.0-2.8m',
          windSpeed: '5 km/h',
          addedAt: new Date().toISOString()
        }
      ]);
    }
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(fav => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem('surf-favorites', JSON.stringify(updated));
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'good':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  const getRatingText = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return 'Excelente';
      case 'good':
        return 'Bueno';
      default:
        return 'Regular';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Playas Favoritas
          </h1>
          <p className="text-muted-foreground">
            Tus spots de surf favoritos en España
          </p>
        </div>

        {favorites.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sin favoritos aún</h3>
              <p className="text-muted-foreground mb-4">
                Explora el mapa y añade tus playas favoritas
              </p>
              <Button asChild>
                <Link to="/mapa">Explorar Mapa</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {favorites.map((spot) => (
              <Card key={spot.id} className="overflow-hidden hover:shadow-wave transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{spot.name}</CardTitle>
                      <div className="flex items-center text-muted-foreground text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {spot.region}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRatingColor(spot.rating)}>
                        {getRatingText(spot.rating)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFavorite(spot.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {(spot.waveHeight || spot.windSpeed) && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {spot.waveHeight && (
                        <div className="flex items-center space-x-2">
                          <Waves className="h-4 w-4 text-primary" />
                          <div>
                            <div className="text-sm font-medium">{spot.waveHeight}</div>
                            <div className="text-xs text-muted-foreground">Altura olas</div>
                          </div>
                        </div>
                      )}
                      
                      {spot.windSpeed && (
                        <div className="flex items-center space-x-2">
                          <Wind className="h-4 w-4 text-primary" />
                          <div>
                            <div className="text-sm font-medium">{spot.windSpeed}</div>
                            <div className="text-xs text-muted-foreground">Viento</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Añadido {new Date(spot.addedAt).toLocaleDateString()}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/mapa">Ver en Mapa</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;