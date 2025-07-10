const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Materia = sequelize.define('Materia', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carreraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'materias',
    timestamps: false,
  });

  return Materia;
};
