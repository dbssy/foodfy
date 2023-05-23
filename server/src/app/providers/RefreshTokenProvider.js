const RefreshTokensRepository = require('../repositories/RefreshTokensRepository');

const expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

const RefreshTokenProvider = {
  async generate(user_id) {
    if (!user_id) {
      throw new Error('O ID do usuário não pode ser null ou undefined');
    }

    const { id } = await RefreshTokensRepository.create({
      expires_in,
      user_id,
    });

    return id;
  },

  async getRefreshToken(user_id) {
    if (!user_id) {
      throw new Error('O ID do usuário não pode ser null ou undefined');
    }

    const refresh_token = await RefreshTokensRepository.findByUserId({ user_id });

    return refresh_token;
  },

  async regenerate(refreshTokenId, user_id) {
    if (!refreshTokenId && !user_id) {
      throw new Error('O ID do refresh token e/ou o ID do usuário não podem ser null ou undefined');
    }

    const refreshTokenExists = await RefreshTokensRepository.findByUserId({ user_id });

    if (!refreshTokenExists) {
      throw new Error('O refresh token não existe');
    }

    const { id } = await RefreshTokensRepository.update(refreshTokenId, {
      expires_in,
      user_id,
    });

    return id;
  },

  async verifyRefreshToken(token) {
    if (!token) {
      throw new Error('O token não pode ser null ou undefined');
    }

    const userId = await RefreshTokensRepository.findByToken(token);

    return userId;
  },

  async delete(user_id) {
    if (!user_id) {
      throw new Error('O ID do usuário não pode ser null ou undefined');
    }

    await RefreshTokensRepository.delete(user_id);
  },
};

module.exports = RefreshTokenProvider;
