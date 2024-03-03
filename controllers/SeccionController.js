const mysql = require("mysql");
const dbConfig = require("../dbConfig");

class SeccionController {
  static agregar(req, res) {
    const { nombre, materiaId } = req.body;
    const seccion = {
      id: ++SeccionController.ultimoId,
      nombre,
      materiaId,
    };
    SeccionController.secciones.push(seccion);
    res.json({ mensaje: "Sección agregada con éxito", seccion });
  }

  static async listar(req, res) {
    const sql = "SELECT * FROM secciones";
    try {
      const secciones = await dbQuery(sql);
      res.json(secciones);
    } catch (error) {
      console.error("Error al obtener secciones:", error);
      res.status(500).json({ error: "Error al obtener secciones" });
    }
  }

  static editar(req, res) {
    const { id } = req.params;
    const { nombre, materiaId } = req.body;
    const index = SeccionController.secciones.findIndex((s) => s.id == id);
    if (index !== -1) {
      SeccionController.secciones[index] = {
        ...SeccionController.secciones[index],
        nombre,
        materiaId,
      };
      res.json({
        mensaje: "Sección editada con éxito",
        seccion: SeccionController.secciones[index],
      });
    } else {
      res.status(404).send("Sección no encontrada");
    }
  }

  static eliminar(req, res) {
    const { id } = req.params;
    const index = SeccionController.secciones.findIndex((s) => s.id == id);
    if (index !== -1) {
      SeccionController.secciones.splice(index, 1);
      res.send("Sección eliminada con éxito");
    } else {
      res.status(404).send("Sección no encontrada");
    }
  }
}

// Función de utilidad para ejecutar consultas SQL
function dbQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    connection.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      connection.end(); // Cerrar la conexión después de obtener los resultados
      resolve(results);
    });
  });
}

module.exports = SeccionController;
