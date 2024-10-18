import React from "react";
import "./trade.css";
import Navbar from "../../components/navbar/Navbar";
import TradeUI from "../../components/tradeUI/TradeUI";

const Trade = () => {
    return (
        <>
        <Navbar/>
        <div className='trade'>
            <TradeUI/>
        </div>
        </>
    )
}

export default Trade;