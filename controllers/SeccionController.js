class SeccionController {
  static secciones = [];
  static ultimoId = 0;

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

  static listar(req, res) {
    res.json(SeccionController.secciones);
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

module.exports = SeccionController;
