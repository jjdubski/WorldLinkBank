import React, { useState } from 'react'
import "./prediction.css"

const Prediction = () => {
  const [findDate, setFindDate] = useState("")

  const handleDateChange = (event) => {
    setFindDate(event.target.value);
  }

  return (
    <div className='prediction-cont'>
        <p className="prediction-title">FX Prediction Model</p>
        <div className="prediction-display">
            <div className="prediction-search-output">

                <div className="prediction-results-table">
                    <div className="prediction-result">
                        <div className="rate-current">{results.JYP}</div>
                        <div className="currency-name">(¥) JYP</div>
                    </div>
                    <div className="prediction-result">
                        <div className="rate-current">{results.EUR}</div>
                        <div className="currency-name">(€) EUR</div>
                    </div>
                    <div className="prediction-result">
                        <div className="rate-current">{results.GBP}</div>
                        <div className="currency-name">(£) GBP</div>
                    </div>
                    <div className="prediction-result">
                    <div className="rate-current">{results.AUD}</div>
                    <div className="currency-name">(AU$) AUD</div>
                    </div>
                </div>

                <p className='info-panel'>Compared to $1 USD</p>
                <div className="prediction-search-dict">
                <div className="converter">
                        <p className="label-text">Date</p>
                        <input
                            className="input-style"
                            id="date"
                            value={findDate}
                            onChange={handleDateChange}
                            placeholder="mm/yyyy"
                        />
                    </div>
                    <div className="submit-date">Run</div>
            </div>
            </div>
            
        </div>
    </div>
  )
}

export default Prediction