const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verify-token.js");

const {
  addIncomeController,
  getAllIncomeController,
  editIncomeController,
  deleteIncomeController,
  getTotalIncomeController,
  averageOfIncome,
  recentTransitionOfIncomeExpense,
} = require("../controllers/income-controller.js");

router.post("/add-income", verifyToken, addIncomeController);
router.get("/get-all-income", verifyToken, getAllIncomeController);
router.put("/edit-income", verifyToken, editIncomeController);
router.delete("/delete-income/:id", verifyToken, deleteIncomeController);
router.get("/total-income", verifyToken, getTotalIncomeController);
router.get("/average-of-income", verifyToken, averageOfIncome);
router.get(
  "/recent-transitions-income-expense",
  verifyToken,
  recentTransitionOfIncomeExpense
);

module.exports = router;
