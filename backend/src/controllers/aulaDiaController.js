const { AulaDia } = require('../models');

exports.getAll = async (req, res) => {
  const dias = await AulaDia.findAll();
  res.json(dias);
};

exports.create = async (req, res) => {
  const dia = await AulaDia.create(req.body);
  res.status(201).json(dia);
};