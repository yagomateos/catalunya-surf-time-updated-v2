import { surfSpots, type SurfSpot } from '@/lib/spots';

// Vite env variables declaration
interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_STORMGLASS_API_KEY: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}

interface StormglassResponse {
  hours: Array<{
    time: string;
    waveHeight: { sg: number };
    windSpeed: { sg: number };
    windDirection: { sg: number };
    airTemperature: { sg: number };
  }>;
}

export interface SurfConditions {
  waveHeight: string;
  windSpeed: string;
  windDirection: number;
  rating: 'excellent' | 'good' | 'fair';
  temperature: string;
  lastUpdate: Date;
}

export const fetchSurfConditions = async (spotId: string): Promise<SurfConditions> => {
  try {
    console.log(`[${new Date().toISOString()}] Iniciando petición para spot ${spotId}`);
    
    const spot = surfSpots.find(s => s.id === spotId);
    if (!spot) {
      console.error(`Spot no encontrado: ${spotId}`);
      throw new Error(`Spot with id ${spotId} not found`);
    }

    const params = 'waveHeight,wavePeriod,windSpeed,windDirection,airTemperature';
    const url = new URL(`${import.meta.env.VITE_API_URL}/weather/point`);
    
    // Log environment variables (sin mostrar la API key completa)
    console.log('Environment:', {
      apiUrl: import.meta.env.VITE_API_URL,
      hasApiKey: !!import.meta.env.VITE_STORMGLASS_API_KEY,
      spot: {
        name: spot.name,
        lat: spot.coordinates[1],
        lng: spot.coordinates[0]
      }
    });

    url.searchParams.append('lat', spot.coordinates[1].toString());
    url.searchParams.append('lng', spot.coordinates[0].toString());
    url.searchParams.append('params', params);

    console.log('Request URL:', url.toString());
    console.log('Request Headers:', {
      Authorization: import.meta.env.VITE_STORMGLASS_API_KEY ? 'Present' : 'Missing'
    });

    const response = await fetch(url, {
      headers: {
        'Authorization': import.meta.env.VITE_STORMGLASS_API_KEY
      }
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`API error ${response.status}: ${errorText}`);
    }
  
    const data = await response.json() as StormglassResponse;
    const currentConditions = data.hours?.[0];
    
    if (!currentConditions) {
      throw new Error('No current conditions data available');
    }

    console.log('Datos recibidos:', {
      spot: spot.name,
      time: currentConditions.time,
      waveHeight: currentConditions.waveHeight.sg,
      windSpeed: currentConditions.windSpeed.sg,
      temperature: currentConditions.airTemperature.sg
    });

    const { waveHeight, windSpeed, windDirection, airTemperature } = currentConditions;

    return {
      waveHeight: formatWaveHeight(waveHeight.sg),
      windSpeed: formatWindSpeed(windSpeed.sg),
      windDirection: windDirection.sg,
      temperature: formatTemperature(airTemperature.sg),
      rating: calculateRating(currentConditions),
      lastUpdate: new Date()
    };
  } catch (error) {
    console.error('Error fetching surf conditions:', error);
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

const formatWaveHeight = (height: number): string => 
  `${height.toFixed(1)}m`;

const formatWindSpeed = (speed: number): string => 
  `${(speed * 3.6).toFixed(1)} km/h`;

const formatTemperature = (temp: number): string => 
  `${temp.toFixed(1)}°C`;

const calculateRating = (data: StormglassResponse['hours'][0]): SurfConditions['rating'] => {
  const waveHeight = data.waveHeight.sg;
  const windSpeed = data.windSpeed.sg;

  if (waveHeight > 1.5 && windSpeed < 5) return 'excellent';
  if (waveHeight > 1.0 && windSpeed < 7) return 'good';
  return 'fair';
};

export default fetchSurfConditions;