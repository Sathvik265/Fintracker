const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
  exportTransactions,
} = require("../controllers/transactionController");

//router object
const router = express.Router();

//routes
//add-transaction POST
router.post("/add-transaction", addTransaction);

//edit-transaction POST
router.post("/edit-transaction", editTransaction);

//delete-transaction POST
router.post("/delete-transaction", deleteTransaction);

//get-transactions POST
router.post("/get-transaction", getAllTransaction);

//export-transactions POST
router.post("/export-transaction", exportTransactions);

module.exports = router;
