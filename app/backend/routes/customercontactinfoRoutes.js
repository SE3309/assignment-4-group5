const express = require("express");
const router = express.Router();
const customercontactinfoController = require("../controllers/customercontactinfoController");

router.get("/", customercontactinfoController.getAllCustomerContactInfo);
router.get("/:id", customercontactinfoController.getCustomerContactInfoById);
router.post("/", customercontactinfoController.createCustomerContactInfo);
router.put("/:id", customercontactinfoController.updateCustomerContactInfo);

module.exports = router;