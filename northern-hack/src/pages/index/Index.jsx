import React from 'react'
import Navbar from '../../components/navbar/Navbar'


const index = () => {
  return (
    <>
      <Navbar/>
      <div>
        <h1>Hello, John!</h1>
      </div>
      <div className='live-display'>
        <h3>Current Rates</h3>
        <table className='live-rates'>
          {/* <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
            </tr>
          </thead> */}
          <tbody>
            <tr className='rate'>
              <td>USD/JPY</td>
              <td>1.00</td>
            </tr>
            <tr className='rate'>
              <td>GBP/USD</td>
              <td>0.72</td>
            </tr>
            <tr className='rate'>
              <td>EUR/JPY</td>
              <td>0.82</td>
            </tr>
            <tr className='rate'>
              <td>JPY/GBP</td>
              <td>109.00</td>
            </tr>
            <h2>Net Worth ($100)</h2>
            <select>
              <option value="usd">USD</option>
              <option value="gbp">GBP</option>
              <option value="eur">EUR</option>
              <option value="jpy">JPY</option>
            </select>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default index