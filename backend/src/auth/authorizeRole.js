module.exports = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({
        error: true,
        message: 'Acceso denegado: permisos insuficientes'
      });
    }
    next();
  };
};