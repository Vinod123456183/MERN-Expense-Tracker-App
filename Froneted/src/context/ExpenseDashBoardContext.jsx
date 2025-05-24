import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import {
  ADD_EXPENSE,
  FETCH_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  TOTAL_EXPENSE,
  AVERAGE_OF_EXPENSE,
  LAST_30_DAYS,
} from "../APIS/expense-routes-api";

const ExpenseDashBoardContext = createContext();

export const DashBoardProvider = ({ children }) => {
  const [getExpense, setGetExpense] = useState([]);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [averageExpenseTotal, setAverageExpenseTotal] = useState(0);
  const [last30DaysExpenses, setLast30DaysExpenses] = useState([]);
  const [last30DaysTotal, setLast30DaysTotal] = useState(0);

  const fetchExpense = async () => {
    try {
      const res = await axios.get(FETCH_EXPENSE, { withCredentials: true });
      if (res.data.success) {
        // console.log("Expense Fetch Successfully !!", res.data.data);
        setGetExpense(res.data.data);
      } else {
        console.log("Failed To Fetch Expenses !!", error);
      }
    } catch (error) {
      console.log(
        "Something Went Wrong While Fetching Expense !!",
        error.message
      );
    }
  };

  const addExpense = async () => {
    try {
      const res = await axios.post(ADD_EXPENSE, {}, { withCredentials: true });

      if (!res.data.success) {
        console.log("Error adding data ");
      } else {
        console.log("Expense Added Successfully", res.data);
      }
    } catch (error) {
      console.log("Something Went Wrong in Adding Expense", error.message);
    }
  };

  const editExpense = async () => {
    try {
      const res = await axios.put(EDIT_EXPENSE, { withCredentials: true });
      if (!res.success) {
        console.log("Failed To Edit Expense", error.message);
      } else {
        console.log("Expense Edited Successfully", res.data);
      }
    } catch (error) {
      console.log("", error.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const res = await axios.delete(DELETE_EXPENSE(id), {
        withCredentials: true,
      });
      if (!res.success) {
        console.log(
          "Something Went Wrong While Deleting Expense",
          error.message
        );
      } else {
        console.log("Expense Deleted Successfully", res.data);
      }
    } catch (error) {
      console.log(
        "Something Went Wrong While Deleting !! Please Check Again",
        error.message
      );
    }
  };

  const totalExpense = async () => {
    try {
      const res = await axios.get(TOTAL_EXPENSE, { withCredentials: true });
      if (res.data.success) {
        // console.log("Done :: ", res.data.totalExpense);
        setTotalExpenseAmount(res.data.totalExpense);
      } else {
        console.log("⚠️ Failed To Fetch Total Expense");
      }
    } catch (error) {
      console.log("❌ Error fetching total expense:", error.message);
    }
  };

  const averageOFTheExpense = async () => {
    try {
      const res = await axios.get(AVERAGE_OF_EXPENSE, {
        withCredentials: true,
      });
      if (res.data.success) {
        setAverageExpenseTotal(res.data.averageExpense);
      } else {
        console.log("Error Calculating The AVERAGE");
      }
    } catch (error) {
      console.log("Error Calculating The Average", error.message);
    }
  };

  const Last30Days = async () => {
    try {
      const res = await axios.get(LAST_30_DAYS, {
        withCredentials: true,
      });

      if (res.data.success) {
        setLast30DaysExpenses(res.data.data); // list of expenses
        setLast30DaysTotal(res.data.totalExpense); // total sum
      } else {
      }
    } catch (error) {
      console.error("Error fetching last 30 days' data:", error.message);
    }
  };

  return (
    <ExpenseDashBoardContext.Provider
      value={{
        addExpense,
        fetchExpense,
        editExpense,
        deleteExpense,
        getExpense,
        setGetExpense,
        totalExpense,
        totalExpenseAmount,
        setTotalExpenseAmount,
        averageOFTheExpense,
        averageExpenseTotal,
        setAverageExpenseTotal,
        Last30Days,
        last30DaysExpenses,
        setLast30DaysExpenses,
        last30DaysTotal,
        setLast30DaysTotal,
      }}
    >
      {children}
    </ExpenseDashBoardContext.Provider>
  );
};

export const useDashBoard = () => useContext(ExpenseDashBoardContext);
