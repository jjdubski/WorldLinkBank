import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Index = () => {
  const [data, setData] = useState(null); // State to hold fetched data
  const [error, setError] = useState(null); // State to hold any potential errors

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/fx-rates');
        setData(response.data.data); // Update the data state with the conversion rates
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error); // Update the error state
      }
    };

    fetchData(); // Call the function to fetch data
  }, []); // Empty dependency array means this effect runs once on mount

  // Handle loading and error states
  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  // Render the data (modifying to display currency rates)
  return (
    <div>
      <h1>FX Rates</h1>
      <ul>
        {Object.entries(data).map(([currency, rate]) => (
          <li key={currency}>
            {currency}: {rate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
