const express = require("express");
const router = express.Router();
const bankinformationController = require("../controllers/bankinformationController");

router.get("/", bankinformationController.getAllbankInformation);
router.get("/:id", bankinformationController.getbankInformationById);
router.get("/driver", bankinformationController.getDriverID);
router.post("/", bankinformationController.createbankInformation);
router.put("/:id", bankinformationController.updatebankInformation);


module.exports = router;