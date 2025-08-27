export interface SurfSpot {
  id: string;
  name: string;
  coordinates: [number, number];
  rating: 'excellent' | 'good' | 'fair';
  region: string;
  waveHeight?: string;
  windSpeed?: string;
}

export const surfSpots: SurfSpot[] = [
  // País Vasco
  { id: '1', name: 'Mundaka', coordinates: [-2.6892, 43.4081], rating: 'excellent', region: 'País Vasco' },
  { id: '2', name: 'Zarautz', coordinates: [-2.1661, 43.2831], rating: 'excellent', region: 'País Vasco' },
  { id: '3', name: 'Deba', coordinates: [-2.3480, 43.2947], rating: 'excellent', region: 'País Vasco' },
  { id: '4', name: 'Sopelana', coordinates: [-2.9833, 43.3833], rating: 'good', region: 'País Vasco' },
  { id: '5', name: 'Bakio', coordinates: [-2.8167, 43.4167], rating: 'good', region: 'País Vasco' },
  
  // Cataluña
  { id: '21', name: 'Tossa de Mar', coordinates: [2.9319, 41.7194], rating: 'excellent', region: 'Cataluña' },
  { id: '22', name: 'Palamós', coordinates: [3.1294, 41.8469], rating: 'excellent', region: 'Cataluña' },
  { id: '23', name: 'Roses', coordinates: [3.1761, 42.2619], rating: 'excellent', region: 'Cataluña' },

  // Canarias
  { id: '31', name: 'Las Canteras, Gran Canaria', coordinates: [-15.4500, 28.1500], rating: 'good', region: 'Gran Canaria' },
  { id: '32', name: 'El Confital, Gran Canaria', coordinates: [-15.4333, 28.1667], rating: 'excellent', region: 'Gran Canaria' },
];