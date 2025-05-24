import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import {
  FETCH_INCOME,
  TOTAL_INCOME,
  AVERAGE_OF_INCOME,
  RECENT_INCOME_EXPENSE_TRANSITION,
} from "../APIS/income-routes-api";

const IncomeDashBoardContext = createContext();

export const DashBoardProvider = ({ children }) => {
  const [getIncome, setGetIncome] = useState([]);
  const [totalIncomeLeft, setTotalIncomeLeft] = useState(0);
  const [averageIncomeTotal, setAverageIncomeTotal] = useState(0);
  const [recentTransactions, setRecentTransitions] = useState([]);

  const fetchIncome = async () => {
    try {
      const res = await axios.get(FETCH_INCOME, {
        withCredentials: true,
      });

      if (res.data.success) {
        // console.log("✅ Income fetched Frontend:", res.data.data);
        setGetIncome(res.data.data);
      } else {
        // console.error("⚠️ Income fetch failed:", res.data);
      }
    } catch (error) {
      console.error(
        "❌ Fetch income error:",
        error.response?.data || error.message
      );
    }
  };

  // const addIncome = async () => {
  //   try {
  //     if () {

  //     } else {

  //     }
  //   } catch (error) {

  //   }
  // };

  const deleteIncome = async () => {};

  const updateIncome = async () => {};

  const totalIncome = async () => {
    try {
      const res = await axios.get(TOTAL_INCOME, { withCredentials: true });
      if (res.data.success) {
        // console.log("Totla : incCome ", res.data.totalIncome);
        setTotalIncomeLeft(res.data.totalIncome);
      } else {
        console.log("Error Calculating The Total");
      }
    } catch (error) {
      console.error("Error Calculating Total Income:", error.message);
    }
  };

  const averageOFTheIncome = async () => {
    try {
      const res = await axios.get(AVERAGE_OF_INCOME, { withCredentials: true });
      if (res.data.success) {
        setAverageIncomeTotal(res.data.averageIncome);
      } else {
        console.log("Error Calculating The AVERAGE");
      }
    } catch (error) {
      console.log("Error Calculating The Average", error.message);
    }
  };

  const recentTransitionOfIncomeExpense = async () => {
    try {
      const res = await axios.get(RECENT_INCOME_EXPENSE_TRANSITION, {
        withCredentials: true,
      });

      if (res.data.success) {
        // console.log(res.data.recentTransactions);
        setRecentTransitions(res.data.recentTransactions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IncomeDashBoardContext.Provider
      value={{
        fetchIncome,
        getIncome,
        setGetIncome,
        totalIncome,
        totalIncomeLeft,
        setTotalIncomeLeft,
        averageOFTheIncome,
        averageIncomeTotal,
        setAverageIncomeTotal,
        recentTransitionOfIncomeExpense,
        recentTransactions,
        setRecentTransitions,
      }}
    >
      {children}
    </IncomeDashBoardContext.Provider>
  );
};

export const useDashBoard = () => useContext(IncomeDashBoardContext);
