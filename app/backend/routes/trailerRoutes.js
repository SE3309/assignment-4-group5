const express = require("express");
const router = express.Router();
const trailerController = require("../controllers/trailerController");

router.get("/", trailerController.getAllTrailer);
router.get("/:id", trailerController.getTrailerById);
router.post("/", trailerController.createTrailer);
router.put("/:id", trailerController.updateTrailer);

module.exports = router;