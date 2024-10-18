import React from "react";
import "./networth.css";


//const NetworthList = ({ holdings, onUpdate, conversionRates }) => {

const NetworthList = ({ holdings, onUpdate, equivalentInUSD }) => {

    if (!holdings || Object.keys(holdings).length === 0) {
        return <p>Loading holdings...</p>;
    }

    const handleChange = (currency, value) => {
        onUpdate(currency, value);
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
                                ${equivalentInUSD && equivalentInUSD[currency] ? equivalentInUSD[currency].toFixed(2) : "Calculating..."}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NetworthList;
