const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // tus rutas
const db = require('./models');

const app = express();
const PORT = 4000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/', routes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
  });
});


