const ProfesorController = require("./ProfesorController");
const MateriaController = require("./MateriaController");

class EventoController {
  static eventos = [];
  static ultimoId = 0;

  static agregar(req, res) {
    const { tipo, descripcion, fecha, materiaId } = req.body;
    const evento = {
      id: ++EventoController.ultimoId,
      tipo,
      descripcion,
      fecha,
      materiaId,
    };
    EventoController.eventos.push(evento);
    res.json({ mensaje: "Evento agregado con éxito", evento });
  }

  static listar(req, res) {
    res.json(EventoController.eventos);
  }

  static editar(req, res) {
    const { id } = req.params;
    const { tipo, descripcion, fecha, materiaId } = req.body;
    const evento = EventoController.eventos.find((e) => e.id == id);
    if (evento) {
      evento.tipo = tipo;
      evento.descripcion = descripcion;
      evento.fecha = fecha;
      evento.materiaId = materiaId;
      res.json({ mensaje: "Evento editado con éxito", evento });
    } else {
      res.status(404).send("Evento no encontrado");
    }
  }

  static eliminar(req, res) {
    const { id } = req.params;
    const index = EventoController.eventos.findIndex((e) => e.id == id);
    if (index !== -1) {
      EventoController.eventos.splice(index, 1);
      res.send("Evento eliminado con éxito");
    } else {
      res.status(404).send("Evento no encontrado");
    }
  }

  static eventosPorSemana(req, res) {
    const { materiaId, fechaInicio } = req.params;
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaInicioDate);
    fechaFinDate.setDate(fechaFinDate.getDate() + 7);

    const eventosFiltrados = EventoController.eventos.filter((evento) => {
      const fechaEvento = new Date(evento.fecha);
      return (
        evento.materiaId == materiaId &&
        fechaEvento >= fechaInicioDate &&
        fechaEvento < fechaFinDate
      );
    });

    const materia = MateriaController.materias.find((m) => m.id == materiaId);

    const nombreMateria = materia ? materia.nombre : "Materia no encontrada";

    res.render("eventosPorSemana", {
      eventos: eventosFiltrados,
      nombreMateria,
    });
  }

  static proximosEventos(req, res) {
    const hoy = new Date();
    const dosSemanasMas = new Date();
    dosSemanasMas.setDate(hoy.getDate() + 14);
    const eventosProximos = EventoController.eventos.filter((evento) => {
      const fechaEvento = new Date(evento.fecha);
      return fechaEvento >= hoy && fechaEvento <= dosSemanasMas;
    });

    res.json(eventosProximos);
  }

  static eventosProximosPorProfesor(req, res) {
    const { fechaInicio } = req.params;
    const fechaBase = new Date(fechaInicio);
    const fechaLimite = new Date(fechaBase);
    fechaLimite.setDate(fechaBase.getDate() + 14);

    const eventosProximos = EventoController.eventos.filter((evento) => {
      const fechaEvento = new Date(evento.fecha);
      return fechaEvento >= fechaBase && fechaEvento < fechaLimite;
    });

    const eventosConMateria = eventosProximos.map((evento) => ({
      ...evento,
      materia: MateriaController.materias.find((m) => m.id == evento.materiaId),
    }));

    const eventosPorProfesor = ProfesorController.profesores
      .map((profesor) => {
        const eventosDelProfesor = eventosConMateria.filter((evento) =>
          profesor.materias.includes(evento.materia.id)
        );
        return { profesor: profesor.nombre, eventos: eventosDelProfesor };
      })
      .filter((profesor) => profesor.eventos.length > 0);

    res.json(eventosPorProfesor);
  }
}

module.exports = EventoController;
