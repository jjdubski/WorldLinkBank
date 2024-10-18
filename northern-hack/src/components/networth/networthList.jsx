import React from "react";
import "./networth.css";

const NetworthList = ({ holdings, onUpdate }) => {
    // Check if holdings exist before rendering
    if (!holdings || Object.keys(holdings).length === 0) {
        return <p>Loading holdings...</p>;
    }

    const handleChange = (currency, value) => {
        onUpdate(currency, value);
    };

    return (
        <div className="chart-cont" id="networth_list">
            <h2 className="chart-title">
                Total Holdings in USD: $
                {Object.values(holdings).reduce((acc, amount) => acc + parseFloat(amount), 0).toFixed(2)}
            </h2>
            <div className="color-header">
                <p>Currency</p>
                <p>Amount</p>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NetworthList;
