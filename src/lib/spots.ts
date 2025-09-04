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
  // Cataluña
  { id: '21', name: 'Tossa de Mar', coordinates: [2.9319, 41.7194], rating: 'excellent', region: 'Cataluña' },
  { id: '22', name: 'Palamós', coordinates: [3.1294, 41.8469], rating: 'excellent', region: 'Cataluña' },
  { id: '23', name: 'Roses', coordinates: [3.1761, 42.2619], rating: 'excellent', region: 'Cataluña' },
  { id: '24', name: 'El Masnou', coordinates: [2.3180, 41.4815], rating: 'good', region: 'Cataluña' },
  { id: '25', name: 'Montgat', coordinates: [2.2833, 41.4667], rating: 'good', region: 'Cataluña' },
  { id: '26', name: 'Barceloneta', coordinates: [2.1883, 41.3768], rating: 'good', region: 'Cataluña' },
  { id: '27', name: 'Castelldefels', coordinates: [1.9727, 41.2757], rating: 'good', region: 'Cataluña' },

  // País Vasco
  { id: '1', name: 'Mundaka', coordinates: [-2.6892, 43.4081], rating: 'excellent', region: 'País Vasco' },
  { id: '2', name: 'Zarautz', coordinates: [-2.1661, 43.2831], rating: 'excellent', region: 'País Vasco' },
  { id: '3', name: 'Deba', coordinates: [-2.3480, 43.2947], rating: 'excellent', region: 'País Vasco' },
  { id: '4', name: 'Sopelana', coordinates: [-2.9833, 43.3833], rating: 'good', region: 'País Vasco' },
  { id: '5', name: 'Bakio', coordinates: [-2.8167, 43.4167], rating: 'good', region: 'País Vasco' },

  // Canarias
  { id: '31', name: 'Las Canteras', coordinates: [-15.4500, 28.1500], rating: 'good', region: 'Gran Canaria' },
  { id: '32', name: 'El Confital', coordinates: [-15.4333, 28.1667], rating: 'excellent', region: 'Gran Canaria' },
  { id: '33', name: 'Famara, Lanzarote', coordinates: [-13.5415, 29.1221], rating: 'excellent', region: 'Lanzarote' },
  { id: '34', name: 'Las Américas', coordinates: [-16.7250, 28.0583], rating: 'good', region: 'Tenerife' },

  // Cantabria
  { id: '6', name: 'Somo', coordinates: [-3.7423, 43.4569], rating: 'good', region: 'Cantabria' },
  { id: '7', name: 'Los Locos', coordinates: [-4.0475, 43.4386], rating: 'good', region: 'Cantabria' },

  // Asturias
  { id: '8', name: 'Rodiles', coordinates: [-5.3786, 43.5339], rating: 'excellent', region: 'Asturias' },
  { id: '9', name: 'Salinas', coordinates: [-5.9622, 43.5777], rating: 'good', region: 'Asturias' },

  // Galicia
  { id: '10', name: 'Pantín', coordinates: [-8.1120, 43.6395], rating: 'excellent', region: 'Galicia' },

  // Andalucía
  { id: '11', name: 'El Palmar', coordinates: [-6.0664, 36.2257], rating: 'good', region: 'Andalucía' },
];