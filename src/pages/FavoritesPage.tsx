import { useFavorites } from "@/context/FavoritesContext";
import { surfSpots } from "@/lib/spots";
import SurfConditionsWrapper from "@/components/SurfConditionsWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  const favoriteSpots = surfSpots.filter((spot) => favorites.includes(spot.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Playas Favoritas
          </h1>
          <p className="text-muted-foreground">
            Tus spots de surf guardados.
          </p>
        </div>

        {favoriteSpots.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sin favoritos aún</h3>
              <p className="text-muted-foreground mb-4">
                Explora el mapa y añade tus playas favoritas.
              </p>
              <Button asChild>
                <Link to="/mapa">Explorar Mapa</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favoriteSpots.map((spot) => (
              <SurfConditionsWrapper key={spot.id} spot={spot} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
