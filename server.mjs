import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const PORT = process.env.PORT || 3001; // Use a different port than Vite

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to parse JSON bodies
app.use(express.json());

// Mock Route for get-conditions
app.get('/api/get-conditions', (req, res) => {
  console.log('Serving mocked data for /api/get-conditions');
  res.status(200).json({
    "1": {
      "waveHeight": "1.5m",
      "windSpeed": "10 km/h",
      "windDirection": 90,
      "temperature": "15.0°C",
      "rating": "good",
      "lastUpdate": new Date().toISOString()
    },
    "21": {
      "waveHeight": "1.0m",
      "windSpeed": "5 km/h",
      "windDirection": 180,
      "temperature": "18.0°C",
      "rating": "excellent",
      "lastUpdate": new Date().toISOString()
    }
  });
});

// Mock Route for update-conditions
app.get('/api/update-conditions', (req, res) => {
  console.log('Serving mocked success for /api/update-conditions');
  res.status(200).json({ message: 'Mocked update successful!' });
});

// Serve static files from the dist directory (after build)
app.use(express.static(join(__dirname, 'dist')));

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
