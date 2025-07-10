const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: true, message: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, rol: user.rol },
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || 'secreto',
    { expiresIn: '1d' }
  );

  res.json({ token });
};