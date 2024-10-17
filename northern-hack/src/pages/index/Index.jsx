
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar'


const Index = () => {
  const [data, setData] = useState(null); // State to hold fetched data
  const [error, setError] = useState(null); // State to hold any potential errors

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/fx-rates');
        setData(response.data); // Update the data state with the conversion rates
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
    <>
      <Navbar/>
      <div>
        <h1>Hello, John!</h1>
      </div>
      <div className='live-display'>
        <h3>Current Rates</h3>
        <table className='live-rates'>
          {/* <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
            </tr>
          </thead> */}
          <tbody>
            <tr className='rate'>
              <td>USD/JPY</td>
              <td>1.00</td>
              <td>up</td>
            </tr>
            <tr className='rate'>
              <td>GBP/USD</td>
              <td>0.72</td>
              <td>down</td>
            </tr>
            <tr className='rate'>
              <td>EUR/JPY</td>
              <td>0.82</td>
              <td>up</td>
            </tr>
            <tr className='rate'>
              <td>JPY/GBP</td>
              <td>109.00</td>
              <td>down</td>
            </tr>
            <h2>Net Worth ($100)</h2>
            <select>
              <option value="usd">USD</option>
              <option value="gbp">GBP</option>
              <option value="eur">EUR</option>
              <option value="jpy">JPY</option>
            </select>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Index;
