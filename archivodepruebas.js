// Conexión al servidor MySQL local
const config = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  database: 'bdea21'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
      console.error('CONEXIÓN FALLIDA a la BD MySQL', err);
      return;
  }
  console.log('CONEXIÓN EXITOSA A LA BD MYSQL');
});

connection.end((err) => {
  if (err) {
      console.error('Error al cerrar la conexión:', err);
      return;
  }
  console.log('Conexión cerrada correctamente');
});
