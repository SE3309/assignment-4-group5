const express = require("express");
const router = express.Router();
const emergencyinformationController = require("../controllers/emergencyinformationController");

router.get("/", emergencyinformationController.getAllEmergencyInformation);
router.get("/:id", emergencyinformationController.getEmergencyInformationById);
router.post("/", emergencyinformationController.createEmergencyInformation);
router.put("/:id", emergencyinformationController.updateEmergencyInformation);

module.exports = router;