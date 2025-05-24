import React from "react";
import { useDashboard } from "../../../context/DashBoardContext"; // Ensure the path is correct

function ExpenseDetails() {
  const { expenses, totalExpenses, totalExpenseTransactions, averageExpense } =
    useDashboard(); // Accessing the context

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-blue-900">
        💸 Expense Details
      </h2>

      {/* Display Total Expense Information */}
      <div className="mb-6">
        <p className="text-xl">Total Expenses: ₹{totalExpenses}</p>
        <p className="text-xl">
          Total Expense Transactions: {totalExpenseTransactions}
        </p>
        <p className="text-xl">Average Expense: ₹{averageExpense}</p>
      </div>

      {/* Expense Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full font-mono rounded-lg shadow-md">
          <thead className="bg-gradient-to-r from-red-700 to-red-900 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Source</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr key={expense._id} className="transition">
                  <td className="px-4 py-3 font-medium text-red-800 capitalize">
                    {expense.type}
                  </td>
                  <td className="px-4 py-3">₹{expense.amount}</td>
                  <td className="px-4 py-3">{expense.source}</td>
                  <td className="px-4 py-3">{expense.category}</td>
                  <td className="px-4 py-3">{expense.description || "-"}</td>
                  <td className="px-4 py-3">
                    {new Date(expense.addDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500 italic"
                >
                  No expense transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseDetails;
