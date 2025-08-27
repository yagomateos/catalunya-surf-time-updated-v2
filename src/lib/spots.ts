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
  { id: '1', name: 'Mundaka', coordinates: [-2.6892, 43.4081], rating: 'excellent', region: 'País Vasco', waveHeight: '2.1-3.2m', windSpeed: '6 km/h' },
  { id: '2', name: 'Zarautz', coordinates: [-2.1661, 43.2831], rating: 'excellent', region: 'País Vasco', waveHeight: '1.8-2.4m', windSpeed: '8 km/h' },
  { id: '3', name: 'Deba', coordinates: [-2.3480, 43.2947], rating: 'excellent', region: 'País Vasco', waveHeight: '1.9-2.6m', windSpeed: '9 km/h' },
  { id: '4', name: 'Sopelana', coordinates: [-2.9833, 43.3833], rating: 'good', region: 'País Vasco' },
  { id: '5', name: 'Bakio', coordinates: [-2.8167, 43.4167], rating: 'good', region: 'País Vasco' },
  
  // Cantabria
  { id: '6', name: 'Somo', coordinates: [-3.9167, 43.4667], rating: 'excellent', region: 'Cantabria', waveHeight: '1.6-2.2m', windSpeed: '11 km/h' },
  { id: '7', name: 'Oyambre', coordinates: [-4.3833, 43.4333], rating: 'excellent', region: 'Cantabria', waveHeight: '1.8-2.5m', windSpeed: '7 km/h' },
  { id: '8', name: 'Langre', coordinates: [-3.8833, 43.4500], rating: 'good', region: 'Cantabria' },
  { id: '9', name: 'Liencres', coordinates: [-3.9667, 43.4500], rating: 'good', region: 'Cantabria' },
  
  // Asturias
  { id: '10', name: 'Rodiles', coordinates: [-5.3667, 43.5333], rating: 'excellent', region: 'Asturias', waveHeight: '1.7-2.4m', windSpeed: '8 km/h' },
  { id: '11', name: 'Tapia de Casariego', coordinates: [-6.9500, 43.5667], rating: 'excellent', region: 'Asturias', waveHeight: '1.9-2.7m', windSpeed: '6 km/h' },
  { id: '12', name: 'Luarca', coordinates: [-6.5333, 43.5417], rating: 'excellent', region: 'Asturias', waveHeight: '1.6-2.3m', windSpeed: '9 km/h' },
  { id: '13', name: 'Salinas', coordinates: [-6.1333, 43.5667], rating: 'good', region: 'Asturias' },
  { id: '14', name: 'Gijón', coordinates: [-5.6611, 43.5322], rating: 'fair', region: 'Asturias' },
  
  // Galicia
  { id: '15', name: 'Pantin', coordinates: [-7.8833, 43.6167], rating: 'excellent', region: 'Galicia', waveHeight: '2.0-2.8m', windSpeed: '5 km/h' },
  { id: '16', name: 'Razo', coordinates: [-8.6000, 43.2833], rating: 'excellent', region: 'Galicia', waveHeight: '1.8-2.5m', windSpeed: '7 km/h' },
  { id: '17', name: 'Baldaio', coordinates: [-8.6167, 43.2167], rating: 'excellent', region: 'Galicia', waveHeight: '1.7-2.4m', windSpeed: '8 km/h' },
  { id: '18', name: 'Doniños', coordinates: [-8.2833, 43.3667], rating: 'excellent', region: 'Galicia', waveHeight: '1.9-2.6m', windSpeed: '6 km/h' },
  { id: '19', name: 'Barrañán', coordinates: [-8.6500, 43.2500], rating: 'good', region: 'Galicia' },
  { id: '20', name: 'Ézaro', coordinates: [-9.1167, 42.9000], rating: 'good', region: 'Galicia' },
  
  // Cataluña
  { id: '21', name: 'Tossa de Mar', coordinates: [2.9319, 41.7194], rating: 'excellent', region: 'Cataluña', waveHeight: '1.3-1.9m', windSpeed: '10 km/h' },
  { id: '22', name: 'Palamós', coordinates: [3.1294, 41.8469], rating: 'excellent', region: 'Cataluña', waveHeight: '1.4-2.0m', windSpeed: '9 km/h' },
  { id: '23', name: 'Roses', coordinates: [3.1761, 42.2619], rating: 'excellent', region: 'Cataluña', waveHeight: '1.6-2.2m', windSpeed: '11 km/h' },
  { id: '24', name: 'El Port de la Selva', coordinates: [3.2022, 42.3367], rating: 'excellent', region: 'Cataluña', waveHeight: '1.8-2.5m', windSpeed: '7 km/h' },
  { id: '25', name: 'Sitges', coordinates: [1.8061, 41.2372], rating: 'good', region: 'Cataluña' },
  { id: '26', name: 'Barcelona', coordinates: [2.1734, 41.3851], rating: 'fair', region: 'Cataluña' },
  
  // Andalucía
  { id: '27', name: 'El Palmar, Cádiz', coordinates: [-6.1833, 36.2167], rating: 'excellent', region: 'Andalucía', waveHeight: '1.4-2.1m', windSpeed: '10 km/h' },
  { id: '28', name: 'Conil de la Frontera', coordinates: [-6.0881, 36.2792], rating: 'good', region: 'Andalucía' },
  { id: '29', name: 'Tarifa', coordinates: [-5.6067, 36.0133], rating: 'good', region: 'Andalucía' },
  { id: '30', name: 'Zahara de los Atunes', coordinates: [-5.8439, 36.1381], rating: 'good', region: 'Andalucía' },
  
  // Canarias
  { id: '31', name: 'Las Canteras, Gran Canaria', coordinates: [-15.4500, 28.1500], rating: 'good', region: 'Gran Canaria', waveHeight: '1.5-2.2m', windSpeed: '18 km/h' },
  { id: '32', name: 'El Confital, Gran Canaria', coordinates: [-15.4333, 28.1667], rating: 'excellent', region: 'Gran Canaria', waveHeight: '1.8-2.6m', windSpeed: '15 km/h' },
  { id: '33', name: 'La Santa, Lanzarote', coordinates: [-13.8667, 29.1333], rating: 'excellent', region: 'Lanzarote', waveHeight: '2.1-3.0m', windSpeed: '12 km/h' },
  { id: '34', name: 'El Quemao, Lanzarote', coordinates: [-13.8500, 29.1167], rating: 'excellent', region: 'Lanzarote', waveHeight: '2.3-3.2m', windSpeed: '8 km/h' },
  { id: '35', name: 'La Izquierda, Tenerife', coordinates: [-16.6167, 28.3833], rating: 'excellent', region: 'Tenerife', waveHeight: '1.9-2.7m', windSpeed: '10 km/h' },
  { id: '36', name: 'Punta Blanca, Fuerteventura', coordinates: [-13.8667, 28.7000], rating: 'good', region: 'Fuerteventura', waveHeight: '2.0-2.8m', windSpeed: '20 km/h' },
  { id: '37', name: 'El Hierro', coordinates: [-17.9000, 27.7500], rating: 'good', region: 'El Hierro' },
  { id: '38', name: 'La Palma', coordinates: [-17.8833, 28.6833], rating: 'fair', region: 'La Palma' },
];
