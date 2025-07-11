const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

const aulaController = require('../controllers/aulaController');
const carreraController = require('../controllers/carreraController');
const materiaController = require('../controllers/materiaController');
const docenteController = require('../controllers/docenteController');
const aulaDiaController = require('../controllers/aulaDiaController');
const userController = require('../controllers/userController');

// Agregá los subrouters (si son modulares)
router.use(authRoutes);
router.use(userRoutes);

// Rutas directas
router.get('/aulas', aulaController.getAll);
router.post('/aulas', aulaController.create);

router.get('/carreras', carreraController.getAll);
router.post('/carreras', carreraController.create);
router.put('/carreras/:id', carreraController.update);
router.delete('/carreras/:id', carreraController.remove);

router.get('/materias', materiaController.getAll);
router.post('/materias', materiaController.create);

router.get('/docentes', docenteController.getAll);
router.post('/docentes', docenteController.create);

router.get('/auladias', aulaDiaController.getAll);
router.post('/auladias', aulaDiaController.create);

router.get('/users', userController.getAll);
router.post('/users', userController.create);

module.exports = router;
