import { useState, useEffect, useCallback } from "react";
// import { getWebcamsBBox } from "@/services/windy"; // Eliminar esta importación
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw } from "lucide-react";

interface Webcam {
  id: string; // Añadir ID para la clave
  name: string;
  embedUrl: string; // Cambiar a embedUrl
  type: "iframe" | "image"; // Añadir tipo para renderizado
  location?: { // Hacer opcional
    city: string;
    latitude?: number;
    longitude?: number;
  };
}

// Definir cámaras estáticas de ejemplo
const STATIC_WEBCAMS: Webcam[] = [
  {
    id: "1",
    name: "Laredo", // Cambiado a Laredo
    embedUrl: "https://www.youtube.com/embed/xdi4_E5zCKg?si=N_0EvQl1O68GFtqs",
    type: "iframe",
    location: { city: "Laredo" }, // Cambiado a Laredo
  },
  {
    id: "2",
    name: "Muizenberg", // Nueva cámara
    embedUrl: "https://www.youtube.com/embed/wGY7hBIMVzU?si=WJsIj5AzD_peMK_H",
    type: "iframe",
    location: { city: "Muizenberg" },
  },
];

const CamsPage = () => {
  const [selectedRegion, setSelectedRegion] = useState<"catalunya" | "paisVasco">("catalunya");
  const [webcams, setWebcams] = useState<Webcam[]>([]);
  const [loading, setLoading] = useState(false); // Mantener loading para simular carga inicial
  const [error, setError] = useState<string | null>(null);

  // No necesitamos offset ni hasMore para cámaras estáticas
  // const [offset, setOffset] = useState(0);
  // const [hasMore = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Simular una carga asíncrona
    const timer = setTimeout(() => {
      // Filtrar cámaras por región si es necesario, o mostrar todas
      // Por ahora, mostramos todas las estáticas
      setWebcams(STATIC_WEBCAMS);
      setLoading(false);
    }, 500); // Simular 0.5 segundos de carga

    return () => clearTimeout(timer);
  }, [selectedRegion]); // selectedRegion podría usarse para filtrar STATIC_WEBCAMS si se categorizan por región

  // No necesitamos handleLoadMore ni handleRetry para cámaras estáticas
  // const handleLoadMore = () => { ... };
  // const handleRetry = () => { ... };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Cámaras de Surf</h1>

      <div className="mb-6 flex justify-center">
        <ToggleGroup
          type="single"
          value={selectedRegion}
          onValueChange={(value: "catalunya" | "paisVasco") => {
            if (value) setSelectedRegion(value);
          }}
          className="bg-card rounded-lg p-1 shadow-sm"
        >
          <ToggleGroupItem value="catalunya" aria-label="Toggle Cataluña">
            Cataluña
          </ToggleGroupItem>
          <ToggleGroupItem value="paisVasco" aria-label="Toggle País Vasco">
            País Vasco
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {error && (
        <div className="text-center text-red-500 mb-4">
          <p>{error}</p>
          {/* <Button onClick={handleRetry} className="mt-2"> // Eliminar botón de reintentar
            <RefreshCw className="mr-2 h-4 w-4" /> Reintentar
          </Button> */}
        </div>
      )}

      {loading && webcams.length === 0 && (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">Cargando cámaras...</p>
        </div>
      )}

      {!loading && webcams.length === 0 && !error && (
        <div className="text-center text-muted-foreground h-48 flex items-center justify-center">
          <p>No hay cámaras disponibles en esta región.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {webcams.map((webcam) => ( // Eliminar index
          <Card key={webcam.id} className="overflow-hidden rounded-lg shadow-lg"> {/* Usar webcam.id */}
            <CardHeader>
              <CardTitle className="text-lg">{webcam.name}</CardTitle> {/* Usar webcam.name */}
            </CardHeader>
            <CardContent>
              <div
                className="relative w-full"
                style={{ paddingTop: "56.25%" }} // 16:9 aspect ratio
              >
                {webcam.type === "iframe" ? (
                  <iframe
                    src={webcam.embedUrl}
                    title={`Webcam de ${webcam.name}`}
                    className="absolute top-0 left-0 w-full h-full rounded-md"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={webcam.embedUrl}
                    alt={`Webcam de ${webcam.name}`}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
              {webcam.location && webcam.location.city && (
                <p className="text-sm text-muted-foreground mt-2">
                  Ciudad: {webcam.location.city}
                  {webcam.location.latitude && webcam.location.longitude && (
                    `, Lat: ${webcam.location.latitude.toFixed(2)}, Lon: ${webcam.location.longitude.toFixed(2)}`
                  )}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Eliminar botón de cargar más */}
      {/* {hasMore && !loading && webcams.length > 0 && (
        <div className="text-center mt-8">
          <Button onClick={handleLoadMore}>
            <Loader2 className={loading ? "mr-2 h-4 w-4 animate-spin" : "mr-2 h-4 w-4 hidden"} />
            Cargar más
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default CamsPage;
