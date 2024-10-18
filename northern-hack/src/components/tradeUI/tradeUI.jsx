import React, { useState } from "react";
import "./tradeUI.css";

const TradeUI = () => {
    const [amount, setAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");

    return (
        <div className='tradeUI'>
            <div className="trade-cont">
                <div className="top-cont">
                    <div className="converter">
                        <label className="amount-style" htmlFor="amount"></label>
                        <p className="label-text">Amount</p>
                        <input
                            className="input-style"
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
                            {/* Add more currencies as needed */}
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
                <div className="bottom-cont">
                    <div className="output-text">$15.25</div>
                    <div className="convert-button">Convert</div>
                </div>
            </div>
        </div>
    );
};

export default TradeUI;
