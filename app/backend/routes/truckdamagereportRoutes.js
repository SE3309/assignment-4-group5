const express = require("express");
const router = express.Router();
const truckdamagereportController = require("../controllers/truckdamagereportController");

router.get("/", truckdamagereportController.getAllTruckDamageReport);
router.get("/:id", truckdamagereportController.getTruckDamageReportById);
router.post("/", truckdamagereportController.createTruckDamageReport);
router.put("/:id", truckdamagereportController.updateTruckDamageReport);

module.exports = router;