const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    amount: {
      type: Number,
      required: [true, "Budget amount is required"],
    },
    period: {
      type: String,
      enum: ["monthly", "weekly", "yearly"],
      default: "monthly",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Ensure one budget per category per user
budgetSchema.index({ userid: 1, category: 1 }, { unique: true });

const budgetModel = mongoose.model("budgets", budgetSchema);
module.exports = budgetModel;
