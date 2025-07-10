const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AulaDia = sequelize.define('AulaDia', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    aulaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diaSemana: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horaFin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  }, {
    tableName: 'aulaDias',
    timestamps: false,
  });

  return AulaDia;
};
