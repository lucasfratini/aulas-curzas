const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  }
);

const db = {};

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) =>
    file.endsWith('.js') &&
    file !== basename
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

// Relacionar modelos si es necesario acá
// Por ejemplo: db.Aula.belongsTo(db.Docente);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
