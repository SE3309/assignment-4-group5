const express = require("express");
const router = express.Router();
const financeController = require("../controllers/financeController");

router.get("/", financeController.getAllFinance);
router.get("/total-expenses", financeController.getTotalExpensesPerTruck);
router.get("/expense-breakdown", financeController.getExpenseBreakdownByType);
router.get("/:id", financeController.getFinanceById);
router.post("/", financeController.createFinance);
router.put("/:id", financeController.updateFinance);

module.exports = router;