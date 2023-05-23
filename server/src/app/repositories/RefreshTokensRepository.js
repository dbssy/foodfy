const { query } = require('../../database');

class RefreshTokensRepository {
  async findByToken(token) {
    const [row] = await query('SELECT * FROM refresh_tokens WHERE token = $1', [token]);

    return row;
  }

  async findByUserId({ user_id }) {
    const [row] = await query('SELECT * FROM refresh_tokens WHERE user_id = $1', [user_id]);

    return row;
  }

  async create({ expires_in, user_id }) {
    const [row] = await query(`
      INSERT INTO refresh_tokens (expires_in, user_id)
      VALUES ($1, $2)
      RETURNING *
    `, [expires_in, user_id]);

    return row;
  }

  async update(id, { expires_in, user_id }) {
    const [row] = await query(`
      UPDATE refresh_tokens
      SET expires_in = $1, user_id = $2
      WHERE id = $3
      RETURNING *
    `, [expires_in, user_id, id]);

    return row;
  }

  async delete(user_id) {
    const deleteOp = await query('DELETE FROM refresh_tokens WHERE user_id = $1', [user_id]);

    return deleteOp;
  }
}

module.exports = new RefreshTokensRepository();
