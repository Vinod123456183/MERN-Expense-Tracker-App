import React, { useEffect } from "react";
import { useDashBoard } from "../../../context/ExpenseDashBoardContext";
import { useThemeColors } from "../../../pages/core/colors";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

function RecentTransitions() {
  const { fetchExpense, getExpense } = useDashBoard();

  const { borderGrey, lightBorder, darkGrey, bgColor, greyText, borderGrey2 } =
    useThemeColors();

  useEffect(() => {
    fetchExpense(); // fetch once on mount
  }, []);

  // Prepare and sort the latest 8 expense transactions
  const recentExpenses = Array.isArray(getExpense)
    ? getExpense
        .map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt || item.addDate),
        }))
        .filter((item) => !isNaN(item.createdAt))
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 7)
    : [];

  return (
    <div
      className={`w-full mx-auto p-2 border ${borderGrey} rounded-lg shadow-md  `}
    >
      <h2 className="text-2xl pt-4 pb-4 font-semibold text-red-700 px-2">
        💸 Expense Transactions
      </h2>
      <div className="overflow-x-auto h-[443px] gap-5 ">
        <table className="min-w-full font-mono text-sm  font-semibold rounded-lg">
          <thead className="bg-gradient-to-r from-red-600 to-red-800 text-white  ">
            <tr>
              <th className="px-3 py-3 text-left ">Type</th>
              <th className="px-3 py-3 text-left hidden lg:table-cell">Amount</th>
              <th className="px-3 py-3 text-left hidden lg:table-cell">
                Source
              </th>
              <th className="px-3 py-3 text-left hidden lg:table-cell">
                Trans-Type
              </th>
              <th className="px-3 py-3 text-left ">Category</th>
              <th className="px-3 py-3 text-left hidden lg:table-cell">
                Description
              </th>
              <th className="px-3 py-3 text-left ">Date</th>
              <th className="px-3 py-3 text-left ">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y   ">
            {recentExpenses.length > 0 ? (
              recentExpenses.map((item) => (
                <tr key={item._id} className="border-b transition">
                  <td className="px-3 py-2 text-red-700 font-semibold capitalize  ">
                    {(item.type || "Expense")?.length > 15
                      ? item.type.slice(0, 15) + "..."
                      : item.type || "Expense"}
                  </td>
                  <td className="px-3 py-2 hidden lg:table-cell">
                    ₹{item.amount?.toFixed(2).toString().slice(0, 10) || "0.00"}
                  </td>
                  <td
                    className={`hidden lg:table-cell px-4 py-3   lg:table-cell${
                      item.source?.toLowerCase() === "online"
                        ? "text-fuchsia-600"
                        : "text-painful-red"
                    }`}
                  >
                    {item.source?.length > 15
                      ? item.source.slice(0, 15) + "..."
                      : item.source || "-"}
                  </td>

                  <td className="px-3 py-2 pt-5 pb-5 text-algae-green hidden lg:table-cell">
                    Debit
                  </td>
                  <td className="px-3 py-2 pt-5 pb-5">
                    {item.category?.length > 5
                      ? item.category.slice(0, 5) + "..."
                      : item.category || "-"}
                  </td>
                  <td className="px-3 py-2 pt-5 pb-5 hidden lg:table-cell">
                    {(item.description || "-")?.length > 5
                      ? item.description.slice(0, 5) + "..."
                      : item.description || "-"}
                  </td>
                  <td className="px-3 py-2 pt-5 pb-5">
                    {new Date(item.addDate).toLocaleDateString("en-IN")}
                  </td>

                  <td className="px-4 py-3 flex justify-end   w-full  gap-2">
                    <button
                      onClick={() => {
                        alert(
                          `Edit functionality for ${item._id} (not implemented yet)`
                        );
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        setItemToDelete(item);
                        setShowModal(true);
                      }}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 
                   italic"
                >
                  No expense transactions found . Please Spend Some Money
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransitions;
