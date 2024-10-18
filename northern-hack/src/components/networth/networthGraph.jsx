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

const NetworthGraph = ({ holdings, conversionRates }) => {
    if (!holdings || Object.keys(holdings).length === 0) {
        return <p>Loading graph data...</p>;
    }

    // Convert all holdings to USD
    const convertedHoldings = Object.entries(holdings).map(([currency, value]) => {
        if (currency === 'USD') {
            return value; // USD does not need conversion
        } else {
            const rateKey = `${currency}_USD`;
            const rate = conversionRates[rateKey];
            return rate ? value * rate : 0;
        }
    });

    // Prepare data for the graph
    const data = {
        labels: Object.keys(holdings),
        datasets: [
            {
                data: convertedHoldings,
                backgroundColor: ['#4caf50', '#0c533f', '#326b58', '#01a93a', '#378238']
            }
        ]
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
    )
}

export default NetworthGraph;
