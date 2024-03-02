const express = require("express");
const router = express.Router();
const EventoController = require("../controllers/EventoController");

router.post("/agregar", EventoController.agregar);
router.get("/listar", EventoController.listar);
router.put("/editar/:id", EventoController.editar);
router.delete("/eliminar/:id", EventoController.eliminar);
router.get(
  "/materia/:materiaId/:fechaInicio",
  EventoController.eventosPorSemana
);
router.get(
  "/proximos/:fechaInicio",
  EventoController.eventosProximosPorProfesor
);

module.exports = router;
