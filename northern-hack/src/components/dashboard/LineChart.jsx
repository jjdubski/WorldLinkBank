import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // Make sure this import is here

function LineChart({ chartData }) {
  // Extract Dates (for x-axis)
  const dates = chartData.map((data) => data.Date);

  // Prepare datasets for each currency
  const data = {
    labels: dates, // x-axis values (dates)
    datasets: [
      {
        label: "JPY", // Label for the line
        data: chartData.map((data) => data.JPY), // y-axis values (JPY exchange rates)
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4, // Smoothing the line
      },
      {
        label: "EUR", // Label for the line
        data: chartData.map((data) => data.EUR), // y-axis values (EUR exchange rates)
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "GBP",
        data: chartData.map((data) => data.GBP), // y-axis values (GBP exchange rates)
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.4,
      },
      {
        label: "AUD",
        data: chartData.map((data) => data.AUD), // y-axis values (AUD exchange rates)
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Currency Exchange Rates Over Time</h2>
      <Line
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Exchange Rates of JPY, EUR, GBP, AUD",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date', // Label for x-axis
              },
            },
            y: {
              title: {
                display: true,
                text: 'Exchange Rate', // Label for y-axis
              },
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;









// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto"; // Ensure that chart.js is correctly imported

// function LineChart({ chartData }) {
//   const data = {
//     labels: chartData.map((data) => data.year), // x-axis (years)
//     datasets: [
//       {
//         label: "Users Gained",
//         data: chartData.map((data) => data.userGain), // y-axis (user gain)
//         borderColor: "rgba(75,192,192,1)",
//         backgroundColor: "rgba(75,192,192,0.2)",
//         tension: 0.4, // To make the line smoother
//       },
//     ],
//   };

//   return (
//     <div className="chart-container">
//       <h2 style={{ textAlign: "center" }}>Line Chart</h2>
//       <Line
//         data={data}
//         options={{
//           plugins: {
//             title: {
//               display: true,
//               text: "Users Gained between 2016-2020",
//             },
//             legend: {
//               display: true,
//               position: "bottom",
//             },
//           },
//         }}
//       />
//     </div>
//   );
// }

// export default LineChart;
