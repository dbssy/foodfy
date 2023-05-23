const AccessTokenProvider = require('../../providers/AccessTokenProvider');
const RefreshTokenProvider = require('../../providers/RefreshTokenProvider');

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

    const user = await UsersRepository.findById(userId);

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
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const refreshToken = req.headers['x-refresh-token'];

      if (!refreshToken) {
        return res.status(401).json({ error: 'O seu token expirou' });
      }

      try {
        const userId = await RefreshTokenProvider.verifyRefreshToken(refreshToken);

        const payload = { userId };

        const accessToken = AccessTokenProvider.generate(payload);

        await RefreshTokenProvider.generate(userId);

        res.setHeader('Authorization', `Bearer ${accessToken}`);

        return next();
      } catch {
        return res.status(401).json({ error: 'O seu refresh token expirou' });
      }
    } else {
      return res.status(401).json({ error: 'O seu token é inválido' });
    }
  }
};
