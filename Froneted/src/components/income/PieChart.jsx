import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function PieChart() {
  // Hardcoded Data for the Pie Chart
  const chartData = {
    labels: ["Marketing", "Sales", "Development", "HR", "Operations"],
    datasets: [
      {
        label: "Random Data",
        data: [30, 20, 10, 25, 15], // Hardcoded data for segments
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${percentage}%`; // Tooltip shows percentage
          },
        },
      },
      datalabels: {
        color: "#000", // Set the label color to black
        font: {
          weight: "bold",
        },
        // Display the label (name) above the pie chart segment
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Pie Chart</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default PieChart;
