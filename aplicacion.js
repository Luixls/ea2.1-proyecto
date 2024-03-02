const express = require("express");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");

// Datos para login a la BD MySQL
const config = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  database: 'bdea21'
};

// Conectar a la BD MySQL
const mysql = require('mysql');
const connection = mysql.createConnection(config);

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
      console.error('Error al cerrar la conexión:', err);
      return;
  }
  console.log('Conexión cerrada correctamente');
});