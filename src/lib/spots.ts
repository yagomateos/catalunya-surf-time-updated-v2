export interface SurfSpot {
  id: string;
  name: string;
  coordinates: [number, number];
  rating: 'excellent' | 'good' | 'fair';
  region: string;
  waveHeight?: string;
  windSpeed?: string;
  cameraUrl?: string;
}

export const surfSpots: SurfSpot[] = [
  // Hawaii
  { id: '41', name: 'Banzai Pipeline', coordinates: [-157.947, 21.664], rating: 'excellent', region: 'Hawaii', cameraUrl: 'https://www.youtube.com/embed/Qh_9_g_9_t_c' },
];
