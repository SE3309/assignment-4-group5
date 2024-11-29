const express = require("express");
const router = express.Router();
const taxController = require("../controllers/taxController");

router.get("/", taxController.getAllTax);
router.get("/:id", taxController.getTaxById);
router.post("/", taxController.createTax);
router.put("/:id", taxController.updateTax);

module.exports = router;