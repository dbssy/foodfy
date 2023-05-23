const RefreshTokensRepository = require('../repositories/RefreshTokensRepository');

const expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

const RefreshTokenProvider = {
  async generate(userId) {
    if (!userId) {
      throw new Error('O ID do usuário não pode ser null ou undefined');
    }

    const { id } = await RefreshTokensRepository.create({
      expires_in,
      user_id: userId,
    });

    return id;
  },

  async getRefreshToken(userId) {
    if (!userId) {
      throw new Error('O ID do usuário não pode ser null ou undefined');
    }

    const refresh_token = await RefreshTokensRepository.findByUserId(userId);

    return refresh_token;
  },

  async regenerate(refreshTokenId, userId) {
    if (!refreshTokenId && !userId) {
      throw new Error('O ID do refresh token e/ou o ID do usuário não podem ser null ou undefined');
    }

    const refreshTokenExists = await RefreshTokensRepository.findByUserId(userId);

    if (!refreshTokenExists) {
      throw new Error('O refresh token não existe');
    }

    const { id } = await RefreshTokensRepository.update(refreshTokenId, {
      expires_in,
      user_id: userId,
    });

    return id;
  },

  async delete(userId) {
    if (!userId) {
      throw new Error('O ID do usuário não pode ser null ou undefined');
    }

    await RefreshTokensRepository.delete(userId);
  },
};

module.exports = RefreshTokenProvider;
