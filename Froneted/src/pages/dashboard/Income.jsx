import React, { useState, useRef } from "react";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import Histogram from "../../components/income/incomechart/IncomeHistogram";
import AreaChart from "../../components/income/incomechart/IncomeAreaChart";
import SideBar from "../core/SideBar";
import { useThemeColors } from "../core/colors";
import Doughnut from "../../components/income/incomechart/IncomeDoughnut";
import ComboChart from "../../components/income/incomechart/ComboChart";
import HeatmapChart from "../../components/income/incomechart/Heat";
import DetailIncomeTransitio from "../../components/income/Income Transitions/DetailIncomeTransitio";
import Header from "../core/Header";
import { ADD_INCOME } from "../../APIS/income-routes-api";

import { motion, useInView } from "framer-motion";

// ✅ Scroll animation wrapper
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

function Income() {
  const { borderGrey, greyText, darkGrey, borderGrey2 } = useThemeColors();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [addDate, setAddDate] = useState(formatDate(new Date()));
  const [description, setDescription] = useState("");

  const submitIncomeDetails = async (e) => {
    e.preventDefault();

    const payload = {
      amount: Number(amount),
      source,
      category,
      description,
      addDate,
    };

    try {
      const response = await axios.post(ADD_INCOME, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // console.log("✅ Income Submitted:", response.data);

      setSource("");
      setCategory("");
      setAmount("");
      setAddDate(formatDate(new Date()));
      setDescription("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("❌ Failed to submit income:", err.response?.data || err);
      alert("Submission failed! Please Enter Details Correctly.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex w-full max-w-[1440px] min-h-screen font-raleway">
        <SideBar expanded={false} setExpanded={() => {}} isMobile={false} />

        <div className="transition-all duration-300 flex-1 px-4 py-4 ml-14">
          <h1 className={`text-2xl font-semibold mb-6 ${greyText}`}>
            Income Overview
          </h1>

          <div
            className={`grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${borderGrey} ${greyText}`}
          >
            <ScrollAnimationWrapper delay={0.2}>
              <Histogram />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper delay={0.3}>
              <AreaChart />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper delay={0.4}>
              <Doughnut />
            </ScrollAnimationWrapper>
          </div>

          <div
            className={`grid gap-2 pt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ${borderGrey} ${greyText}`}
          >
            <ScrollAnimationWrapper delay={0.5}>
              <ComboChart />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper delay={0.6}>
              <HeatmapChart />
            </ScrollAnimationWrapper>
          </div>

          <div className="pt-5">
            <ScrollAnimationWrapper delay={0.7}>
              <DetailIncomeTransitio />
            </ScrollAnimationWrapper>
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
                  Add New Income
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`${darkGrey} hover:text-gray-400 text-lg font-bold`}
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={submitIncomeDetails}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className={`block text-sm font-medium ${darkGrey}`}>
                    Source
                  </label>
                  <input
                    name="source"
                    type="text"
                    placeholder="Online Or Offline"
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
                    placeholder="e.g. Bonus, Rent"
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

export default Income;
