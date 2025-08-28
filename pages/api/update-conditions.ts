import { kv } from '@vercel/kv';
import { surfSpots, type SurfSpot } from '../../src/lib/spots';

// This is the serverless function that will be executed by the cron job
export default async function (request: Request) {
  const stormglassApiKey = process.env.VITE_STORMGLASS_API_KEY; // Still need this for Stormglass, but we are using Open-Meteo now
  // Open-Meteo does not require an API key for basic usage.

  console.log(`Starting daily surf conditions update for ${surfSpots.length} spots.`);

  try {
    const fetchPromises = surfSpots.map(spot => 
      fetchSpotConditions(spot)
    );

    const results = await Promise.allSettled(fetchPromises);

    const allConditions: Record<string, any> = {};
    let successfulFetches = 0;

    results.forEach((result, index) => {
      const spotId = surfSpots[index].id;
      if (result.status === 'fulfilled') {
        allConditions[spotId] = result.value;
        successfulFetches++;
      } else {
        console.error(`Failed to fetch conditions for spot ${spotId}:`, result.reason);
        allConditions[spotId] = { error: 'Failed to fetch' };
      }
    });

    console.log(`Successfully fetched conditions for ${successfulFetches}/${surfSpots.length} spots.`);

    // Save the entire collection to Vercel KV
    await kv.set('surf-conditions-data', allConditions);

    console.log('Successfully saved all conditions to Vercel KV.');

    return new Response(JSON.stringify({ message: `Updated conditions for ${successfulFetches} spots.` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('An unexpected error occurred during the update process:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Helper function to fetch conditions for a single spot from Open-Meteo
async function fetchSpotConditions(spot: SurfSpot) {
  // Open-Meteo API endpoint for marine weather
  const url = new URL('https://marine-api.open-meteo.com/v1/marine');
  url.searchParams.append('latitude', spot.coordinates[1].toString());
  url.searchParams.append('longitude', spot.coordinates[0].toString());
  const hourlyParams = ['wave_height', 'sea_surface_temperature'];
  hourlyParams.forEach(param => url.searchParams.append('hourly', param));
  url.searchParams.append('timezone', 'auto');
  url.searchParams.append('forecast_days', '1');

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Open-Meteo API error for spot ${spot.name}: ${response.status} ${errorText}`);
    throw new Error(`API error ${response.status}`);
  }

  const data = await response.json();
  const now = new Date();
  const currentHour = now.getHours();
  const currentHourIndex = data.hourly.time.findIndex((time: string) => new Date(time).getHours() === currentHour);

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
    waveHeight: `${waveHeight.toFixed(1)}m`,
    windSpeed: `${(windSpeed * 3.6).toFixed(1)} km/h`,
    windDirection: windDirection,
    temperature: `${temperature.toFixed(1)}°C`,
    rating: calculateRating(waveHeight, windSpeed),
    lastUpdate: now,
  };
}

function calculateRating(waveHeight: number, windSpeed: number): SurfConditions['rating'] {
  if (waveHeight > 1.5) return 'excellent';
  if (waveHeight > 1.0) return 'good';
  return 'fair';
}
