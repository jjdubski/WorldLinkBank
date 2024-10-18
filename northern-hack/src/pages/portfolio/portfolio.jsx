import React from "react";
import "./portfolio.css";
import Networth from "../../components/networth/Networth";

import Navbar from "../../components/navbar/Navbar";

const Portfolio = () => {
    return (
        <>
        <Navbar/>
        <div className='portfolio'>
            <Networth/>
        </div>
        </>
    )
}

export default Portfolio;