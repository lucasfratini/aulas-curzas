const { Docente } = require('../models');

exports.getAll = async (req, res) => {
  const docentes = await Docente.findAll();
  res.json(docentes);
};

exports.create = async (req, res) => {
  const docente = await Docente.create(req.body);
  res.status(201).json(docente);
};