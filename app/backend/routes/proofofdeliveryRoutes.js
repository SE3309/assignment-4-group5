const express = require("express");
const router = express.Router();
const proofofdeliveryController = require("../controllers/proofofdeliveryController");

router.get("/", proofofdeliveryController.getAllProofOfDelivery);
router.get("/:id", proofofdeliveryController.getProofOfDeliveryById);
router.post("/", proofofdeliveryController.createProofOfDelivery);
router.put("/:id", proofofdeliveryController.updateProofOfDelivery);

module.exports = router;