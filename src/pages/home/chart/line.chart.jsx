import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  const dataSouce = {
    labels: ["0", ...data?.map((e) => e?.date)],
    datasets: [
      {
        label: "Số lượng dải IP",
        data: [0, ...data?.map((e) => e?.count)], // Replace with actual data values
        fill: false, // Set to 'true' for a filled line chart
        backgroundColor: "#007bff", // Adjust color as needed
        borderColor: "#007bff", // Match border color with background
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    title: {
      display: true,
      text: "SrcCount Over Time", // Adjust title as needed
    },
    scales: {
      //   yAxes: [
      //     {
      //       ticks: {
      //         beginAtZero: true, // Start y-axis from 0
      //       },
      //     },
      //   ],
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return <Bar data={dataSouce} options={options} height={200} width={800} />;
};

export default LineChart;
