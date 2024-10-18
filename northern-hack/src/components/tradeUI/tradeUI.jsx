import React, { useState } from "react";
import axios from "axios";
import "./tradeUI.css";

const TradeUI = () => {
    const [amount, setAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [conversionResult, setConversionResult] = useState(null);
    const [conversionRate, setConversionRate] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State for loading

    const handleConvert = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            setError("Please enter a valid amount.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:5000/fx_rates/api/fx-rates');
            console.log("Fetched FX rates:", response.data);

            const fxRates = response.data.data;

            const rateData = fxRates.find(
                rate => rate.from === fromCurrency && rate.to === toCurrency
            );

            if (rateData) {
                setConversionRate(rateData.conversion_rate);
                setError(null);
                const convertedAmount = parseFloat(amount) * rateData.conversion_rate;
                setConversionResult(convertedAmount);
            } else {
                setError("Conversion rate not available for the selected currency pair.");
                setConversionResult(null);
            }
        } catch (error) {
            console.error("Failed to fetch conversion:", error);
            setError("Failed to fetch conversion rates. Please try again.");
            setConversionResult(null);
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className='tradeUI'>
            <div className="trade-cont">
                <div className="top-cont">
                    <div className="converter">
                        <p className="label-text">Amount</p>
                        <input
                            className="input-style"
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="1.00"
                        />
                    </div>
                    <div className="converter">
                        <label className="label-text" htmlFor="fromCurrency">From</label>
                        <select
                            className="input-style"
                            id="fromCurrency"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="JPY">JPY</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>
                    <div className="converter">
                        <label className="label-text" htmlFor="toCurrency">To</label>
                        <select
                            className="input-style"
                            id="toCurrency"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="JPY">JPY</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>
                </div>

                
                <div className="text-cont-trade">
                    {amount} {fromCurrency} is =
                </div>
                <div className="cont-of-conts">
                <div className="output-cont-trade">
                    {error && <div className="error-text">{error}</div>}
                        {isLoading ? (
                            <div className="loading-text">Loading...</div>
                        ) : (
                            conversionResult !== null && (
                                <div className="output-text">
                                    {conversionResult.toFixed(4)} {toCurrency} 
                                    {conversionRate !== null && (
                                        <div className="conversion-rate-text">
                                            (Rate: {conversionRate.toFixed(4)})
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                </div>
                <div className="bottom-cont">
                    <button className="convert-button" onClick={handleConvert}>
                        Convert
                    </button>
                </div>
                </div>

            </div>
        </div>
    );
};

export default TradeUI;
