// EndTest.jsx

import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const LineChart = (correctLetters, incorrectLetters) => {

    const [testCorrectChartData, setTestCorrectChartData] = useState(correctLetters);
    const [testErrorChartData, setTestErrorChartData] = useState(correctLetters);


    
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'correct',
            data: testCorrectChartData,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: 'rgba(75,192,192,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75,192,192,1)',
          },
          {
            label: 'errors',
            data: testErrorChartData,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: 'rgba(75,192,192,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75,192,192,1)',
          }
        ],
    };
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '',
          },
        },
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width: '100%', height: '50vh' }}>
            <Line data={data} options={options} />
        </div>
    );
};

// Move the export statement to the top level of the file
export default LineChart;