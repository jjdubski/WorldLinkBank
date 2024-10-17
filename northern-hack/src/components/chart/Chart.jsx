import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './chart.css';

const Chart = () => {
  const [fxRates, setFxRates] = useState([]);
  const [filteredRates, setFilteredRates] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ALL"); // State for filtering

  useEffect(() => {
    // Function to fetch FX rates from the backend
    const fetchFxRates = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/fx_rates/api/fx-rates');
        setFxRates(response.data.data);
        setFilteredRates(response.data.data); // Initially set filtered rates to all rates
      } catch (error) {
        console.error('Error fetching FX rates:', error);
        setError('Failed to fetch FX rates. Please try again later.');
      }
    };

    fetchFxRates();
  }, []);

  // Function to handle the filter change
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    
    if (selectedFilter === "ALL") {
      setFilteredRates(fxRates);
    } else if (selectedFilter === "USD") {
      const usdRates = fxRates.filter(rate => rate.from === "USD" || rate.to === "USD");
      setFilteredRates(usdRates);
    } else {
      const specificRates = fxRates.filter(rate => rate.from === selectedFilter || rate.to === selectedFilter);
      setFilteredRates(specificRates);
    }
  };

  return (
    <div className='chart-cont'>
      <div className="chart-header">Live Currency Rates</div>
      
      {/* Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="currency-filter">Filter by Currency:</label>
        <select id="currency-filter" value={filter} onChange={handleFilterChange}>
          <option value="USD">Show USD Pairs</option>
          <option value="ALL">Show All</option>
          <option value="EUR">Show EUR Pairs</option>
          <option value="JPY">Show JPY Pairs</option>
          <option value="GBP">Show GBP Pairs</option>
          <option value="AUD">Show AUD Pairs</option>
        </select>
      </div>

      <div className="color-header">
        <p>Name</p>
        <p>Rate</p>
      </div>
      
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <table className="chart-table">
          <tbody>
            {filteredRates.length > 0 ? (
              filteredRates.map((rate, index) => (
                <tr className="chart-row" key={index}>
                  <td className="table-cell-c">{rate.from} / {rate.to}</td>
                  <td className="table-cell">{rate.conversion_rate.toFixed(4)}</td>
                </tr>
              ))
            ) : (
              <tr className="chart-row">
                <td className="table-cell-c" colSpan="2">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Chart;
