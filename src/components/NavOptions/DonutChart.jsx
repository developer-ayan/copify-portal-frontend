import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
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
    cutout: '70%', // Creates the donut shape
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-[200px] mx-auto" style={{ height: '400px' }}>
      {/* <h2 className="text-center text-lg font-semibold mb-4 mt-4">User Received Analysis</h2> */}
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
