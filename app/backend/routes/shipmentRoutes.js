const express = require("express");
const router = express.Router();
const shipmentController = require("../controllers/shipmentController");

router.get("/", shipmentController.getAllShipment);
router.get("/:id", shipmentController.getShipmentById);
router.post("/", shipmentController.createShipment);
router.put("/:id", shipmentController.updateShipment);

module.exports = router;