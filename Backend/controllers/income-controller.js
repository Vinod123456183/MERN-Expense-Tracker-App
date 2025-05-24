const errorHandler = require("../utils/error");

const userModel = require("../models/user-model");
const incomeModel = require("../models/income-model");
const expenseModel = require("../models/expense-model");

const error = require("../utils/error");
const { mongoose } = require("mongoose");

const addIncomeController = async (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) return next(errorHandler(401, "Unauthorized Token !! "));

  const { amount, source, category, description, addDate } = req.body;

  try {
    if (!amount || !source || !category || !description || !addDate) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Required !!!!!" });
    }

    const newIncome = new incomeModel({
      userId, //important
      amount,
      source: source.toLowerCase(),
      category,
      description,
      addDate,
    });

    const save = await newIncome.save();
    console.log("✅ Saved income:", save);

    return res.status(200).json({
      success: true,
      message: "Income Added Successfully !! ",
      data: save,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Income Added Failed !! Please Try Again",
      error: error.message,
    });
  }
};

// const getAllIncomeController = async (req, res, next) => {
//   const userId = req.user?.id;
//   console.log("💡 Decoded req.user from token:", req.headers);

//   if (!userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Unauthorised Token !!!" });
//   }

//   try {
//     const result = await incomeModel.find({ userId }).sort({ createdAt: -1 });

//     if (!result || result.length === 0) {
//       return res.status(200).json({
//         success: true,
//         message: "No Data For This User !! Please Add Some Data",
//         data: [],
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "All Income Fetched Successfully !!",
//       data: result,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching income:", error); // helpful for debugging
//     res.status(500).json({
//       success: false,
//       message: "Income Not Fetched !!",
//       error: error.message,
//     });
//   }
// };

const getAllIncomeController = async (req, res, next) => {
  const userId = req.user?.id;

  // console.log("💡 Incoming Request Headers:", req.headers);

  // console.log("💡 Decoded User ID from Token:", userId);

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Unauthorized Token !!!" });
  }

  try {
    const result = await incomeModel.find({ userId }).sort({ createdAt: -1 });

    // console.log("💡 Fetched Income Data:", result);

    if (!result || result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Data For This User !! Please Add Some Data",
        data: [],
      });
    }

    // Return the successful response with the fetched data
    res.status(200).json({
      success: true,
      message: "All Income Fetched Successfully !!",
      data: result,
    });
  } catch (error) {
    console.error("❌ Error fetching income:", error);

    res.status(500).json({
      success: false,
      message: "Income Not Fetched !!",
      error: error.message,
    });
  }
};

const editIncomeController = async (req, res, next) => {};

const deleteIncomeController = async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Token!!" });
  }

  try {
    const income = await incomeModel.findOne({
      _id: req.params.id,
      userId,
    });

    if (!income) {
      return res
        .status(404)
        .json({ success: false, message: "No Income Found" });
    }

    const deletedIncome = await incomeModel.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      message: "Income Deleted Successfully",
      data: deletedIncome,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Income Delete Failed",
      error: error.message,
    });
  }
};

const getTotalIncomeController = async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Unauthorized Token",
    });
  }

  try {
    const result = await incomeModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);

    if (!result || result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Income Data For This User",
        totalIncome: 0,
      });
    }

    res.status(200).json({
      success: true,
      totalIncome: result[0]?.totalIncome || 0,
    });
  } catch (error) {
    console.error("Income aggregation error:", error);
    res.status(500).json({
      success: false,
      message: "Income Error",
      error: error.message,
    });
  }
};

const averageOfIncome = async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Unauthorised Access",
    });
  }

  try {
    const result = await incomeModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          averageIncome: { $avg: "$amount" },
        },
      },
    ]);

    const average = result.length > 0 ? result[0].averageIncome : 0;

    return res.status(200).json({
      success: true,
      averageIncome: parseFloat(average.toFixed(2)),
    });
  } catch (error) {
    console.error("Error calculating average income:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while calculating average income",
    });
  }
};

// help

const recentTransitionOfIncomeExpense = async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Unauthorised Access",
    });
  }

  try {
    const recentExpenses = await expenseModel
      .find({ userId })
      .sort({ createdAt: -1 }) // newest first
      .limit(5);

    const recentIncomes = await incomeModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const combined = [...recentExpenses, ...recentIncomes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const recentTransactions = combined.slice(0, 6);
    // console.log(" TRANSITIONS  :: ", recentTransactions);
    return res.status(200).json({
      success: true,
      recentTransactions,
    });
  } catch (error) {
    console.error("Error fetching recent transitions:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addIncomeController,
  getAllIncomeController,
  editIncomeController,
  deleteIncomeController,
  getTotalIncomeController,
  averageOfIncome,
  recentTransitionOfIncomeExpense,
};
