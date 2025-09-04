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
  // Cataluña
  { id: '21', name: 'Tossa de Mar', coordinates: [2.9319, 41.7194], rating: 'excellent', region: 'Cataluña' },
  { id: '22', name: 'Palamós', coordinates: [3.1294, 41.8469], rating: 'excellent', region: 'Cataluña' },
  { id: '23', name: 'Roses', coordinates: [3.1761, 42.2619], rating: 'excellent', region: 'Cataluña' },
  { id: '24', name: 'El Masnou', coordinates: [2.3180, 41.4815], rating: 'good', region: 'Cataluña', cameraUrl: 'https://maresmewaves.com/webcams/el-masnou/' },
  { id: '25', name: 'Montgat', coordinates: [2.2833, 41.4667], rating: 'good', region: 'Cataluña', cameraUrl: 'https://maresmewaves.com/webcams/el-masnou/' },
  { id: '26', name: 'Barceloneta', coordinates: [2.1883, 41.3768], rating: 'good', region: 'Cataluña', cameraUrl: 'https://www.skylinewebcams.com/es/webcam/espana/cataluna/barcelona/playa-barceloneta.html' },
  { id: '27', name: 'Castelldefels', coordinates: [1.9727, 41.2757], rating: 'good', region: 'Cataluña', cameraUrl: 'https://www.castelldefels.org/es/index.asp?id_webcam=2' },

  // País Vasco
  { id: '1', name: 'Mundaka', coordinates: [-2.6892, 43.4081], rating: 'excellent', region: 'País Vasco' },
  { id: '2', name: 'Zarautz', coordinates: [-2.1661, 43.2831], rating: 'excellent', region: 'País Vasco' },
  { id: '3', name: 'Deba', coordinates: [-2.3480, 43.2947], rating: 'excellent', region: 'País Vasco' },
  { id: '4', name: 'Sopelana', coordinates: [-2.9833, 43.3833], rating: 'good', region: 'País Vasco' },
  { id: '5', name: 'Bakio', coordinates: [-2.8167, 43.4167], rating: 'good', region: 'País Vasco' },
];