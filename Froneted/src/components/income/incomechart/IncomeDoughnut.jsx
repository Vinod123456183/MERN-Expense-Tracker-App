import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useDashBoard } from "../../../context/IncomeDashBoardContext";
import { useThemeColors } from "../../../pages/core/colors";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = () => {
  const { borderGrey, lightBorder, darkGrey, bgColor, greyText, borderGrey2 } =
    useThemeColors();

  const { fetchIncome, getIncome } = useDashBoard();
  const [categoryData, setCategoryData] = useState({
    labels: [],
    data: [],
    colors: [],
  });

  // Fetch income on mount
  useEffect(() => {
    fetchIncome();
  }, []);

  // Process category-wise income totals from getIncome
  useEffect(() => {
    if (Array.isArray(getIncome) && getIncome.length > 0) {
      const categoryMap = {};

      getIncome.forEach((income) => {
        const category = income.category || "Uncategorized";
        const amount = income.amount || 0;
        if (!categoryMap[category]) {
          categoryMap[category] = 0;
        }
        categoryMap[category] += amount;
      });

      const labels = Object.keys(categoryMap);
      const data = Object.values(categoryMap);

      // Consistent and distinct colors
      const baseColors = [
        "#36A2EB", // Sky blue
        "#FF6384", // Pink/red
        "#FFCE56", // Yellow
        "#4BC0C0", // Teal
        "#9966FF", // Purple
        "#FF9F40", // Orange
        "#00C49F", // Greenish
        "#C0C0C0", // Grey
      ];

      const colors = labels.map(
        (_, index) => baseColors[index % baseColors.length]
      );

      setCategoryData({ labels, data, colors });
    }
  }, [getIncome]);

  const data = {
    labels: categoryData.labels,
    datasets: [
      {
        label: "Incomes by Category",
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
        text: "Incomes by Category",
      },
      legend: {
        position: "bottom",
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
      className={`w-full max-w-lg mx-auto p-4 border rounded-lg ${borderGrey} `}
    >
      <h2 className="text-sm lg:text-lg font-semibold mb-4 text-center">
        Category-wise Income Distribution
      </h2>
      <div className="w-full h-[200px] sm:h-[200px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
