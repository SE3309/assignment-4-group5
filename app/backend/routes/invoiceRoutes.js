const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

router.get("/", invoiceController.getAllInvoice);
router.get("/:id", invoiceController.getInvoiceById);
router.post("/", invoiceController.createInvoice);
router.put("/:id", invoiceController.updateInvoice);

module.exports = router;