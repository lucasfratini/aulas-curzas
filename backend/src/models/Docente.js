const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Docente = sequelize.define('Docente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'docentes',
    timestamps: false,
  });

  return Docente;
};
