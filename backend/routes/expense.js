const path = require("path");

const express = require("express");

const expenseController = require("../controllers/expense");

const router = express.Router();

router.post("/addexpense", expenseController.addexpense);
router.get("/getexpenses", expenseController.getexpenses);
router.delete("/deleteexpense/:expenseid", expenseController.deleteExpense);

module.exports = router;
