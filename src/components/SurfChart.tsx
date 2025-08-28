import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HourlyForecastData } from '@/services/surfService';

interface SurfChartProps {
  data: HourlyForecastData[];
}

const SurfChart = ({ data }: SurfChartProps) => {
  // Format data for chart
  const formattedData = data.map(item => ({
    time: item.time.split(':')[0] + 'h', // Just hour for X-axis
    waveHeight: parseFloat(item.waveHeight.toFixed(1)),
    windSpeed: parseFloat(item.windSpeed.toFixed(1)),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={formattedData}
        margin={{
          top: 5,
          right: -30,
          left: -30,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" interval="preserveStartEnd" tickCount={5} />
        <YAxis yAxisId="left" width={60} padding={{ left: 20 }} /> {/* Increased width, added padding */}
        <YAxis yAxisId="right" orientation="right" width={60} /> {/* Increased width */}
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="waveHeight" stroke="#8884d8" activeDot={{ r: 8 }} name="Altura Ola (m)" />
        <Line yAxisId="right" type="monotone" dataKey="windSpeed" stroke="#82ca9d" name="Viento (km/h)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SurfChart;