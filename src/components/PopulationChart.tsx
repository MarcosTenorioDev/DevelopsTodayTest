// PopulationChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PopulationCount {
    year: number;
    value: number;
  }

interface CountryPopulationChartProps {
    country: string;
    code: string;
    populationCounts: PopulationCount[];
  }

const CountryPopulationChart: React.FC<CountryPopulationChartProps> = ({ country, code, populationCounts }) => {
  const data = {
    labels: populationCounts.map(data => data.year),
    datasets: [
      {
        label: `Population of ${country}`,
        data: populationCounts.map(data => data.value),
        fill: false,
        backgroundColor: 'HSL(24.6 95% 53.1%)',
        borderColor: 'HSL(24.6 95% 53.1%)',
      },
    ],
  };

  return (
    <div> 
      <h2 className="text-2xl font-semibold mb-4">Population Over Years in {country}({code})</h2>
      <Line data={data} />
    </div>
  );
};

export default CountryPopulationChart;
