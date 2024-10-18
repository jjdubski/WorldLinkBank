import React, { useState, useEffect } from "react";
import "./networth.css";
import NetworthGraph from "./networthGraph";
import NetworthList from "./networthList";

const Networth = () => {
    // Load holdings from localStorage or set default values
    const [holdings, setHoldings] = useState(() => {
        const savedHoldings = localStorage.getItem('holdings');
        return savedHoldings ? JSON.parse(savedHoldings) : {
            USD: 10.81,
            EUR: 81.75,
            GBP: 19.41,
            JPY: 9.40,
            AUD: 190.34,
        };
    });

    // Update localStorage whenever holdings change
    useEffect(() => {
        localStorage.setItem('holdings', JSON.stringify(holdings));
    }, [holdings]);

    // Function to update holdings when changes occur
    const handleUpdate = (currency, value) => {
        setHoldings((prevHoldings) => {
            const updatedHoldings = {
                ...prevHoldings,
                [currency]: parseFloat(value) || 0,
            };
            console.log("Updated Holdings in Networth:", updatedHoldings); // Log updated state
            return updatedHoldings;
        });
    };

    return (
        <div className='networth'>
            <NetworthList holdings={holdings} onUpdate={handleUpdate} />
            <NetworthGraph holdings={holdings} />
        </div>
    );
};

export default Networth;
