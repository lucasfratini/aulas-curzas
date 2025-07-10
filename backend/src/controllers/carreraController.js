const { Carrera } = require('../models');

exports.getAll = async (req, res) => {
  const carreras = await Carrera.findAll();
  res.json(carreras);
};

exports.create = async (req, res) => {
  const carrera = await Carrera.create(req.body);
  res.status(201).json(carrera);
};