const errorHandler = require("../utils/error");
const userModel = require("../models/user-model");
const expenseModel = require("../models/expense-model");
const mongoose = require("mongoose");

const addExpenseController = async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    return res
      .status(404)
      .json({ success: false, message: "Unauthorised Token!!" });
  }

  try {
    const { amount, source, category, description, addDate } = req.body;

    if (!amount || !source || !category || !description || !addDate) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Required !!!!!" });
    }

    const newExpense = new expenseModel({
      userId,
      amount,
      source: source.toLowerCase(),
      category,
      description,
      addDate,
    });

    const save = await newExpense.save();

    res.status(200).json({
      success: true,
      message: "Expense Added Successfully !! ",
      data: save,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Expense Added Failed !! Please Try Again",
      error: error.message,
    });
  }
};

const getAllExpenseController = async (req, res, next) => {
  const userId = req.user?.id;
  // console.log("💡 getAllExpenseController triggered");
  // console.log("💡 Extracted User ID: ", userId);

  if (!userId) {
    console.log("❌ No user ID found in request.");
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Token!" });
  }

  try {
    const result = await expenseModel.find({ userId }).sort({ createdAt: -1 });

    // console.log("💰 Expense Query Result:", result);

    if (!result || result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Expense Data For This User!",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense Fetched Successfully!",
      data: result,
    });
  } catch (error) {
    console.error("❌ Error in getAllExpenseController:", error);
    res.status(500).json({
      success: false,
      message: "Expense Not Fetched",
      error: error.message,
    });
  }
};

const editExpenseController = async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    return res
      .status(404)
      .json({ success: false, message: "Unauthorised Token!!" });
  }
};

const deleteExpenseController = async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    return res
      .status(404)
      .json({ success: false, message: "Unauthorised Token!!" });
  }

  try {
    const expense = await expenseModel.findOne({
      _id: req.params.id,
      userId,
    });

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "No Expense Found" });
    }

    const deletedexpense = await expenseModel.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      message: "Expense Deleted Successfully",
      data: deletedexpense,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "expense Delete Failed",
      error: error.message,
    });
  }
};

const totalExpenseController = async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    return res
      .status(404)
      .json({ success: false, message: "Unauthorized Token!" });
  }

  try {
    const result = await expenseModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, totalExpense: { $sum: "$amount" } } },
    ]);

    if (!result || result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Expense Data For This User",
        totalExpense: 0,
      });
    }

    res.status(200).json({
      success: true,
      message: "Total Expense Fetched Successfully!",
      totalExpense: result[0].totalExpense,
    });
  } catch (error) {
    console.error("❌ Error in calculating total expense:", error);
    res.status(500).json({
      success: false,
      message: "Error Calculating Total Expense",
      error: error.message,
    });
  }
};

const averageOfExpenseController = async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Unauthorised Access",
    });
  }

  try {
    const result = await expenseModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          averageExpense: { $avg: "$amount" },
        },
      },
    ]);

    const average = result.length > 0 ? result[0].averageExpense : 0;

    return res.status(200).json({
      success: true,
      averageExpense: parseFloat(average.toFixed(2)),
    });
  } catch (error) {
    console.error("Error calculating average Expense:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while calculating average Expense",
    });
  }
};

const last30DaysController = async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Unauthorised Access",
    });
  }

  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const data = await expenseModel.find({
      userId,
      createdAt: { $gte: thirtyDaysAgo },
    });

    const totalExpense = data.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0
    );

    return res.status(200).json({
      success: true,
      data,
      totalExpense,
    });
  } catch (error) {
    console.error("Error fetching last 30 days' expense:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllExpenseController,
  addExpenseController,
  editExpenseController,
  deleteExpenseController,
  totalExpenseController,
  averageOfExpenseController,
  last30DaysController,
};
