import React from 'react';
import './chart.css';

const Chart = () => {
  return (
    <div className='chart-cont'>
      <div className="chart-header">Live Currency Rates</div>
      <div className="color-header">
        <p>Name</p>
        <p>Rate</p>
      </div>
      <table className="chart-table">
        <tbody>
          <tr className="chart-row">
            <td className="table-cell-c">USD / JPY</td>
            <td className="table-cell">$10</td>
          </tr>
        </tbody>
        <tbody>
          <tr className="chart-row">
            <td className="table-cell-c">USD / JPY</td>
            <td className="table-cell">$10</td>
          </tr>
        </tbody>
        <tbody>
          <tr className="chart-row">
            <td className="table-cell-c">USD / JPY</td>
            <td className="table-cell">$10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Chart;
