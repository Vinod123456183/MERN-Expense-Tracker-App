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

import { useDashBoard } from "../../../context/IncomeDashBoardContext";
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
  const { getIncome, fetchIncome } = useDashBoard();
  const [chartincomes, setChartincomes] = useState([]);

  useEffect(() => {
    fetchIncome();
  }, []);

  useEffect(() => {
    if (Array.isArray(getIncome) && getIncome.length > 0) {
      // Sort by createdAt ascending (oldest first)
      const sortedIncomes = [...getIncome].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      // Take last 8 incomes (latest ones)
      const last8 = sortedIncomes.slice(-8);

      // Map only needed fields
      const formatted = last8.map(({ addDate, amount, category }) => ({
        addDate,
        amount,
        category,
      }));

      setChartincomes(formatted);
    }
  }, [getIncome]);

  const data = {
    labels: chartincomes.map((item, index) => {
      const date = new Date(item.addDate);
      return isNaN(date.getTime())
        ? `Invalid (${index + 1})`
        : date.toLocaleDateString("en-IN");
    }),
    datasets: [
      {
        label: "Income Amount",
        data: chartincomes.map((item) => item.amount),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.6,
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
        text: "Last 8 Incomes (Area Chart)",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const income = chartincomes[context.dataIndex];
            const category = income?.category || "Income";
            return `${category}: ₹${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value}`,
        },
      },
    },
  };

  return (
    <div
      className={`w-full max-w-lg mx-auto p-4 border rounded-lg ${borderGrey}`}
    >
      <h2 className="text-sm lg:text-lg font-semibold mb-4 text-center">
        Last 8 Incomes (Area Chart)
      </h2>
      <div className="w-full h-[200px] sm:h-[200px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AreaChart;
