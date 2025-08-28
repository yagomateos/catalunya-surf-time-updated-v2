import { surfSpots, type SurfSpot } from '@/lib/spots';

export interface HourlyForecastData {
  time: string;
  waveHeight: number;
  windSpeed: number;
  windDirection: number;
  swellWaveHeight: number;
  swellWaveDirection: number;
  swellWavePeriod: number;
}

export interface SurfConditions {
  waveHeight: string;
  swellWaveHeight: string;
  swellWaveDirection: number;
  swellWavePeriod: number;
  windSpeed: string;
  windDirection: number;
  rating: 'excellent' | 'good' | 'fair';
  temperature: string; // Sea temperature
  sunrise: string; // New
  sunset: string; // New
  lastUpdate: Date;
  hourlyForecast: HourlyForecastData[]; // New field for hourly forecast
}

// Helper function to format wave height
const formatWaveHeight = (height: number): string => 
  `${height.toFixed(1)}m`;

// Helper function to format wind speed
const formatWindSpeed = (speed: number): string => 
  `${speed.toFixed(1)} km/h`;

// Helper function to format temperature
const formatTemperature = (temp: number): string => 
  `${temp.toFixed(1)}°C`;

// Helper function to calculate rating (simplified for Open-Meteo data)
const calculateRating = (waveHeight: number, windSpeed: number): SurfConditions['rating'] => {
  if (waveHeight > 1.5) return 'excellent';
  if (waveHeight > 1.0) return 'good';
  return 'fair';
};

const fetchWindData = async (latitude: number, longitude: number) => {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.append('latitude', latitude.toString());
  url.searchParams.append('longitude', longitude.toString());
  const hourlyParams = ['wind_speed_10m', 'wind_direction_10m'];
  hourlyParams.forEach(param => url.searchParams.append('hourly', param));
  const dailyParams = ['sunrise', 'sunset'];
  dailyParams.forEach(param => url.searchParams.append('daily', param));
  url.searchParams.append('timezone', 'auto');
  url.searchParams.append('forecast_days', '3'); // Fetch 3 days of data

  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error (wind) ${response.status}: ${errorText}`);
  }
  return response.json();
}

export const fetchSurfConditions = async (spotId: string): Promise<SurfConditions> => {
  try {
    console.log(`[${new Date().toISOString()}] Iniciando petición para spot ${spotId} con Open-Meteo`);
    
    const spot = surfSpots.find(s => s.id === spotId);
    if (!spot) {
      console.error(`Spot no encontrado: ${spotId}`);
      throw new Error(`Spot with id ${spotId} not found`);
    }

    // Open-Meteo API endpoint for marine weather
    const marineUrl = new URL('https://marine-api.open-meteo.com/v1/marine');
    marineUrl.searchParams.append('latitude', spot.coordinates[1].toString());
    marineUrl.searchParams.append('longitude', spot.coordinates[0].toString());
    const marineHourlyParams = ['wave_height', 'sea_surface_temperature', 'swell_wave_height', 'swell_wave_direction', 'swell_wave_period'];
    marineHourlyParams.forEach(param => marineUrl.searchParams.append('hourly', param));
    marineUrl.searchParams.append('timezone', 'auto');
    marineUrl.searchParams.append('forecast_days', '3'); // Fetch 3 days of data

    const [marineResponse, weatherData] = await Promise.all([
      fetch(marineUrl),
      fetchWindData(spot.coordinates[1], spot.coordinates[0])
    ]);

    if (!marineResponse.ok) {
      const errorText = await marineResponse.text();
      throw new Error(`API error (marine) ${marineResponse.status}: ${errorText}`);
    }
  
    const marineData = await marineResponse.json();
    const currentHourIndex = marineData.hourly.time.findIndex((time: string) => new Date(time).getHours() === new Date().getHours());

    // Prepare hourly forecast data
    const hourlyForecast: HourlyForecastData[] = marineData.hourly.time.map((time: string, index: number) => ({
      time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      waveHeight: marineData.hourly.wave_height[index],
      windSpeed: weatherData.hourly.wind_speed_10m[index],
      windDirection: weatherData.hourly.wind_direction_10m[index],
      swellWaveHeight: marineData.hourly.swell_wave_height[index],
      swellWaveDirection: marineData.hourly.swell_wave_direction[index],
      swellWavePeriod: marineData.hourly.swell_wave_period[index],
    }));

    if (currentHourIndex === -1 ||
        !marineData.hourly.wave_height || marineData.hourly.wave_height[currentHourIndex] === undefined ||
        !marineData.hourly.sea_surface_temperature || marineData.hourly.sea_surface_temperature[currentHourIndex] === undefined ||
        !marineData.hourly.swell_wave_height || marineData.hourly.swell_wave_height[currentHourIndex] === undefined ||
        !marineData.hourly.swell_wave_direction || marineData.hourly.swell_wave_direction[currentHourIndex] === undefined ||
        !marineData.hourly.swell_wave_period || marineData.hourly.swell_wave_period[currentHourIndex] === undefined ||
        !weatherData.hourly.wind_speed_10m || weatherData.hourly.wind_speed_10m[currentHourIndex] === undefined ||
        !weatherData.hourly.wind_direction_10m || weatherData.hourly.wind_direction_10m[currentHourIndex] === undefined ||
        !weatherData.daily.sunrise || weatherData.daily.sunrise[0] === undefined ||
        !weatherData.daily.sunset || weatherData.daily.sunset[0] === undefined
    ) {
      throw new Error('No current conditions data available for this hour from Open-Meteo');
    }

    const waveHeight = marineData.hourly.wave_height[currentHourIndex];
    const temperature = marineData.hourly.sea_surface_temperature[currentHourIndex];
    const windSpeed = weatherData.hourly.wind_speed_10m[currentHourIndex];
    const windDirection = weatherData.hourly.wind_direction_10m[currentHourIndex];
    const swellWaveHeight = marineData.hourly.swell_wave_height[currentHourIndex];
    const swellWaveDirection = marineData.hourly.swell_wave_direction[currentHourIndex];
    const swellWavePeriod = marineData.hourly.swell_wave_period[currentHourIndex];
    const sunrise = weatherData.daily.sunrise[0];
    const sunset = weatherData.daily.sunset[0];

    return {
      waveHeight: formatWaveHeight(waveHeight),
      swellWaveHeight: formatWaveHeight(swellWaveHeight),
      swellWaveDirection: swellWaveDirection,
      swellWavePeriod: swellWavePeriod,
      windSpeed: formatWindSpeed(windSpeed),
      windDirection: windDirection,
      temperature: formatTemperature(temperature),
      sunrise: new Date(sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sunset: new Date(sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rating: calculateRating(waveHeight, windSpeed),
      lastUpdate: new Date(),
      hourlyForecast: hourlyForecast,
    };
  } catch (error) {
    console.error('Error fetching surf conditions (Open-Meteo):', error);
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

export default fetchSurfConditions;
