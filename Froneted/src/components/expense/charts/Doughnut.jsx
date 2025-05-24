import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useDashBoard } from "../../../context/ExpenseDashBoardContext";
import { useThemeColors } from "../../../pages/core/colors";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = () => {
  const { borderGrey, lightBorder, darkGrey, bgColor, greyText, borderGrey2 } =
    useThemeColors();

  const { fetchExpense, getExpense } = useDashBoard();
  const [categoryData, setCategoryData] = useState({
    labels: [],
    data: [],
    colors: [],
  });

  // Colors array to cycle through for categories
  const colorPalette = [
    "hsl(0, 70%, 60%)",
    "hsl(60, 70%, 60%)",
    "hsl(120, 70%, 60%)",
    "hsl(180, 70%, 60%)",
    "hsl(240, 70%, 60%)",
    "hsl(300, 70%, 60%)",
    "hsl(30, 70%, 60%)",
    "hsl(90, 70%, 60%)",
    "hsl(210, 70%, 60%)",
    "hsl(270, 70%, 60%)",
  ];

  useEffect(() => {
    fetchExpense();
  }, []);

  useEffect(() => {
    if (Array.isArray(getExpense) && getExpense.length > 0) {
      // Aggregate expenses by category
      const categoryTotals = getExpense.reduce((acc, curr) => {
        const category = curr.category || "Others";
        const amount = Number(curr.amount) || 0;
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      }, {});

      const labels = Object.keys(categoryTotals);
      const data = labels.map((label) => categoryTotals[label]);

      // Assign colors cycling through palette
      const colors = labels.map(
        (_, idx) => colorPalette[idx % colorPalette.length]
      );

      setCategoryData({ labels, data, colors });
    } else {
      // If no expenses, reset to empty
      setCategoryData({ labels: [], data: [], colors: [] });
    }
  }, [getExpense]);

  const data = {
    labels: categoryData.labels,
    datasets: [
      {
        label: "Expenses by Category",
        data: categoryData.data,
        backgroundColor: categoryData.colors,
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Expenses by Category",
      },
      legend: {
        position: "bottom",
        labels: {
          padding: 20, // Add padding between legend items and chart
          boxWidth: 20, // controls legend box size if needed
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "Category";
            const value = context.raw || 0;
            return `${label}: ₹${value}`;
          },
        },
      },
    },
  };

  return (
    <div
      className={`w-full ${borderGrey}  max-w-lg mx-auto p-4 border rounded-lg`}
    >
      <h2 className="text-sm lg:text-lg font-semibold mb-2 text-center">
        Category-wise Expense Distribution
      </h2>
      <div className="w-full h-[200px] sm:h-[270px] ">
        {categoryData.labels.length > 0 ? (
          <Doughnut data={data} options={options} />
        ) : (
          <p className="text-center text-gray-500">No expense data available</p>
        )}
      </div>
    </div>
  );
};

export default DoughnutChart;
