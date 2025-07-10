const { Materia } = require('../models');

exports.getAll = async (req, res) => {
  const materias = await Materia.findAll();
  res.json(materias);
};

exports.create = async (req, res) => {
  const materia = await Materia.create(req.body);
  res.status(201).json(materia);
};