import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

import { useDashBoard } from "../../../context/IncomeDashBoardContext";
import { useThemeColors } from "../../../pages/core/colors";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

function ScatterChart() {
  const { fetchIncome, getIncome } = useDashBoard();
  const [scatterPoints, setScatterPoints] = useState([]);
  const { borderGrey, lightBorder, darkGrey, bgColor, greyText, borderGrey2 } =
    useThemeColors();

  // Fetch income data on component mount
  useEffect(() => {
    fetchIncome();
  }, []);

  // Process income data when it updates
  useEffect(() => {
    if (Array.isArray(getIncome) && getIncome.length > 0) {
      const sorted = [...getIncome].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      const last20 = sorted.slice(-20); // Last 20 entries

      const points = last20.map((income, index) => ({
        x: index + 1,
        y: income.amount || 0,
        r: Math.min(Math.max((income.amount || 0) / 100, 5), 30),
      }));

      setScatterPoints(points);
    }
  }, [getIncome]);

  const data = {
    datasets: [
      {
        label: "Income Data",
        data: scatterPoints,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
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
        text: "Income Scatter Chart (Amount vs Entry Index)",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const { x, y, r } = context.raw;
            return `Index: ${x}, Amount: ₹${y}, Size: ${Math.round(r)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Income Entry Index",
        },
        ticks: {
          precision: 0,
        },
      },
      y: {
        title: {
          display: true,
          text: "Income Amount (₹)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={` ${borderGrey} w-full p-4 border rounded-lg`}>
      <h2 className="text-sm lg:text-lg font-semibold mb-4 text-center">
        Income Scatter Chart (Heatmap Style)
      </h2>
      <div className="w-full h-[250px] md:h-[380px] lg:h-[400px]">
        <Scatter data={data} options={options} />
      </div>
    </div>
  );
}

export default ScatterChart;
