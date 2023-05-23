const { query } = require('../../database');

class UsersRepository {
  async findAll() {
    const rows = await query(`
      SELECT users.id, users.name, users.email, users.admin, users.avatar_url, total_recipes
      FROM users
      LEFT JOIN (
        SELECT user_id, COUNT(*) as total_recipes
        FROM recipes
        GROUP BY user_id
      ) AS recipe_counts ON users.id = recipe_counts.user_id
    `);

    return rows;
  }

  async findByUserId(id, withPassword = false) {
    if (withPassword === true) {
      const [row] = await query(`
        SELECT users.*, total_recipes
        FROM users
        LEFT JOIN (
          SELECT user_id, COUNT(*) as total_recipes
          FROM recipes
          GROUP BY user_id
        ) AS recipe_counts ON users.id = recipe_counts.user_id
        WHERE users.id = $1
    `, [id]);

      return row;
    }

    const [row] = await query(`
      SELECT users.id, users.name, users.email, users.admin, users.avatar_url, total_recipes
      FROM users
      LEFT JOIN (
        SELECT user_id, COUNT(*) as total_recipes
        FROM recipes
        GROUP BY user_id
      ) AS recipe_counts ON users.id = recipe_counts.user_id
      WHERE users.id = $1
  `, [id]);

    return row;
  }

  async findByUserEmail(email, withPassword = false) {
    if (withPassword === true) {
      const [row] = await query('SELECT * FROM users WHERE email = $1', [email]);

      return row;
    }

    const [row] = await query('SELECT id, email FROM users WHERE email = $1', [email]);

    return row;
  }

  async findImageById(id) {
    const [row] = await query('SELECT avatar_url FROM users WHERE id = $1', [id]);

    return row;
  }

  async create({
    name, email, password, admin, avatar_url,
  }) {
    const [row] = await query(`
      INSERT INTO users(name, email, password, admin, avatar_url)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, email, password, admin, avatar_url]);

    return row;
  }

  async update(id, { name, email, admin }) {
    const [row] = await query(`
      UPDATE users
      SET name = $1, email = $2, admin = $3
      WHERE id = $4
      RETURNING *
    `, [name, email, admin, id]);

    return row;
  }

  async updatePassword(id, { password }) {
    const [row] = await query('UPDATE users SET password = $1 WHERE id = $2', [password, id]);

    return row;
  }

  async updateAvatar(id, { avatar_url }) {
    const [row] = await query(`
      UPDATE users
      SET avatar_url = $1
      WHERE id = $2
      RETURNING avatar_url
    `, [avatar_url, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await query('DELETE FROM users WHERE id = $1', [id]);

    return deleteOp;
  }
}

module.exports = new UsersRepository();
