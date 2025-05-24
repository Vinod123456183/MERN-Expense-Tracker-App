import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { useDashBoard } from "../../../context/IncomeDashBoardContext";
import { useThemeColors } from "../../../pages/core/colors";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Histogram() {
  const { borderGrey, lightBorder, darkGrey, bgColor, greyText, borderGrey2 } =
    useThemeColors();

  const [chartincomes, setChartincomes] = useState([]);
  const { getIncome, fetchIncome } = useDashBoard();

  useEffect(() => {
    fetchIncome();
  }, []);

  // reviosoon

  useEffect(() => {
    if (Array.isArray(getIncome) && getIncome.length > 0) {
      const sortedIncomes = [...getIncome].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      const last8 = sortedIncomes.slice(-8);
      setChartincomes(last8);
    }
  }, [getIncome]);

  const chartData = {
    labels: chartincomes.map((_, index) => `${index + 1}`), // '1' to '8'
    datasets: [
      {
        label: "Income Amount",
        data: chartincomes.map((item) => item.amount),
        backgroundColor: chartincomes.map(
          (item) =>
            item.amount > 5000
              ? "#e74c3c" // Red
              : item.amount > 3000
              ? "#8e44ad" // Purple for very high amounts
              : item.amount > 2000
              ? "#e67e22" // Orange
              : item.amount > 1000
              ? "#f1c40f" // Yellow
              : "#0099f9" // Sky Blue (default, <= 1000)
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const expense = chartincomes[context.dataIndex];
            const category = expense?.category || "Income";
            return `${category}: ₹${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
          callback: (value) => `₹${value}`,
        },
      },
      x: {
        ticks: {
          callback: (val, index) => chartData.labels[index],
        },
      },
    },
  };

  return (
    <div
      className={`w-full  max-w-lg mx-auto  p-4 border ${borderGrey} rounded-lg`}
    >
      <h2 className="text-sm lg:text-lg font-semibold mb-4 text-center">
        Last 8 Incomes
      </h2>
      <div className="w-full h-[200px] sm:h-[200px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default Histogram;
