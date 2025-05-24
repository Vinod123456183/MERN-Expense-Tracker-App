import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Histogram from "../../components/expense/charts/Histogram";
import AreaChart from "../../components/expense/charts/AreaChart";
import SideBar from "../core/SideBar";
import { useThemeColors } from "../core/colors";
import Doughnut from "../../components/expense/charts/Doughnut";
import RecentExponseTransition from "../../components/expense/Detail Box/RecentExponseTransition";
import BalanceComponent from "../../components/BalanceComponent";
import { useDashBoard } from "../../context/ExpenseDashBoardContext";
import { FiPlus } from "react-icons/fi";
import Header from "../core/Header";
import { ADD_EXPENSE } from "../../APIS/expense-routes-api";
import { motion, useInView } from "framer-motion";

// ✅ Reusable scroll animation wrapper
const ScrollAnimationWrapper = ({ children, delay = 0.3 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};
const formatDate = (date) => {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

function Expense() {
  const { borderGrey, darkGrey, greyText, borderGrey2 } = useThemeColors();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [addDate, setAddDate] = useState(() => formatDate(new Date()));
  const [description, setDescription] = useState("");

  const {
    totalExpense,
    totalExpenseAmount,
    last30DaysTotal,
    Last30Days,
    averageOFTheExpense,
    averageExpenseTotal,
  } = useDashBoard();

  useEffect(() => {
    totalExpense();
    Last30Days();
    averageOFTheExpense();
  }, []);

  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setExpanded(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const submitExpenseDetails = async (e) => {
    e.preventDefault();

    const payload = {
      amount: Number(amount),
      source,
      category,
      description,
      addDate,
    };

    try {
      const response = await axios.post(ADD_EXPENSE, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSource("");
      setCategory("");
      setAmount("");
      setAddDate(formatDate(new Date()));
      setDescription("");
      setIsModalOpen(false);

      totalExpense();
      Last30Days();
      averageOFTheExpense();
    } catch (err) {
      console.error("❌ Failed to submit expense:", err.response?.data || err);
      alert("Submission failed! Please enter details correctly.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex w-full max-w-[1440px] min-h-screen font-raleway">
        <SideBar
          expanded={expanded}
          setExpanded={setExpanded}
          isMobile={isMobile}
        />

        <div
          className={`transition-all duration-300 flex-1 pt-4 px-2 py-2 ${
            isMobile ? "ml-14" : expanded ? "ml-56" : "ml-16"
          }`}
        >
          <h1 className={`text-2xl font-semibold mb-4 ${greyText}`}>
            Expense Overview
          </h1>

          <div
            className={`grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${borderGrey} ${greyText}`}
          >
            <ScrollAnimationWrapper delay={0.4}>
              <Histogram />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper delay={0.9}>
              <AreaChart />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper delay={1.4}>
              <Doughnut />
            </ScrollAnimationWrapper>
          </div>

          <div className="flex w-full flex-col lg:flex-row gap-2 pt-3">
            <div className="flex flex-col lg:w-[30%] gap-2">
              <ScrollAnimationWrapper delay={0.5}>
                <BalanceComponent
                  text="Average Expense Transitions"
                  amount={averageExpenseTotal}
                  about="Kamao BC"
                />
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper delay={0.6}>
                <BalanceComponent
                  text="Total Expenses"
                  amount={totalExpenseAmount}
                  about="Uda Diye BC"
                />
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper delay={0.7}>
                <BalanceComponent
                  text="Last 30 Days Expense"
                  amount={last30DaysTotal}
                  about="Khatam Tata Goodbye Gya"
                />
              </ScrollAnimationWrapper>
            </div>

            <div className="lg:w-[70%]">
              <ScrollAnimationWrapper delay={0.8}>
                <RecentExponseTransition />
              </ScrollAnimationWrapper>
            </div>
          </div>
        </div>

        <button
          className="fixed bottom-20 right-20 bg-blue-600 hover:bg-blue-700 text-white px-7 py-7 rounded-2xl shadow-lg transition duration-300 z-50"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus size={24} />
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
            <div
              className={`rounded-xl w-full max-w-2xl p-6 shadow-2xl animate-fadeIn bg-white ${darkGrey}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-semibold ${darkGrey}`}>
                  Add New Expense
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`${darkGrey} hover:text-gray-400 text-lg font-bold`}
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={submitExpenseDetails}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className={`block text-sm font-medium ${darkGrey}`}>
                    Source
                  </label>
                  <input
                    name="source"
                    type="text"
                    placeholder="Online or Offline Only"
                    className={`w-full mt-1 p-2 border rounded-md ${borderGrey2} bg-transparent ${darkGrey}`}
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkGrey}`}>
                    Category
                  </label>
                  <input
                    name="category"
                    type="text"
                    placeholder="e.g. Food, Travel"
                    className={`w-full mt-1 p-2 border rounded-md ${borderGrey2} bg-transparent ${darkGrey}`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkGrey}`}>
                    Amount (₹)
                  </label>
                  <input
                    name="amount"
                    type="number"
                    placeholder="e.g. 1500"
                    className={`w-full mt-1 p-2 border rounded-md ${borderGrey2} bg-transparent ${darkGrey}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkGrey}`}>
                    Date
                  </label>
                  <input
                    type="date"
                    name="addDate"
                    className={`w-full mt-1 p-2 pr-2 border rounded-md appearance-none bg-white dark:bg-gray-800 ${borderGrey2} ${darkGrey}`}
                    value={addDate}
                    onChange={(e) => setAddDate(e.target.value)}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium ${darkGrey}`}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Optional description"
                    className={`w-full mt-1 p-2 border rounded-md ${borderGrey2} bg-transparent ${darkGrey}`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className={`px-4 py-2 bg-gray-200 ${darkGrey} rounded-md hover:bg-gray-300`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Expense;
