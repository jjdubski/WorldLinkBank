import React from "react";
import "./networth.css";
import NetworthGraph from "./networthGraph";
import NetworthList from "./networthList";

const Networth = () => {
    return (
        <div className='networth'>
            <NetworthList/>
            <NetworthGraph/>
        </div>
    )
}

export default Networth;

