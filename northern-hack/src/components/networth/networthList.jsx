import React from "react";
import "./networth.css";

const NetworthList = () => {
    return (
        <div className="chart-cont" id="networth_list">
            <h2 className="chart-title">Total Holdings in USD: $258.97</h2>
            <div className="color-header">
                <p>Currency</p>
                <p>Amount</p>
            </div>
            <table className="chart-table">
                <tbody>
                {/* <tr>
                    <th>Currency</th>
                    <th>Amount</th>
                </tr> */}
                <tr>
                    <td className="table-cell-c">USD</td>
                    <td className="table-cell">$10.81</td>
                </tr>
                <tr>
                    <td className="table-cell-c">EUR</td>
                    <td className="table-cell">€81.75</td>
                </tr>
                <tr>
                    <td className="table-cell-c">GBP</td>
                    <td className="table-cell">£19.41</td>
                </tr>
                <tr>
                    <td className="table-cell-c">JPY</td>
                    <td className="table-cell">¥9.40</td>
                </tr>
                <tr>
                    <td className="table-cell-c">AUD</td>
                    <td className="table-cell">$190.34</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default NetworthList;

