const express = require("express");

const router = express.Router();

const adminController =require("../controller/admin")

router.get("/get-expense",adminController.getExpense);
router.post("/add-expense",adminController.addExpense);
router.delete("/delete-expense/:expenseId",adminController.deleteExpense);

module.exports = router;