const express = require("express");
const router = express.Router();
const truckController = require("../controllers/truckController");

router.get("/", truckController.getAllTruck);
router.get("/:id", truckController.getTruckById);
router.post("/", truckController.createTruck);
router.put("/:id", truckController.updateTruck);

module.exports = router;