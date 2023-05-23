const jwt = require('jsonwebtoken');

const RevokedTokensRepository = require('../repositories/RevokedTokensRepository');

const EnvConfig = require('../../config/envConfig');

const expiresIn = EnvConfig.accessTokenExpiresIn;

const AccessTokenProvider = {
  generate({ payload }) {
    const token = jwt.sign(payload, EnvConfig.secretKey, { expiresIn });

    return token;
  },

  async verify(token) {
    try {
      jwt.verify(token, EnvConfig.secretKey);

      const isRevoked = await RevokedTokensRepository.findByToken(token);

      if (isRevoked) {
        throw new Error('O seu token foi revogado');
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('O seu token está expirado');
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('O seu token está inválido');
      }

      throw error;
    }
  },

  decode(token) {
    const data = jwt.decode(token, { json: true });

    return data;
  },
};

module.exports = AccessTokenProvider;
