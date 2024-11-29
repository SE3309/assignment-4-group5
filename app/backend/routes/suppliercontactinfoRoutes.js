const express = require("express");
const router = express.Router();
const suppliercontactinfoController = require("../controllers/suppliercontactinfoController");

router.get("/", suppliercontactinfoController.getAllSupplierContactInfo);
router.get("/:id", suppliercontactinfoController.getSupplierContactInfoById);
router.post("/", suppliercontactinfoController.createSupplierContactInfo);
router.put("/:id", suppliercontactinfoController.updateSupplierContactInfo);

module.exports = router;