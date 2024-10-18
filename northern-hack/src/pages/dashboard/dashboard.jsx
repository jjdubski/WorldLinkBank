import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import Prediction from "../../components/prediction/Prediction";

const Dashboard = () => {
    return (
        <>
        <Navbar/>
        <Prediction/>
        </>
    )
}

export default Dashboard;