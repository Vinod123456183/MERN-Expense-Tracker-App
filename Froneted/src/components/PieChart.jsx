import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDashBoard } from "../context/IncomeDashBoardContext";
import { useThemeColors } from "../pages/core/colors";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const { recentTransitionOfIncomeExpense, recentTransactions } =
    useDashBoard();
  const { borderGrey, greyText } = useThemeColors();
  const [chartData, setChartData] = useState(null);
  const [showFullLegend, setShowFullLegend] = useState(false);

  useEffect(() => {
    recentTransitionOfIncomeExpense();
  }, []);

  useEffect(() => {
    if (Array.isArray(recentTransactions) && recentTransactions.length > 0) {
      const categoryMap = {};

      // Group amounts by category
      recentTransactions.forEach((tx) => {
        const category = tx.category || tx.title || "Uncategorized";
        const amount = parseFloat(tx.amount || 0);
        if (categoryMap[category]) {
          categoryMap[category] += amount;
        } else {
          categoryMap[category] = amount;
        }
      });

      const labels = Object.keys(categoryMap);
      const data = Object.values(categoryMap);

      const backgroundColors = [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#F77825",
        "#8BC34A",
        "#00ACC1",
        "#E91E63",
        "#9C27B0",
        "#C2185B",
        "#009688",
        "#FF9800",
        "#795548",
        "#607D8B",
      ].slice(0, labels.length);

      setChartData({
        labels,
        datasets: [
          {
            label: "Transaction Distribution",
            data,
            backgroundColor: backgroundColors,
            borderWidth: 1,
          },
        ],
      });
    }
  }, [recentTransactions]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: $${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      className={`p-3 min-h-[393px]  font-raleway pt-4 border w-full max-w-xs sm:max-w-sm md:max-w-3xl mx-auto ${borderGrey} ${greyText} rounded-lg`}
    >
      <p className="p-2 text-lg font-semibold">Transaction Distribution</p>

      {chartData ? (
        <div className="flex w-full flex-col lg:flex-row items-center justify-between space-x-6">
          {/* Pie Chart */}
          <div className="relative w-[80%] h-64 sm:h-72 md:h-80">
            <Pie data={chartData} options={chartOptions} />
          </div>

          {/* Custom Legend with Text Truncation */}
          <div className="w-[30%] space-y-3 text-sm">
            {(showFullLegend
              ? chartData.labels
              : chartData.labels.slice(0, 5)
            ).map((label, index) => {
              // Truncate label text to a max length (e.g., 8 characters)
              const truncatedLabel =
                label.length > 8 ? label.slice(0, 8) + "..." : label;

              return (
                <div key={index} className="flex items-center gap-2">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        chartData.datasets[0].backgroundColor[index],
                    }}
                  ></span>
                  <span>{truncatedLabel}</span>
                </div>
              );
            })}

            {/* Show the toggle button only if there are more than 5 categories */}
            {chartData.labels.length > 5 && (
              <button
                className="text-xs text-blue-500 hover:underline mt-1"
                onClick={() => setShowFullLegend((prev) => !prev)}
              >
                {showFullLegend
                  ? "Show Less"
                  : `+${chartData.labels.length - 5} more`}
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500">Loading chart...</p>
      )}
    </div>
  );
}

export default PieChart;
