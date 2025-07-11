module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Carrera', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreCarrera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'carreras',
    timestamps: false,
  });
};
