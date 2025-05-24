const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verify-token.js");

const {
  addExpenseController,
  getAllExpenseController,
  editExpenseController,
  deleteExpenseController,
  totalExpenseController,
  averageOfExpenseController,
last30DaysController,
} = require("../controllers/expense-controller.js");

router.post("/add-expense", verifyToken, addExpenseController);
router.get("/get-all-expense", verifyToken, getAllExpenseController);
router.put("/edit-expense", verifyToken, editExpenseController);
router.delete("/delete-expense/:id", verifyToken, deleteExpenseController);
router.get("/total-expense", verifyToken, totalExpenseController);
router.get("/average-of-expense", verifyToken, averageOfExpenseController);
router.get("/last-30-days", verifyToken, last30DaysController);

module.exports = router;
