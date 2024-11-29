const express = require("express");
const router = express.Router();
const suppliercontractController = require("../controllers/suppliercontractController");

router.get("/", suppliercontractController.getAllSupplierContract);
router.get("/:id", suppliercontractController.getSupplierContractById);
router.post("/", suppliercontractController.createSupplierContract);
router.put("/:id", suppliercontractController.updateSupplierContract);

module.exports = router;