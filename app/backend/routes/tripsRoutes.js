const express = require("express");
const router = express.Router();
const tripsController = require("../controllers/tripsController");

router.get("/", tripsController.getAllTrips);
router.get("/:id", tripsController.getTripsById);
router.post("/", tripsController.createTrips);
router.put("/:id", tripsController.updateTrips);

module.exports = router;