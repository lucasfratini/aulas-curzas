const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Carrera = sequelize.define('Carrera', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'carreras',
    timestamps: false,
  });

  return Carrera;
};
