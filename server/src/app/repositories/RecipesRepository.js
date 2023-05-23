const { query } = require('../../database');

class RecipesRepository {
  async findAll() {
    const rows = await query(`
      SELECT recipes.*, users.name AS author
      FROM recipes
      LEFT JOIN users ON (recipes.user_id = users.id)
    `);

    return rows;
  }

  async findByRecipeId(id) {
    const [row] = await query(`
      SELECT recipes.*, users.name AS author
      FROM recipes
      LEFT JOIN users on (recipes.user_id = users.id)
      WHERE recipes.id = $1
    `, [id]);

    return row;
  }

  async findByUserId(id) {
    const rows = await query(`
      SELECT recipes.*, users.name AS author
      FROM recipes
      LEFT JOIN users on (recipes.user_id = users.id)
      WHERE recipes.user_id = $1
    `, [id]);

    return rows;
  }

  async findImageById(id) {
    const [row] = await query('SELECT image_url FROM recipes WHERE id = $1', [id]);

    return row;
  }

  async create({
    title,
    description,
    difficulty,
    prep_time,
    servings,
    ingredients,
    instructions,
    image_url,
    user_id,
  }) {
    const [row] = await query(`
      INSERT INTO recipes (title, description, difficulty, prep_time, servings, ingredients, instructions, image_url, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [title, description, difficulty, prep_time, servings, ingredients, instructions, image_url, user_id]);

    return row;
  }

  async update(id, {
    title,
    description,
    difficulty,
    prep_time,
    servings,
    ingredients,
    instructions,
    image_url,
    user_id,
  }) {
    const [row] = await query(`
      UPDATE recipes
      SET title = $1, description = $2, difficulty = $3, prep_time = $4, servings = $5, ingredients = $6, instructions = $7, image_url = $8, user_id = $9
      WHERE id = $10
      RETURNING *
    `, [title, description, difficulty, prep_time, servings, ingredients, instructions, image_url, user_id, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await query('DELETE FROM recipes WHERE id = $1', [id]);

    return deleteOp;
  }
}

module.exports = new RecipesRepository();
