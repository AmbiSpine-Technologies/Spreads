import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Import ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { getLast7Days } from '../lib/feature';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement 
);

export const LineChartComponent = ({ value = [] }) => {
    const labels =getLast7Days();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

 

  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: 'Revenue 2',
        fill: true,
        borderColor: 'rgb(75,12,192)',
        backgroundColor: 'rgba(75,12,192,0.2)',
      },
    ],
  };
  return <Line options={options} data={data}></Line>;
};

export const DoughnutChartComponent = ({value=[],labels=[]}) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Chat VS Group Chats',
        data: value,
        backgroundColor: [
          
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
         
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        hoverBackgroundColor:[
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
        ],
        borderWidth: 1,
        offset:30,
      },
    ],
  };

  return <Doughnut style={{zIndex:10}} data={data}></Doughnut>;
};
