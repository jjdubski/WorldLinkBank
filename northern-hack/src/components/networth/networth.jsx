import React, { useEffect, useState } from "react";
import axios from "axios";
import "./networth.css";
import NetworthGraph from "./networthGraph";
import NetworthList from "./networthList";

const Networth = () => {
    const [holdings, setHoldings] = useState(() => {
        const savedHoldings = localStorage.getItem("holdings");
        return savedHoldings ? JSON.parse(savedHoldings) : {
            USD: 100,
            EUR: 100,
            GBP: 100,
            JPY: 5000,
            AUD: 100,
        };
    });

    const [totalHoldingsUSD, setTotalHoldingsUSD] = useState(null);
    const [equivalentInUSD, setEquivalentInUSD] = useState(() => {
        const savedEquivalent = localStorage.getItem("equivalentInUSD");
        return savedEquivalent ? JSON.parse(savedEquivalent) : {};
    });

    useEffect(() => {
        const calculateTotalHoldings = async () => {
            try {
                let total = 0;
                const newEquivalentInUSD = {};

                for (const [currency, amount] of Object.entries(holdings)) {
                    if (currency === "USD") {
                        total += parseFloat(amount);
                        newEquivalentInUSD[currency] = parseFloat(amount);
                    } else {
                        const response = await axios.get(
                            `http://127.0.0.1:5000/fx_rates/convert?base_currency=${currency}&target_currency=USD&amount=${amount}`
                        );

                        if (response.status === 200) {
                            const { converted_amount } = response.data;
                            total += converted_amount;
                            newEquivalentInUSD[currency] = converted_amount;
                        } else {
                            console.error("Error fetching exchange rate for", currency);
                        }
                    }
                }

                setTotalHoldingsUSD(total.toFixed(2));
                setEquivalentInUSD(newEquivalentInUSD);

                // Cache equivalentInUSD in local storage
                localStorage.setItem("equivalentInUSD", JSON.stringify(newEquivalentInUSD));
            } catch (error) {
                console.error("Error calculating total holdings:", error);
            }
        };

        calculateTotalHoldings();

        // Cache holdings in local storage whenever they change
        localStorage.setItem("holdings", JSON.stringify(holdings));
    }, [holdings]);

    const handleUpdateHoldings = (currency, value) => {
        setHoldings((prevHoldings) => ({
            ...prevHoldings,
            [currency]: value,
        }));
    };

    return (
        <div className='networth'>
            <div className="chart">
                <h2 className="chart-title">
                    Total Holdings in USD: ${totalHoldingsUSD || "Loading..."}
                </h2>
                <NetworthList holdings={holdings} onUpdate={handleUpdateHoldings} equivalentInUSD={equivalentInUSD} /> 
            </div>
            <NetworthGraph equivalentInUSD={equivalentInUSD} />
        </div>
    );
};

export default Networth;
