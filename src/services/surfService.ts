import { surfSpots, type SurfSpot } from '@/lib/spots';

export interface SurfConditions {
  waveHeight: string;
  windSpeed: string;
  windDirection: number;
  rating: 'excellent' | 'good' | 'fair';
  temperature: string;
  lastUpdate: Date;
}

// Helper function to format wave height
const formatWaveHeight = (height: number): string => 
  `${height.toFixed(1)}m`;

// Helper function to format wind speed
const formatWindSpeed = (speed: number): string => 
  `${(speed * 3.6).toFixed(1)} km/h`;

// Helper function to format temperature
const formatTemperature = (temp: number): string => 
  `${temp.toFixed(1)}°C`;

// Helper function to calculate rating (simplified for Open-Meteo data)
const calculateRating = (waveHeight: number, windSpeed: number): SurfConditions['rating'] => {
  if (waveHeight > 1.5) return 'excellent';
  if (waveHeight > 1.0) return 'good';
  return 'fair';
};

export const fetchSurfConditions = async (spotId: string): Promise<SurfConditions> => {
  try {
    console.log(`[${new Date().toISOString()}] Iniciando petición para spot ${spotId} con Open-Meteo`);
    
    const spot = surfSpots.find(s => s.id === spotId);
    if (!spot) {
      console.error(`Spot no encontrado: ${spotId}`);
      throw new Error(`Spot with id ${spotId} not found`);
    }

    // Open-Meteo API endpoint for marine weather
    const url = new URL('https://marine-api.open-meteo.com/v1/marine');
    url.searchParams.append('latitude', spot.coordinates[1].toString());
    url.searchParams.append('longitude', spot.coordinates[0].toString());
    const hourlyParams = ['wave_height', 'sea_surface_temperature'];
    hourlyParams.forEach(param => url.searchParams.append('hourly', param));
    url.searchParams.append('timezone', 'auto');
    url.searchParams.append('forecast_days', '1');

    console.log('Request URL (Open-Meteo):', url.toString());

    const response = await fetch(url);

    console.log('Response status (Open-Meteo):', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Details (Open-Meteo):', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`API error ${response.status}: ${errorText}`);
    }
  
    const data = await response.json();
    const currentHourIndex = data.hourly.time.findIndex((time: string) => new Date(time).getHours() === new Date().getHours());

    if (currentHourIndex === -1 ||
        !data.hourly.wave_height || data.hourly.wave_height[currentHourIndex] === undefined ||
        !data.hourly.sea_surface_temperature || data.hourly.sea_surface_temperature[currentHourIndex] === undefined
    ) {
      throw new Error('No current conditions data available for this hour from Open-Meteo');
    }

    const waveHeight = data.hourly.wave_height[currentHourIndex];
    const temperature = data.hourly.sea_surface_temperature[currentHourIndex];

    // Placeholder values for wind, as we are not requesting them currently
    const windSpeed = 0;
    const windDirection = 0;

    return {
      waveHeight: formatWaveHeight(waveHeight),
      windSpeed: formatWindSpeed(windSpeed),
      windDirection: windDirection,
      temperature: formatTemperature(temperature),
      rating: calculateRating(waveHeight, windSpeed),
      lastUpdate: new Date()
    };
  } catch (error) {
    console.error('Error fetching surf conditions (Open-Meteo):', error);
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

export default fetchSurfConditions;
