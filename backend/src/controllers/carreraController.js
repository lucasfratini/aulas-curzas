const db = require('../models');
const Carrera = db.Carrera;

// Obtener todas las carreras
exports.getAll = async (req, res) => {
  try {
    const carreras = await Carrera.findAll();
    res.json(carreras);
  } catch (error) {
    console.error('Error al obtener carreras:', error);
    res.status(500).json({ error: 'Error al obtener carreras' });
  }
};

// Crear una carrera nueva
exports.create = async (req, res) => {
  const { nombreCarrera } = req.body;

  try {
    const nuevaCarrera = await Carrera.create({ nombreCarrera });
    res.status(201).json(nuevaCarrera);
  } catch (error) {
    console.error('Error al crear carrera:', error);
    res.status(500).json({ error: 'Error al crear carrera' });
  }
};

// Actualizar una carrera existente
exports.update = async (req, res) => {
  const { id } = req.params;
  const { nombreCarrera } = req.body;

  try {
    const carrera = await Carrera.findByPk(id);
    if (!carrera) {
      return res.status(404).json({ error: 'Carrera no encontrada' });
    }

    carrera.nombreCarrera = nombreCarrera;
    await carrera.save();

    res.json(carrera);
  } catch (error) {
    console.error('Error al actualizar carrera:', error);
    res.status(500).json({ error: 'Error al actualizar carrera' });
  }
};

// Eliminar una carrera
exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    const carrera = await Carrera.findByPk(id);
    if (!carrera) {
      return res.status(404).json({ error: 'Carrera no encontrada' });
    }

    await carrera.destroy();
    res.json({ mensaje: 'Carrera eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar carrera:', error);
    res.status(500).json({ error: 'Error al eliminar carrera' });
  }
};
