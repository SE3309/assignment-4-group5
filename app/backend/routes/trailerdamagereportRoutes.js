const express = require("express");
const router = express.Router();
const trailerdamagereportController = require("../controllers/trailerdamagereportController");

router.get("/", trailerdamagereportController.getAllTrailerDamageReports);
router.get("/:id", trailerdamagereportController.getTrailerDamageReportById);
router.post("/", trailerdamagereportController.createTrailerDamageReport);
router.put("/:id", trailerdamagereportController.updateTrailerDamageReport);

module.exports = router;