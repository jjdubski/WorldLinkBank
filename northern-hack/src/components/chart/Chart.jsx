import React from 'react';
import './chart.css';

const Chart = () => {
  return (
    <div className='chart-cont'>
        <div className="color-header"></div>
      <table className="chart-table">
        <thead>
          <tr className="chart-header">
            <th className="table-header">Name</th>
            <th className="table-header">Rate</th>
          </tr>
        </thead>
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
