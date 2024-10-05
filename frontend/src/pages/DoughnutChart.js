import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ score }) => {
    const data = {
        labels: ['Score', 'Remaining'], // Labels for the chart
        datasets: [
            {
                data: [score, 100 - score], // Assuming the max score is 100
                backgroundColor: ['#4CAF50', '#FF6384'], // Colors for segments
                hoverBackgroundColor: ['#45a049', '#ff6384'],
            },
        ],
    };

    return (
        <div className="flex justify-center items-center">
            <Doughnut data={data} />
        </div>
    );
};

export default DoughnutChart;
