const { query } = require('../../database');

class RevokedTokens {
  async findByToken(token) {
    const [row] = await query('SELECT * FROM revoked_tokens WHERE token = $1', [token]);

    return row;
  }

  async create(token) {
    const [row] = await query('INSERT INTO revoked_tokens (token) VALUES ($1)', [token]);

    return row;
  }
}

module.exports = new RevokedTokens();
