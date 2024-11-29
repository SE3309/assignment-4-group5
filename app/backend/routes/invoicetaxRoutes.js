const express = require("express");
const router = express.Router();
const invoicetaxController = require("../controllers/invoicetaxController");

router.get("/", invoicetaxController.getAllInvoiceTax);
router.get("/:id", invoicetaxController.getInvoiceTaxById);
router.post("/", invoicetaxController.createInvoiceTax);
router.put("/:id", invoicetaxController.updateInvoiceTax);

module.exports = router;