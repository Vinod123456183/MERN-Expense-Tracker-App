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

import { useDashBoard } from "../../../context/ExpenseDashBoardContext";
import { useThemeColors } from "../../../pages/core/colors";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Histogram() {
  const { borderGrey, lightBorder, darkGrey, bgColor, greyText, borderGrey2 } =
    useThemeColors();

  const { getExpense, fetchExpense } = useDashBoard();
  const [chartExpenses, setChartExpenses] = useState([]);

  // Fetch expenses on mount
  useEffect(() => {
    fetchExpense();
  }, []);

  // Update chartExpenses when getExpense changes
  useEffect(() => {
    if (Array.isArray(getExpense) && getExpense.length > 0) {
      // Sort by createdAt (reverse order to get most recent first)
      const sorted = [...getExpense].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setChartExpenses(sorted.slice(0, 8)); // First 8 most recent entries
    }
  }, [getExpense]);

  const labels = chartExpenses
    .map((expense) => {
      const date = new Date(expense.createdAt); // Use createdAt for the label
      return isNaN(date.getTime())
        ? "Invalid Date"
        : date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          });
    })
    .reverse(); // Reverse the labels to display the most recent at the left

  const fullDates = chartExpenses
    .map((expense) => {
      const date = new Date(expense.createdAt); // Use createdAt for the full date
      return date.toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    })
    .reverse(); // Reverse full dates too

  const dataValues = chartExpenses.map((item) => item.amount).reverse(); // Reverse data values

  const backgroundColors = chartExpenses
    .map((item) =>
      item.amount > 1000 ? "#e74c3c" : item.amount > 500 ? "#f1c40f" : "#2ecc71"
    )
    .reverse(); // Reverse background colors to match the data

  const chartData = {
    labels,
    datasets: [
      {
        label: "Expense (₹)",
        data: dataValues,
        backgroundColor: backgroundColors,
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
            const fullDate = fullDates[context.dataIndex];
            return `${fullDate}: ₹${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 180,
          callback: (value) => `₹${value}`,
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: "Expense Amount",
        },
      },
      x: {
        title: {
          display: false,
          text: "Date",
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div
      className={`w-full max-w-lg mx-auto p-4 border rounded-lg ${borderGrey} `}
    >
      <h2 className="text-sm lg:text-lg font-semibold mb-4 text-center">
        Expense Histogram (Most Recent First)
      </h2>
      <div className="h-[200px] sm:h-[250px] lg:h-[280px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default Histogram;
