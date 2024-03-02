const MateriaController = require("./MateriaController");

class ProfesorController {
  static profesores = [];
  static ultimoId = 0;

  static agregar(req, res) {
    const { nombre, materias } = req.body;
    const profesor = {
      id: ++ProfesorController.ultimoId,
      nombre,
      materias: materias || [],
    };
    ProfesorController.profesores.push(profesor);
    res.json({ mensaje: "Profesor agregado con éxito", profesor });
  }

  static listar(req, res) {
    res.json(ProfesorController.profesores);
  }

  static editar(req, res) {
    const { id } = req.params;
    const { nombre, materias } = req.body;
    const profesor = ProfesorController.profesores.find((p) => p.id == id);
    if (profesor) {
      profesor.nombre = nombre;
      profesor.materias = materias;
      res.json({ mensaje: "Profesor editado con éxito", profesor });
    } else {
      res.status(404).send("Profesor no encontrado");
    }
  }

  static eliminar(req, res) {
    const { id } = req.params;
    const index = ProfesorController.profesores.findIndex((p) => p.id == id);
    if (index !== -1) {
      ProfesorController.profesores.splice(index, 1);
      res.send("Profesor eliminado con éxito");
    } else {
      res.status(404).send("Profesor no encontrado");
    }
  }

  static profesoresConMaterias(req, res) {
    const profesoresConDetalleMaterias = ProfesorController.profesores.map(
      (profesor) => {
        const materiasDetalle = profesor.materias.map((idMateria) =>
          MateriaController.materias.find((materia) => materia.id == idMateria)
        );
        return { ...profesor, materias: materiasDetalle };
      }
    );
    res.render("profesoresConMaterias", {
      profesores: profesoresConDetalleMaterias,
    });
  }
}

module.exports = ProfesorController;
