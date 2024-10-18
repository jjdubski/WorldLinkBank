import React from "react";
import "./networth.css";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const NetworthGraph = ({ equivalentInUSD }) => {
    // Ensure we have the equivalent in USD data before rendering
    if (!equivalentInUSD || Object.keys(equivalentInUSD).length === 0) {
        return <p>Loading graph data...</p>;
    }

    const labels = Object.keys(equivalentInUSD);
    const dataValues = Object.values(equivalentInUSD);

    const data = {
        labels: labels,
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
            <div className="graph-container">
                <div className="networth-graph">
                    <Pie
                        data={data}
                        options={options}
                        style={{height:'300px', width:'300px'}}
                    />
                </div>
            </div>
        </div>
    );
};

export default NetworthGraph;
