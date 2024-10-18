import React from "react";
import "./networth.css";

const NetworthList = ({ holdings, onUpdate, conversionRates }) => {
    // Check if holdings exist before rendering
    if (!holdings || Object.keys(holdings).length === 0) {
        return <p>Loading holdings...</p>;
    }

    const handleChange = (currency, value) => {
        onUpdate(currency, value);
    };

    const getValueInUSD = (currency, value) => {
        if (currency === 'USD') {
            return value;
        } else {
            const rateKey = `${currency}_USD`;
            const rate = conversionRates[rateKey];
            return rate ? (value * rate).toFixed(2) : "N/A";
        }
    };

    return (
        <div className="chart-c" id="networth_list">
            <div className="color-header">
                <p>Currency</p>
                <p>Amount</p>
                <p>Equivalent in USD</p>
            </div>
            <table className="chart-table">
                <tbody>
                    {Object.entries(holdings).map(([currency, amount]) => (
                        <tr key={currency}>
                            <td className="table-cell-c">{currency}</td>
                            <td className="table-cell">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => handleChange(currency, e.target.value)}
                                />
                            </td>
                            <td className="table-cell">
                                ${getValueInUSD(currency, parseFloat(amount))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NetworthList;
