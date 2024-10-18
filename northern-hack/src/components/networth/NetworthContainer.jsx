import React, { useState } from "react";
import NetworthList from "./networthList";
import NetworthGraph from "./networthGraph";

const NetworthContainer = () => {
    // Properly initializing holdings
    const [holdings, setHoldings] = useState({
        USD: 10.81,
        EUR: 81.75,
        GBP: 19.41,
        JPY: 9.40,
        AUD: 190.34,
    });

    // Method to update the holdings
    const handleUpdate = (currency, value) => {
        setHoldings((prevHoldings) => {
            return {
                ...prevHoldings,
                [currency]: parseFloat(value) || 0,
            };
        });
    };

    return (
        <div className="networth-container">
            <NetworthList holdings={holdings} onUpdate={handleUpdate} />
            <NetworthGraph holdings={holdings} />
        </div>
    );
};

export default NetworthContainer;
