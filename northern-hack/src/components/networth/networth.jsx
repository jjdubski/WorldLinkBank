import React, { useState, useEffect } from "react";
import "./networth.css";
import NetworthGraph from "./networthGraph";
import NetworthList from "./networthList";
import axios from 'axios';

const Networth = () => {
    // Load holdings from localStorage or set default values
    const [holdings, setHoldings] = useState(() => {
        const savedHoldings = localStorage.getItem('holdings');
        return savedHoldings ? JSON.parse(savedHoldings) : {
            USD: 10.81,
            EUR: 81.75,
            GBP: 19.41,
            JPY: 9.40,
            AUD: 190.34,
        };
    });

    const [conversionRates, setConversionRates] = useState({});
    const [totalInUSD, setTotalInUSD] = useState(0);

    // Update localStorage whenever holdings change
    useEffect(() => {
        localStorage.setItem('holdings', JSON.stringify(holdings));
        calculateTotalInUSD();
    }, [holdings]);

    // Fetch conversion rates from API
    useEffect(() => {
        const fetchConversionRates = async () => {
            try {
                const response = await axios.get(
                    'http://127.0.0.1:5000/fx_rates/api/fx-rates'
                );
                const rates = response.data.data.reduce((acc, rate) => {
                    acc[`${rate.from}_${rate.to}`] = rate.conversion_rate;
                    return acc;
                }, {});
                setConversionRates(rates);
                calculateTotalInUSD(rates);
            } catch (error) {
                console.error("Error fetching conversion rates:", error);
            }
        };
        fetchConversionRates();
    }, []);

    // Calculate total holdings in USD
    const calculateTotalInUSD = (rates = conversionRates) => {
        let total = 0;

        Object.entries(holdings).forEach(([currency, value]) => {
            if (currency === 'USD') {
                total += value;
            } else {
                const rateKey = `${currency}_USD`;
                const rate = rates[rateKey];
                if (rate) {
                    total += value * rate;
                }
            }
        });

        setTotalInUSD(total);
    };

    // Function to update holdings when changes occur
    const handleUpdate = (currency, value) => {
        setHoldings((prevHoldings) => {
            const updatedHoldings = {
                ...prevHoldings,
                [currency]: parseFloat(value) || 0,
            };
            return updatedHoldings;
        });
    };

    return (
        <div className='networth'>
            <NetworthList holdings={holdings} onUpdate={handleUpdate} totalInUSD={totalInUSD} />
            <NetworthGraph holdings={holdings} conversionRates={conversionRates} />
        </div>
    );
};

export default Networth;
