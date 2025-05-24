import React, { useEffect } from "react";
import { useDashBoard } from "../context/IncomeDashBoardContext";
import { useThemeColors } from "../pages/core/colors";

function LatestTransition() {
  const { borderGrey, greyText } = useThemeColors();

  const { recentTransitionOfIncomeExpense, recentTransactions } =
    useDashBoard();

  useEffect(() => {
    recentTransitionOfIncomeExpense();
  }, []);

  return (
    <div
      className={`p-4 min-h-[393px] border ${borderGrey}  font-raleway rounded-lg shadow-md`}
    >
      <p className="text-lg font-semibold    mb-4">Recent Transactions</p>

      <div className="overflow-x-auto  ">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="   ">
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.isArray(recentTransactions) &&
            recentTransactions.length > 0 ? (
              recentTransactions.slice(0, 7).map((tx, index) => (
                <tr key={tx._id || index} className=" ">
                  <td className="py-3 px-4">
                    <span
                      className={`font-medium ${
                        tx.type === "Income"
                          ? "text-algae-green"
                          : "text-red-500"
                      }`}
                    >
                      {tx.type || "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    ₹{tx.amount?.toFixed(2) || "0.00"}
                  </td>
                  <td className="py-3 px-4">
                    {(tx.category || tx.title || "N/A").length > 11
                      ? (tx.category || tx.title || "N/A").slice(0, 11) + "..."
                      : tx.category || tx.title || "N/A"}
                  </td>

                  <td className="py-3 px-4">
                    {tx.createdAt || tx.addDate
                      ? new Date(tx.addDate || tx.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-4 px-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No recent transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LatestTransition;
