const express = require("express");
const router = express.Router();
const CalendarioController = require("../controllers/CalendarioController");

router.get("/actividades/:trimestre/:semana", CalendarioController.actividadesSemana);

module.exports = router;
