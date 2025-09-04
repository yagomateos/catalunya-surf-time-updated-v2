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
  region: "all" | "spain" | "southAfrica"; // Añadir propiedad de región
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
    name: "Laredo",
    embedUrl: "https://www.youtube.com/embed/xdi4_E5zCKg?si=N_0EvQl1O68GFtqs",
    type: "iframe",
    region: "spain", // Asignar región
    location: { city: "Laredo" },
  },
  {
    id: "2",
    name: "Muizenberg",
    embedUrl: "https://www.youtube.com/embed/wGY7hBIMVzU?si=WJsIj5AzD_peMK_H",
    type: "iframe",
    region: "southAfrica", // Asignar región
    location: { city: "Muizenberg" },
  },
  {
    id: "3",
    name: "Playa de Las Canteras, Las Palmas de Gran Canaria",
    embedUrl: "https://www.youtube.com/embed/L5IQu7C3kRE?si=ZSKQo8aj4wwar62s",
    type: "iframe",
    region: "spain", // Asignar región
    location: { city: "Las Palmas de Gran Canaria" },
  },
  {
    id: "4",
    name: "Steamer Lane, California",
    embedUrl: "https://www.youtube.com/embed/bNLy-XXYxcw?si=-FeYf_NG2Gz-yjCB",
    type: "iframe",
    region: "all", // Asignar región (o una nueva si se quiere)
    location: { city: "Santa Cruz, California" },
  },
];

const CamsPage = () => {
  const [selectedRegion, setSelectedRegion] = useState<"all" | "spain" | "southAfrica">("all"); // Cambiar estado inicial y tipos
  const [webcams, setWebcams] = useState<Webcam[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      let filteredCams = STATIC_WEBCAMS;
      if (selectedRegion !== "all") {
        filteredCams = STATIC_WEBCAMS.filter(cam => cam.region === selectedRegion);
      }
      setWebcams(filteredCams);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedRegion]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Cámaras de Surf</h1>

      <div className="mb-6 flex justify-center">
        <ToggleGroup
          type="single"
          value={selectedRegion}
          onValueChange={(value: "all" | "spain" | "southAfrica") => {
            if (value) setSelectedRegion(value);
          }}
          className="bg-card rounded-lg p-1 shadow-sm"
        >
          <ToggleGroupItem value="all" aria-label="Toggle Todas">
            Todas
          </ToggleGroupItem>
          <ToggleGroupItem value="spain" aria-label="Toggle España">
            España
          </ToggleGroupItem>
          <ToggleGroupItem value="southAfrica" aria-label="Toggle Sudáfrica">
            Sudáfrica
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {error && (
        <div className="text-center text-red-500 mb-4">
          <p>{error}</p>
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
        {webcams.map((webcam) => (
          <Card key={webcam.id} className="overflow-hidden rounded-lg shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">{webcam.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="relative w-full"
                style={{ paddingTop: "56.25%" }}
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
    </div>
  );
};

export default CamsPage;
