const express = require('express');
const app = express();
const PORT = 4000;

const { sequelize } = require('./models');
const routes = require('./routes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

// Middleware para parsear JSON
app.use(express.json());

// Rutas de autenticación y API general
app.use('/api', authRoutes);
app.use('/api', routes);

// Middlewares personalizados
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

app.use(notFound);
app.use(errorHandler);

// Ruta base
app.get('/', (req, res) => {
  res.send('API de aulasCurzas funcionando 💡');
});

// Sincronización con la base y arranque del servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
  });
});
