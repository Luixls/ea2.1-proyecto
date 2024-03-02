const express = require('express');
const app = express();
app.use(express.json());
app.set("view engine", "ejs");

// Importar las credenciales...
const mysql = require('mysql');
const dbConfig = require('./dbConfig'); // Ruta al archivo dbConfig.js

// Crear la conexión
const connection = mysql.createConnection(dbConfig);

// Ejecutar la conexión
connection.connect((err) => {
  if (err) {
      console.error('CONEXIÓN FALLIDA a la BD MySQL', err);
      return;
  }
  console.log('CONEXIÓN EXITOSA A LA BD MYSQL');
});

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

// Cerrar la conexión a la BD MySQL
connection.end((err) => {
  if (err) {
      console.error('ERROR AL CERRAR LA CONEXIÓN', err);
      return;
  }
  console.log('CONEXIÓN CERRADA CON ÉXITO A LA BD MYSQL');
});
