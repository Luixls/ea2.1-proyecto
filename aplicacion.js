const express = require("express");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");

// Enrutadores
const profesoresRouter = require("./routes/profesores");
const materiasRouter = require("./routes/materias");
const eventosRouter = require("./routes/eventos");
const seccionesRouter = require("./routes/secciones");

// Indicar al sistema que estos son los enrutadores a utilizar
app.use("/profesores", profesoresRouter);
app.use("/materias", materiasRouter);
app.use("/eventos", eventosRouter);
app.use("/secciones", seccionesRouter);

// Para iniciar el servidor
puerto = 3000;
app.listen(puerto, () => console.log("Servidor corriendo en puerto", puerto));
