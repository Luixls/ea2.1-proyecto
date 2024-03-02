class MateriaController {
  static materias = [];
  static ultimoId = 0;

  static agregar(req, res) {
    const { nombre, codigo } = req.body;
    const materia = {
      id: ++MateriaController.ultimoId,
      nombre,
      codigo,
    };
    MateriaController.materias.push(materia);
    res.json({ mensaje: "Materia agregada con éxito", materia });
  }

  static listar(req, res) {
    res.json(MateriaController.materias);
  }

  static editar(req, res) {
    const { id } = req.params;
    const { nombre, codigo } = req.body;
    const materia = MateriaController.materias.find((m) => m.id == id);
    if (materia) {
      materia.nombre = nombre;
      materia.codigo = codigo;
      res.json({ mensaje: "Materia editada con éxito", materia });
    } else {
      res.status(404).send("Materia no encontrada");
    }
  }

  static eliminar(req, res) {
    const { id } = req.params;
    const index = MateriaController.materias.findIndex((m) => m.id == id);
    if (index !== -1) {
      MateriaController.materias.splice(index, 1);
      res.send("Materia eliminada con éxito");
    } else {
      res.status(404).send("Materia no encontrada");
    }
  }
}

module.exports = MateriaController;
