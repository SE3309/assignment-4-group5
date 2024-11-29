const express = require("express");
const router = express.Router();
const routeController = require("../controllers/routeController");

router.get("/", routeController.getAllRoute);
router.get("/:id", routeController.getRouteById);
router.post("/", routeController.createRoute);
router.put("/:id", routeController.updateRoute);

module.exports = router;