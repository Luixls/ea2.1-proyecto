const express = require("express");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
const profesoresRouter = require("./routes/profesores");
const materiasRouter = require("./routes/materias");
const eventosRouter = require("./routes/eventos");
const seccionesRouter = require("./routes/secciones");
const EventoController = require("./controllers/EventoController");
const ProfesorController = require("./controllers/ProfesorController");

app.use("/profesores", profesoresRouter);
app.use("/materias", materiasRouter);
app.use("/eventos", eventosRouter);
app.use("/secciones", seccionesRouter);

app.get(
  "/materia/eventos/:materiaId/:fechaInicio",
  EventoController.eventosPorSemana
);

app.get("/profesores/materias", (req, res) => {
  const profesoresConMaterias = ProfesorController.profesoresConMaterias(
    req,
    res
  );
  res.render("profesoresConMaterias", { profesores: profesoresConMaterias });
});

app.get(
  "/eventos/proximos/:fechaInicio",
  EventoController.eventosProximosPorProfesor
);

puerto = 3000;
app.listen(puerto, () => console.log("Servidor corriendo en puerto", puerto));
