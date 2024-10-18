import React from "react";
import "./tradeUI.css";

const TradeUI = () => {
    return (
        <div className='tradeUI'>
            <div className="options">
                <div className='option1'>
                    <select className='dropdown'>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                        <option value="aud">AUD</option>
                        <option value="gbp">GBP</option>
                        <option value="jpy">JPY</option>
                    </select>
                </div>

                <p>--to--</p>
                <div className='option2'>
                    <select className='dropdown'>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                        <option value="aud">AUD</option>
                        <option value="gbp">GBP</option>
                        <option value="jpy">JPY</option>
                    </select>
                </div>
            </div>
            <div className="result">
                <p> = x amount of x currency</p>
            </div>
        </div>
    )
}

export default TradeUI;