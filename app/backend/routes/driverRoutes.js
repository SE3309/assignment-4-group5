const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");


router.get("/", driverController.getAllDrivers);
router.get("/top-performers", driverController.getTopPerformingDrivers);
router.get("/average-deliveries", driverController.getAverageDeliveries);
router.get("/filtered-drivers", driverController.getFilteredDrivers);
router.get("/:id", driverController.getDriverById);
router.post("/", driverController.createDriver);
router.put("/:id", driverController.updateDriver);


module.exports = router;