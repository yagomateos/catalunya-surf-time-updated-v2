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
  region: "all" | "europe" | "africa" | "northAmerica" | "southAmerica" | "asia" | "oceania"; // Añadir propiedad de región
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
    name: "Muizemberg, Sudáfrica",
    embedUrl: "https://www.youtube.com/embed/wGY7hBIMVzU?si=pNz2F8oOgb6AeRkl",
    type: "iframe",
    region: "africa", // Corregido a southAmerica
    location: { city: "Muizemberg" },
  },
  {
    id: "5", // Nuevo ID
    name: "Cantabria", // Nuevo nombre
    embedUrl: "https://www.youtube.com/embed/xdi4_E5zCKg?si=8Vjj02dBnzqCyyTa",
    type: "iframe",
    region: "europe", // Asumiendo que Cantabria está en Europa
    location: { city: "Cantabria" },
  },
  {
    id: "3",
    name: "Jeffreys Bay, Sudáfrica",
    embedUrl: "https://www.youtube.com/embed/L5IQu7C3kRE?si=ZSKQo8aj4wwar62s",
    type: "iframe",
    region: "africa", // Corregido a africa
    location: { city: "Jeffreys Bay" }, // Corregido a Jeffreys Bay
  },
  {
    id: "4",
    name: "Deal, Nueva Jersey, USA",
    embedUrl: "https://www.youtube.com/embed/WLgPW0-dtp0?si=c_bVCI34QVdoJkMq",
    type: "iframe",
    region: "northAmerica", // Corregido a northAmerica
    location: { city: "Deal" },
  },
  {
    id: "2",
    name: "Scarborough Beach, England",
    embedUrl: "https://www.youtube.com/embed/AOl6WhaQJJI?si=oYrLGr3bg0Zy4ZWA",
    type: "iframe",
    region: "europe", // Corregido a northAmerica
    location: { city: "Scarborough" },
  },
  {
    id: "6",
    name: "Waikiki Aquarium South Shore, Hawái, USA",
    embedUrl: "https://www.youtube.com/embed/6tHEWDnxj2Y?si=z2fAww7T_cmVUrAJ",
    type: "iframe",
    region: "oceania",
    location: { city: "Waikiki" },
  },
  
];

const CamsPage = () => {
  const [selectedRegion, setSelectedRegion] = useState<"all" | "europe" | "africa" | "northAmerica" | "southAmerica" | "asia" | "oceania">("all"); // Cambiar estado inicial y tipos
  const [webcams, setWebcams] = useState<Webcam[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"cams" | "championships">("cams"); // Nuevo estado para el modo de vista

  useEffect(() => {
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      if (viewMode === "cams") {
        let filteredCams = STATIC_WEBCAMS;
        if (selectedRegion !== "all") {
          filteredCams = STATIC_WEBCAMS.filter(cam => cam.region === selectedRegion);
        }
        setWebcams(filteredCams);
      } else {
        setWebcams([]); // No mostrar cámaras si estamos en modo campeonatos
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedRegion, viewMode]); // Añadir viewMode a las dependencias

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">En directo</h1>

      <div className="mb-6 flex justify-center mb-12">
        <ToggleGroup
          type="single"
          value={viewMode} // Controlar el modo de vista
          onValueChange={(value: "cams" | "championships") => {
            if (value) setViewMode(value);
          }}
          className="bg-card rounded-lg p-1 shadow-sm"
        >
          <ToggleGroupItem value="cams" aria-label="Toggle Cámaras de Surf">
            Cámaras de Surf
          </ToggleGroupItem>
          <ToggleGroupItem value="championships" aria-label="Toggle Campeonatos Live">
            Campeonatos Live
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {viewMode === "cams" && (
        <> 
          <div className="mb-6 flex justify-center flex-wrap gap-x-2 gap-y-2"> {/* Añadir flex-wrap, gap-x-2, gap-y-2 */} 
            <ToggleGroup
              type="single"
              value={selectedRegion}
              onValueChange={(value: "all" | "europe" | "africa" | "northAmerica" | "southAmerica" | "asia" | "oceania") => {
                if (value) setSelectedRegion(value);
              }}
              className="bg-card rounded-lg p-1 shadow-sm flex-wrap"
            >
              <ToggleGroupItem value="all" aria-label="Toggle Todas">
                Todas
              </ToggleGroupItem>
              <ToggleGroupItem value="europe" aria-label="Toggle Europa">
                Europa
              </ToggleGroupItem>
              <ToggleGroupItem value="africa" aria-label="Toggle África">
                África
              </ToggleGroupItem>
              <ToggleGroupItem value="northAmerica" aria-label="Toggle América del Norte">
                América del Norte
              </ToggleGroupItem>
              <ToggleGroupItem value="southAmerica" aria-label="Toggle América del Sur">
                América del Sur
              </ToggleGroupItem>
              <ToggleGroupItem value="asia" aria-label="Toggle Asia">
                Asia
              </ToggleGroupItem>
              <ToggleGroupItem value="oceania" aria-label="Toggle Oceanía">
                Oceanía
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
        </>
      )}

      {viewMode === "championships" && (
        <div className="flex justify-center items-center h-96">
          <iframe
            width="800"
            height="450"
            src="https://www.youtube.com/embed/1gOxJkOZCKM?si=Aal3R0fLkZaaYvBY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default CamsPage;
