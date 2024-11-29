const express = require("express");
const router = express.Router();
const financeController = require("../controllers/financeController");

router.get("/", financeController.getAllFinance);
router.get("/:id", financeController.getFinanceById);
router.post("/", financeController.createFinance);
router.put("/:id", financeController.updateFinance);

module.exports = router;