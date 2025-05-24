import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";
import { useThemeColors } from "../../../pages/core/colors";
import { useDashBoard } from "../../../context/IncomeDashBoardContext";

function DetailIncomeTransitio() {
  const { fetchIncome, getIncome } = useDashBoard();
  const { borderGrey, whiteTxt, greyText } = useThemeColors();

  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchIncome(); // Call this only once on mount
  }, []);

  // Prepare transactions (ensure they are valid dates & sorted)
  const allTransactions = Array.isArray(getIncome)
    ? getIncome
        .map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt || item.addDate),
        }))
        .filter((item) => !isNaN(item.createdAt))
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 9)
    : [];

  const handleDelete = () => {
    if (itemToDelete) {
      console.log(`Deleted income transaction with ID: ${itemToDelete._id}`);
      // Normally: await axios.delete(`/api/income/${itemToDelete._id}`)
      setItemToDelete(null);
    }
    setShowModal(false);
  };

  return (
    <div className="p-4  ">
      <h2 className="text-3xl font-semibold mb-6 text-yellow-700">
        💰 Income Transactions
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full font-mono rounded-lg shadow-md">
          <thead
            className={`bg-gradient-to-r from-blue-700 to-blue-900 ${whiteTxt}`}
          >
            <tr>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="hidden lg:table-cell px-4 py-3 text-left">
                Source
              </th>
              <th className="hidden lg:table-cell px-4 py-3 text-left">
                Transaction Type
              </th>
              <th className="hidden lg:table-cell px-4 py-3 text-left">
                Category
              </th>
              <th className="hidden lg:table-cell px-4 py-3 text-left">
                Description
              </th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {allTransactions.length > 0 ? (
              allTransactions.map((item) => (
                <tr
                  key={item._id}
                  className={`transition ${greyText} dark:hover:bg-gray-700`}
                >
                  <td className="px-4 py-3 font-medium text-blue-600 capitalize">
                    {item.type?.length > 15
                      ? item.type.slice(0, 15) + "..."
                      : item.type}
                  </td>
                  <td className="px-4 py-3">
                    ₹{item.amount.toString().slice(0, 10)}
                  </td>
                  <td
                    className={`hidden lg:table-cell px-4 py-3 ${
                      item.source?.toLowerCase() === "online"
                        ? "text-fuchsia-500"
                        : "text-painful-red"
                    }`}
                  >
                    {item.source?.length > 15
                      ? item.source.slice(0, 15) + "..."
                      : item.source}
                  </td>

                  <td className="hidden lg:table-cell px-4 py-3 text-algae-green ">
                    Credit
                  </td>
                  <td className="hidden lg:table-cell px-4 py-3">
                    {item.category?.length > 10
                      ? item.category.slice(0, 10) + "..."
                      : item.category}
                  </td>
                  <td className="hidden lg:table-cell px-4 py-3">
                    {(item.description || "-")?.length > 15
                      ? item.description.slice(0, 15) + "..."
                      : item.description || "-"}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(item.addDate).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 flex items-center gap-2">
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
                  colSpan="8"
                  className="text-center p-6 text-gray-500 italic"
                >
                  No income transactions found. Go earn some rupees! 💸
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this transaction?"
      />
    </div>
  );
}

export default DetailIncomeTransitio;
