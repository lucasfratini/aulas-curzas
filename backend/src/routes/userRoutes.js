const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const auth = require('../auth/authMiddleware');
const authorizeRole = require('../auth/authorizeRole');

// Rutas de usuario
router.get('/users', auth, authorizeRole(['Admin']), userController.getAll);
router.post('/users', auth, authorizeRole(['Admin']), userController.create);
router.get('/users/:id', auth, userController.getById);
router.put('/users/:id', auth, userController.update);
router.delete('/users/:id', auth, authorizeRole(['Admin']), userController.remove);

// Sesión actual
router.get('/me', auth, userController.me);

module.exports = router;