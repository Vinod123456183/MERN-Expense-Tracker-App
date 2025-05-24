const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    type: {
      type: String,
      default: "Income",
    },

    amount: {
      type: Number,
      required: true,
    },

    source: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    initial_balance: {
      type: Number,
      default: 0,
    },

    current_balance: {
      type: Number,
      default: 0,
    },

    addDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("income", incomeSchema);
