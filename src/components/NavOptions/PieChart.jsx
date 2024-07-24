import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Received', 'Not yet Delivered'],
    datasets: [
      {
        data: [83.3, 16.7],
        backgroundColor: ['#8e44ad', '#f1c40f'],
        hoverBackgroundColor: ['#7a379c', '#e3b90e'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%', // Makes the donut chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-center text-lg font-semibold mb-4">User Received Analysis</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};
export default PieChart;
