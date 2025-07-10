const { User } = require('../models');
const bcrypt = require('bcrypt');

// Listar todos los usuarios (solo Admin)
exports.getAll = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json(users);
};

// Crear usuario (solo Admin)
exports.create = async (req, res) => {
  const { username, password, rol } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hash, rol });
  res.status(201).json({ id: user.id, username: user.username, rol: user.rol });
};

// Ver usuario por ID (Admin o el mismo usuario)
exports.getById = async (req, res) => {
  const { id } = req.params;
  if (req.user.rol !== 'Admin' && req.user.id != id) {
    return res.status(403).json({ error: true, message: 'Acceso denegado' });
  }

  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) return res.status(404).json({ error: true, message: 'Usuario no encontrado' });
  res.json(user);
};

// Actualizar usuario (Admin o el mismo usuario)
exports.update = async (req, res) => {
  const { id } = req.params;
  const { username, password, rol } = req.body;

  if (req.user.rol !== 'Admin' && req.user.id != id) {
    return res.status(403).json({ error: true, message: 'Acceso denegado' });
  }

  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ error: true, message: 'Usuario no encontrado' });

  if (username) user.username = username;
  if (password) user.password = await bcrypt.hash(password, 10);
  if (rol && req.user.rol === 'Admin') user.rol = rol;

  await user.save();
  res.json({ id: user.id, username: user.username, rol: user.rol });
};

// Eliminar usuario (solo Admin)
exports.remove = async (req, res) => {
  const { id } = req.params;
  if (req.user.rol !== 'Admin') {
    return res.status(403).json({ error: true, message: 'Acceso denegado' });
  }

  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ error: true, message: 'Usuario no encontrado' });

  await user.destroy();
  res.json({ message: 'Usuario eliminado' });
};

// Obtener sesión actual
exports.me = async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
  res.json(user);
};