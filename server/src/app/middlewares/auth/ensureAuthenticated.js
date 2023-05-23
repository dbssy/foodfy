const AccessTokenProvider = require('../../providers/AccessTokenProvider');

const UsersRepository = require('../../repositories/UsersRepository');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: 'Você não está autenticado' });
    }

    if (typeof authorization !== 'string') {
      return res.status(401).json({ error: 'Você não está autenticado' });
    }

    const [, token] = authorization.split(' ');

    await AccessTokenProvider.verify(token);

    const { userId, exp } = AccessTokenProvider.decode(token);

    if (!userId) {
      return res.status(401).json({ error: 'O seu token é inválido' });
    }

    const user = await UsersRepository.findByUserId(userId);

    if (!user) {
      return res.status(401).json({ error: 'O seu token é inválido' });
    }

    if (exp < Date.now() / 1000) {
      return res.status(401).json({ error: 'O seu token expirou' });
    }

    req.userId = userId;
    req.userIsAdmin = user.admin;
    req.tokenRequesting = token;

    return next();
  } catch {
    return res.status(401).json({ error: 'O seu token expirou ou é inválido' });
  }
};
