module.exports = (req, res, next) => {
  if (req.userIsAdmin) {
    return next();
  }

  return res.status(403).json({ error: 'Acesso negado! Você não é um administrador' });
};
