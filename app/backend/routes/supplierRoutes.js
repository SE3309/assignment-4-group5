const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

router.get("/", supplierController.getAllSupplier);
router.get("/:id", supplierController.getSupplierById);
router.post("/", supplierController.createSupplier);
router.put("/:id", supplierController.updateSupplier);
router.get("/:id/truck", supplierController.getTruckBySupplier);

module.exports = router;