import React from "react";
import "./networth.css";
import NetworthGraph from "./networthGraph";
import NetworthList from "./networthList";

const Networth = () => {
    return (
        <div className='networth'>
            <NetworthGraph/>
            <NetworthList/>
        </div>
    )
}

export default Networth;

