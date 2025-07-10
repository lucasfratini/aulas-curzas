const { Aula } = require('../models');

exports.getAll = async (req, res) => {
  const aulas = await Aula.findAll();
  res.json(aulas);
};

exports.create = async (req, res) => {
  const aula = await Aula.create(req.body);
  res.status(201).json(aula);
};