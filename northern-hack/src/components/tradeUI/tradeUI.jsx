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
            const response = await axios.get(
                `http://127.0.0.1:5000/fx_rates/convert?base_currency=${fromCurrency}&target_currency=${toCurrency}&amount=${amount}`
            );
            const { converted_amount, conversion_rate } = response.data;
            setConversionRate(conversion_rate);
            setConversionResult(converted_amount);
            setError(null);
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
            <div className="text-cont-trade-u">
                <p className="h1-trade">WorldLink Currency Converter</p>
                <p className="convert-text">Convert {fromCurrency} to {toCurrency}</p>
            </div>
            
            <div className="trade-cont">
            <div className="top-cont">
                    <div className="converter">
                        <p className="label-text">Amount</p>
                        <input
                            className="input-style"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
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
                            <option value="AUD">AUD</option>
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
                            <option value="AUD">AUD</option>
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
            <p className="bottom-text">We use the mid-market rate for our Converter. This is for informational purposes only. You won’t receive this rate when sending money.</p>
        </div>
    );
};

export default TradeUI;
