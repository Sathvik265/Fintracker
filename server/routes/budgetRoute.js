const express = require("express");
const {
  getAllBudgets,
  setBudget,
  deleteBudget,
  getBudgetStatus,
} = require("../controllers/budgetController");

const router = express.Router();

// Get all budgets for a user
router.post("/get-budgets", getAllBudgets);

// Set (create/update) a budget
router.post("/set-budget", setBudget);

// Delete a budget
router.post("/delete-budget", deleteBudget);

// Get budget status with spending analysis
router.post("/budget-status", getBudgetStatus);

module.exports = router;
