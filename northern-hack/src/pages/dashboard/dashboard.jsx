import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Navbar from "../../components/navbar/Navbar";
import LineChart from "../../components/dashboard/LineChart";
import axios from 'axios'; // Missing axios import

const Dashboard = () => {
    // State to store the predicted data fetched from the API
    const [predData, setPredData] = useState([]);
    const [error, setError] = useState(null); // Error state to handle any issues with API

    // useEffect hook to fetch the predicted data from the API
    useEffect(() => {
        const fetchPredData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/currency_ml_model/api/future-predictions');
                setPredData(response.data);
            } catch (error) {
                console.error('Error fetching predData:', error);
                setError('Failed to fetch predData. Please try again later.');
            }
        };
        
        // Call the fetch function when the component mounts
        fetchPredData();
    }, []); // Empty dependency array to run this effect once on mount

    return (
        <>
            <Navbar />
            {error ? ( // Conditional rendering in case there's an error
                <div>{error}</div>
            ) : (
                <LineChart chartData={predData} /> // Display LineChart with predData
            )}

        </>
    );
}

export default Dashboard;
