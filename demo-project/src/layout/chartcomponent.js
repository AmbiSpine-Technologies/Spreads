import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";

const ChartComponent = () => {
    // Define chart data
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
            {
                label: 'Dataset 2',
                data: [35, 49, 70, 71, 46, 45, 30],
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            },
            {
                label: 'Dataset 3',
                data: [45, 39, 60, 61, 36, 35, 20],
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1,
            },
        ],
    };

    // Define chart options
    const options = {
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        ChartJS.register(ArcElement, Tooltip, Legend);
    }, []);

    return (
        <div style={{width:"500px",height:"200px"}}>
            
            <Line data={data} options={options} />
        </div>
    );
};

export default ChartComponent;
