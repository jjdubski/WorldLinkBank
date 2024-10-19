import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import './prediction.css';

const Prediction = () => {
  const [findDate, setFindDate] = useState('');
  const [predData, setPredData] = useState([]); // State to hold prediction data
  const [error, setError] = useState(''); // State to hold error messages
  const [result, setResult] = useState([]); // Change result to an array to hold multiple currency results

  const handleDateChange = (event) => {
    setFindDate(event.target.value);
  };

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

    fetchPredData(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  const findDataByDate = (targetDate) => {
    const foundData = predData.find(item => item.Date === targetDate);

    if (foundData) {
      // Create an array of objects with relevant currency data, ignoring "Rate" and "CPI"
      const currencyResults = Object.keys(foundData)
        .filter(key => key !== 'Date' && key !== 'Rate' && key !== 'CPI' && key != 'FEDFUNDS') // Exclude Date, Rate, and CPI keys
        .map(key => ({
          currency: key,
          rate: foundData[key].toFixed(2), // Format rate to 2 decimal places
        }));

      setResult(currencyResults); // Store the array of results in state
    } else {
      setResult([]); // Set result to an empty array if no match is found
    }
  };

  return (
    <div className='prediction-cont'>
      <p className="prediction-title">FX Prediction Model</p>
      {error && <p className='error-message'>{error}</p>}
      <div className="prediction-display">
        <div className="prediction-search-output">
          <div className="prediction-results-table">
            {result.length > 0 ? (
              result.map((item, index) => (
                <div className="prediction-result" key={index}>
                  <div className="rate-current">{item.rate}</div>
                  <div className="currency-name">({item.currency}) {item.currency.toUpperCase()}</div>
                </div>
              ))
            ) : (
              <p>No results found for the selected date.</p>
            )}
          </div>

          <p className='info-panel'>Compared to $1 USD</p>
          <div className="prediction-search-dict">
            <div className="converter">
              <p className="label-text">Date</p>
              <input
                className="input-style"
                id="date"
                value={findDate}
                onChange={handleDateChange}
                placeholder="yyyy-mm-dd"
              />
            </div>
            <button onClick={() => findDataByDate(findDate)} className="submit-date">Run</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prediction;
