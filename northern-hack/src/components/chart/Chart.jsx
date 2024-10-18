import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './chart.css';

const Chart = () => {
  const [fxRates, setFxRates] = useState([]);
  const [filteredRates, setFilteredRates] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const fetchFxRates = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/fx_rates/api/fx-rates');
        setFxRates(response.data.data);
        setFilteredRates(response.data.data);
      } catch (error) {
        console.error('Error fetching FX rates:', error);
        setError('Failed to fetch FX rates. Please try again later.');
      }
    };

    fetchFxRates();

    const interval = setInterval(() => {
      setFilteredRates((prevRates) => {
        if (prevRates.length === 0) return prevRates;

        const randomIndex = Math.floor(Math.random() * prevRates.length);

        const updatedRates = prevRates.map((rate, index) => {
          if (index === randomIndex) {
            const rateChange = Math.random() > 0.5 ? 0.01 : -0.01;
            return {
              ...rate,
              conversion_rate: rate.conversion_rate + rateChange,
              priceIncreased: rateChange > 0,
              highlight: true, 
            };
          }
          return rate; 
        });

        setTimeout(() => {
          setFilteredRates((currentRates) =>
            currentRates.map((rate, index) => {
              if (index === randomIndex) {
                return { ...rate, highlight: false }; 
              }
              return rate;
            })
          );
        }, 1000);

        return updatedRates;
      });
    }, 700); 

    return () => clearInterval(interval); 
  }, []);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === "ALL") {
      setFilteredRates(fxRates);
    } else {
      const specificRates = fxRates.filter(rate => rate.from === selectedFilter || rate.to === selectedFilter);
      setFilteredRates(specificRates);
    }
  };

  return (
    <div className='chart-cont'>
      <div className="chart-header">Forex Market Prices</div>

      <div className="display-graph">
        <div className="header-section-graph">
          <p className="header-graph-t">Forex</p>
        </div>

        <div className="search-section-graph">
          <div className="converter-chart">
            <label className="label-text-chart" htmlFor="currency-filter"></label>
            <select className='input-style-chart' id="currency-filter" value={filter} onChange={handleFilterChange}>
              <option value="ALL">Show All Filters</option>
              <option value="USD">Show USD Pairs</option>
              <option value="EUR">Show EUR Pairs</option>
              <option value="JPY">Show JPY Pairs</option>
              <option value="GBP">Show GBP Pairs</option>
              <option value="AUD">Show AUD Pairs</option>
            </select>
          </div>
        </div>

        <div className="data-section-graph">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="chart-div">
              <div className="chart-row-header-row">
                <div className="cell-header-cell">Name</div>
                <div className="cell-header-cell">Buy</div>
              </div>
              {filteredRates.length > 0 ? (
                filteredRates.map((rate, index) => (
                  <div className="chart-row" key={index}>
                    <div className="cell1">{rate.from} / {rate.to}</div>
                    <div
                      className={`cell2 ${rate.highlight ? (rate.priceIncreased ? 'green-bg' : 'red-bg') : ''}`}
                    >
                      {rate.conversion_rate.toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="chart-row">
                  <div className="cell" colSpan="2">Loading...</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <p className="bottom-text">We use the mid-market rate for our Converter. This is for informational purposes only. You won’t receive this rate when sending money.</p>
    </div>
  );
};

export default Chart;
