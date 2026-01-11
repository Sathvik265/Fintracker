const budgetModel = require("../models/budgetModel");
const transactionModel = require("../models/transactionModel");
const moment = require("moment");

// Get all budgets for a user
const getAllBudgets = async (req, res) => {
  try {
    const { userid } = req.body;
    const budgets = await budgetModel.find({ userid, isActive: true });
    res.status(200).json(budgets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching budgets", error });
  }
};

// Add or update a budget
const setBudget = async (req, res) => {
  try {
    const { userid, category, amount, period } = req.body;

    // Check if budget exists for this category
    const existingBudget = await budgetModel.findOne({ userid, category });

    if (existingBudget) {
      // Update existing budget
      existingBudget.amount = amount;
      existingBudget.period = period || "monthly";
      existingBudget.isActive = true;
      await existingBudget.save();
      res
        .status(200)
        .json({ message: "Budget updated", budget: existingBudget });
    } else {
      // Create new budget
      const newBudget = new budgetModel({
        userid,
        category,
        amount,
        period: period || "monthly",
      });
      await newBudget.save();
      res.status(201).json({ message: "Budget created", budget: newBudget });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error setting budget", error });
  }
};

// Delete a budget
const deleteBudget = async (req, res) => {
  try {
    const { budgetId } = req.body;
    await budgetModel.findByIdAndDelete(budgetId);
    res.status(200).json({ message: "Budget deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting budget", error });
  }
};

// Get budget status with spending analysis
const getBudgetStatus = async (req, res) => {
  try {
    const { userid } = req.body;

    // Get all active budgets
    const budgets = await budgetModel.find({ userid, isActive: true });

    // Calculate date range based on period (default: monthly)
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    // Get all expenses for current month
    const expenses = await transactionModel.find({
      userid,
      type: "expense",
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // Calculate spending per category
    const categorySpending = {};
    expenses.forEach((expense) => {
      if (!categorySpending[expense.category]) {
        categorySpending[expense.category] = 0;
      }
      categorySpending[expense.category] += expense.amount;
    });

    // Create budget status report
    const budgetStatus = budgets.map((budget) => {
      const spent = categorySpending[budget.category] || 0;
      const remaining = budget.amount - spent;
      const percentUsed = (spent / budget.amount) * 100;

      let status = "safe";
      let message = "";

      if (percentUsed >= 100) {
        status = "exceeded";
        message = `Budget exceeded by ₹${Math.abs(remaining).toLocaleString(
          "en-IN"
        )}!`;
      } else if (percentUsed >= 80) {
        status = "warning";
        message = `Only ₹${remaining.toLocaleString("en-IN")} remaining (${(
          100 - percentUsed
        ).toFixed(0)}%)`;
      } else if (percentUsed >= 50) {
        status = "caution";
        message = `50% budget used`;
      }

      return {
        _id: budget._id,
        category: budget.category,
        budgetAmount: budget.amount,
        spent,
        remaining,
        percentUsed: Math.min(percentUsed, 100),
        status,
        message,
        period: budget.period,
      };
    });

    res.status(200).json(budgetStatus);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting budget status", error });
  }
};

module.exports = {
  getAllBudgets,
  setBudget,
  deleteBudget,
  getBudgetStatus,
};
