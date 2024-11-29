const express = require("express");
const router = express.Router();
const driverphoneController = require("../controllers/driverphoneController");

router.get("/", driverphoneController.getAllDriverPhone);
router.get("/:id", driverphoneController.getDriverPhoneById);
router.post("/", driverphoneController.createDriverPhone);
router.put("/:id", driverphoneController.updateDriverPhone);

module.exports = router;