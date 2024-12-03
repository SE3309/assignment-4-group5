const express = require("express");
const router = express.Router();
const truckController = require("../controllers/truckAssignmentController");

router.post("/assign-driver", truckController.assignTruckToDriver);

module.exports = router;
