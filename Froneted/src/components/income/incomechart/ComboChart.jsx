import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useDashBoard } from "../../../context/IncomeDashBoardContext";
import { useThemeColors } from "../../../pages/core/colors";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement
);

function ComboChart() {
  const { borderGrey, lightBorder, darkGrey, bgColor, greyText, borderGrey2 } =
    useThemeColors();

  const { getIncome, fetchIncome } = useDashBoard();
  const [processedData, setProcessedData] = useState({
    labels: [],
    amounts: [],
    cumulative: [],
  });

  // Fetch income data on mount
  useEffect(() => {
    fetchIncome();
  }, []);

  // Process income data when it changes
  useEffect(() => {
    if (Array.isArray(getIncome) && getIncome.length > 0) {
      const sortedIncomes = [...getIncome].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      ); // oldest to newest

      const last8 = sortedIncomes.slice(-8);

      const labels = last8.map((item, index) => {
        const date = new Date(item.addDate || item.createdAt);
        return isNaN(date)
          ? `Invalid (${index + 1})`
          : date.toLocaleDateString("en-IN");
      });

      const amounts = last8.map((item) => item.amount || 0);

      const cumulative = amounts.reduce((acc, curr, index) => {
        acc.push((acc[index - 1] || 0) + curr);
        return acc;
      }, []);

      setProcessedData({ labels, amounts, cumulative });
    }
  }, [getIncome]);

  const data = {
    labels: processedData.labels,
    datasets: [
      {
        type: "bar",
        label: "Income Amount (₹)",
        data: processedData.amounts,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Cumulative Income (₹)",
        data: processedData.cumulative,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.3,
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Combo Chart: Income & Cumulative Growth",
      },
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            return `${label}: ₹${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (val) => `₹${val}`,
        },
      },
    },
  };

  return (
    <div className={`w-full mx-auto p-4 border rounded-lg  ${borderGrey}`}>
      <h2 className="text-sm lg:text-lg font-semibold mb-4 text-center">
        Income Combo Chart
      </h2>
      <div className="w-full h-[250px] md:h-[380px] lg:h-[400px]">
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
}

export default ComboChart;
