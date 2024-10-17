
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/chart/Chart'
import "./index.css"
import Welcome from '../../components/welcome/Welcome';



const Index = () => {
//   const [data, setData] = useState(null); // State to hold fetched data
//   const [error, setError] = useState(null); // State to hold any potential errors

//   useEffect(() => {
//     // Function to fetch data
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/api/fx-rates');
//         setData(response.data); 
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError(error); 
//       }
//     };

//     fetchData(); 
//   }, []); 

//   if (error) {
//     return <div>Error fetching data: {error.message}</div>;
//   }

//   if (!data) {
//     return <div>Loading...</div>; 
//   }

  return (
    <>
    <Navbar/>
    <Welcome/>
    <Chart/>
    </>
  )
}

export default Index;
