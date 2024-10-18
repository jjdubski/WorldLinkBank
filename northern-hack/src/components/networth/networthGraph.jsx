import React from "react";
import "./networth.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const NetworthGraph = ({ holdings }) => {
    // Check if holdings exist before rendering the chart
    if (!holdings || Object.keys(holdings).length === 0) {
        return <p>Loading graph data...</p>;
    }

    // Extract labels and data from holdings
    const labels = Object.keys(holdings);
    const dataValues = Object.values(holdings).map(value => parseFloat(value));

    if (labels.length === 0 || dataValues.every(value => value === 0)) {
        return <p>No data available to display.</p>;
    }

    const data = {
        labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: ['#4caf50', '#0c533f', '#326b58', '#01a93a', '#378238']
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="graph-cont">
            <h2>Networth Distribution</h2>
            <div className="networth-graph">
                <Pie 
                    data={data}
                    options={options}
                    style={{ height: '300px', width: '300px'}}
                />
            </div>  
        </div>
    );
};

export default NetworthGraph;
