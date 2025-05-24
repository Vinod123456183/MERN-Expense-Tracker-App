import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDashBoard } from "../../../context/ExpenseDashBoardContext";
import { useThemeColors } from "../../../pages/core/colors";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
  Title
);

const AreaChart = () => {
  const { borderGrey, lightBorder, darkGrey, bgColor, greyText, borderGrey2 } =
    useThemeColors();

  const { fetchExpense, getExpense } = useDashBoard();
  const [expenseData, setExpenseData] = useState([]);

  // Fetch expenses on mount
  useEffect(() => {
    fetchExpense();
  }, []);

  // Update expenseData when getExpense changes
  useEffect(() => {
    if (Array.isArray(getExpense) && getExpense.length > 0) {
      // Sort by createdAt in descending order to get most recent first
      const sorted = [...getExpense].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setExpenseData(sorted.slice(0, 8)); // Get the last 8 most recent expenses
    }
  }, [getExpense]);

  // Format the labels (dates) in reverse chronological order
  const labels = expenseData
    .map((expense) => {
      const date = new Date(expense.createdAt || expense.date); // Ensure using createdAt for sorting
      return isNaN(date.getTime())
        ? "Invalid Date"
        : date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
    })
    .reverse(); // Reverse so the most recent is on the left

  // Full date format for tooltips
  const fullDates = expenseData
    .map((expense) => {
      const date = new Date(expense.createdAt || expense.date);
      return date.toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    })
    .reverse(); // Reverse full dates as well for tooltip

  // Expense amounts
  const dataValues = expenseData.map((item) => item.amount).reverse(); // Reverse data values

  const data = {
    labels,
    datasets: [
      {
        label: "Expense Amount",
        data: dataValues,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)", // Area color
        borderColor: "rgba(75,192,192,1)", // Line color
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Last 8 Expenses (Area Chart)",
      },
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
      x: {
        reverse: false, // Most recent expense will be on the left
        title: {
          display: false,
          text: "Date",
        },
        ticks: {
          maxRotation: 30,
          minRotation: 0,
          font: {
            size: 10, // 👈 Smaller X-axis label size
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value}`,
          font: {
            size: 10, // 👈 Smaller Y-axis label size
          },
        },
        title: {
          display: true,
          text: "Expense Amount",
        },
      },
    },
  };

  return (
    <div
      className={`w-full max-w-lg mx-auto p-4 border rounded-lg ${borderGrey} `}
    >
      <h2 className="text-sm lg:text-lg font-semibold mb-4 text-center">
        Last 8 Expenses (Area Chart)
      </h2>
      <div className="w-full h-[190px] sm:h-[200px] lg:h-[270px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AreaChart;
