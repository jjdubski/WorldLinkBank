import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Index = () => {
  const [fxRates, setFxRates] = useState(null); // State to hold FX rates data
  const [conversionResult, setConversionResult] = useState(null); // State to hold conversion result
  const [error, setError] = useState(null); // State to hold any potential errors

  // Fetch FX Rates for top currencies on component mount
  useEffect(() => {
    const fetchFxRates = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/fx-rates');
        setFxRates(response.data.data); // Update the data state with the FX rates
      } catch (error) {
        console.error('Error fetching FX rates:', error);
        setError('Error fetching FX rates: ' + error.message);
      }
    };

    fetchFxRates(); // Call the function to fetch FX rates data
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to handle currency conversion
  const handleConversion = async (e) => {
    e.preventDefault();

    const baseCurrency = e.target.base_currency.value;
    const targetCurrency = e.target.target_currency.value;
    const amount = e.target.amount.value;

    try {
      const response = await axios.get(`http://127.0.0.1:5000/convert?base_currency=${baseCurrency}&target_currency=${targetCurrency}&amount=${amount}`);
      setConversionResult(response.data); // Update conversion result
    } catch (error) {
      console.error('Error fetching conversion:', error);
      setError('Error fetching conversion: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Currency Conversion Tool</h1>

      {/* Form to handle currency conversion */}
      <form onSubmit={handleConversion}>
        <div>
          <label htmlFor="base_currency">Base Currency:</label>
          <input type="text" id="base_currency" name="base_currency" required />
        </div>
        <div>
          <label htmlFor="target_currency">Target Currency:</label>
          <input type="text" id="target_currency" name="target_currency" required />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" name="amount" required />
        </div>
        <button type="submit">Convert</button>
      </form>

      {/* Display the currency conversion result */}
      {conversionResult && (
        <div>
          <h2>Conversion Result</h2>
          <p>{conversionResult.amount} {conversionResult.base_currency} is equivalent to {conversionResult.converted_amount} {conversionResult.target_currency}.</p>
          <p>Conversion Rate: {conversionResult.conversion_rate}</p>
        </div>
      )}

      {/* Handle and display errors */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Display the FX Rates for top currencies */}
      <h2>FX Rates for Top Currencies</h2>
      {fxRates ? (
        <ul>
          {fxRates.map((rate, index) => (
            <li key={index}>
              {rate.from} to {rate.to}: {rate.conversion_rate}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading FX rates...</p>
      )}
    </div>
  );
};

export default Index;
