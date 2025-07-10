// src/models/Aula.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Aula = sequelize.define('Aula', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Aula;
};
