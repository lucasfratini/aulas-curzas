module.exports = (req, res, next) => {
  res.status(404).json({
    error: true,
    message: 'Ruta no encontrada',
  });
};