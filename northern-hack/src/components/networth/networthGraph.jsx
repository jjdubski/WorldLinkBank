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

const NetworthGraph = () => {
    const data = {
        labels: ['USD', 'EUR', 'GBP', 'JPY', 'AUD'],
        datasets: [
            {
                data: [10.81, 81.75, 19.41, 9.40, 190.34],
                backgroundColor: ['#4caf50', '#0c533f', '#326b58', '#01a93a', '#378238']
            }
        ]
    }

    const options = {
        
    }

    return (
        <div className="graph-cont">
            <h2>Networth Distribution</h2>
            <div className="graph-container">
                <div className="networth-graph">
                <Pie
                    data = {data}
                    options = {options}
                >
                </Pie>
                </div>
            </div>
        </div>
    )
}

export default NetworthGraph;