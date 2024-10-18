import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';

const Dashboard = () => {

    // const info = [
    //     {date: '2020-10-01', rates: {USDtoJPY: 105, USDtoGBP: 0.98, USDtoEUR: 0.95, USDtoAUD: 1.3}},
    //     {date: '2020-10-02', rates: {USDtoJPY: 110, USDtoGBP: 0.78, USDtoEUR: 0.85, USDtoAUD: 1.4}},
    //     {date: '2020-10-03', rates: {USDtoJPY: 100, USDtoGBP: 1.18, USDtoEUR: 0.75, USDtoAUD: 1.5}},
    //     {date: '2020-10-04', rates: {USDtoJPY: 120, USDtoGBP: 0.50, USDtoEUR: 0.65, USDtoAUD: 2}},
    // ]

    // const [chartData, setChartData] = useState({
    //     datasets: [{
    //         label: 'Currency Rates EX',
    //         data: info,
    //         backgroundColor: [
    //             'red',
    //             'blue',
    //             'green'
    //         ],
    //         borderColor: [
    //             'red',
    //             'blue',
    //             'green'
    //         ],
    //         tension: 0.5,
    //         parsing: {
    //             xAxisKey: 'currency',
    //             yAxisKey: 'rates.USDtoJPY'
    //         }
    //     }]
    //   });

    // const data = {
    //     datasets: [{
    //         label: 'Currency Rates EX',
    //         data: info,
    //         backgroundColor: [
    //             'red',
    //             'blue',
    //             'green'
    //         ],
    //         borderColor: [
    //             'red',
    //             'blue',
    //             'green'
    //         ],
    //         tension: 0.5,
    //         parsing: {
    //             xAxisKey: 'currency',
    //             yAxisKey: 'rate.USDtoJPY'
    //         }
    //     }],
    //     }

        // const config = {
        //     type: 'line',
        //     data: info,
        //     options: {
        //       responsive: true,
        //       plugins: {
        //         legend: {
        //           position: 'top',
        //         },
        //         title: {
        //           display: false,
        //           text: 'Chart.js Line Chart'
        //         }
        //       }
        //     },
        //   };

    return (
        <>
        <Navbar/>
        <div className='dashboard'>
            <h1 style={{fontSize: 38}}>FX Desk Dashboard</h1>
            <p>Coming Soon</p>
                <div className="chart-container">
                <h2 style={{ textAlign: "center" }}>Line Chart</h2>
                </div>
        </div>
        </>
    )
}

export default Dashboard;