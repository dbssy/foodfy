const { unlinkSync } = require('fs');
const path = require('path');

const RecipesRepository = require('../repositories/RecipesRepository');

const isValidUUID = require('../utils/isValidUUID');

class RecipeController {
  async index(req, res) {
    const recipes = await RecipesRepository.findAll();

    return res.json(recipes);
  }

  async show(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'O ID da receita é inválido' });
    }

    const recipe = await RecipesRepository.findByRecipeId(id);

    if (!recipe) {
      return res.status(404).json({ error: 'Receita não encontrada' });
    }

    return res.json(recipe);
  }

  async store(req, res) {
    const {
      title,
      description,
      difficulty,
      prep_time,
      servings,
      ingredients,
      instructions,
      user_id,
    } = req.body;

    const image = req.file?.filename;

    if (!isValidUUID(user_id)) {
      return res.status(400).json({ error: 'Usuário inválido' });
    }

    if (!image) {
      const recipeFile = '../../../tmp/images/defaultRecipe.jpg';
      const image_url = recipeFile.replace('../../../tmp/images/', '');

      const recipe = await RecipesRepository.create({
        title,
        description,
        difficulty,
        prep_time,
        servings,
        ingredients,
        instructions,
        image_url,
        user_id,
      });

      return res.status(201).json(recipe);
    }

    if (!Object.values(req.body).every((value) => value)) {
      return res.status(400).json({ error: 'Todos os campos devem ser preenchidos' });
    }

    const recipe = await RecipesRepository.create({
      title,
      description,
      difficulty,
      prep_time,
      servings,
      ingredients,
      instructions,
      image_url: image,
      user_id,
    });

    return res.status(201).json(recipe);
  }

  async update(req, res) {
    const { id } = req.params;

    const {
      title,
      description,
      difficulty,
      prep_time,
      servings,
      ingredients,
      instructions,
      user_id,
    } = req.body;

    const image = req.file?.filename;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'O ID da receita é inválido' });
    }

    const recipe = await RecipesRepository.findByRecipeId(id);

    if (!recipe) {
      return res.status(404).json({ error: 'Receita não encontrada' });
    }

    if (!Object.values(req.body).every((value) => value)) {
      return res.status(400).json({ error: 'Todos os campos devem ser preenchidos' });
    }

    if (!isValidUUID(user_id)) {
      return res.status(400).json({ error: 'Usuário inválido' });
    }

    const { image_url } = await RecipesRepository.findImageById(id);

    if (!image_url.includes('defaultRecipe') && image !== image_url) {
      const imageFile = path.resolve(__dirname, '../../../tmp/images', `${image_url}`);

      unlinkSync(imageFile);
    }

    if (image) {
      const updateRecipe = await RecipesRepository.update(id, {
        title,
        description,
        difficulty,
        prep_time,
        servings,
        ingredients,
        instructions,
        image_url: image,
        user_id,
      });

      return res.status(201).json(updateRecipe);
    }

    const updateRecipe = await RecipesRepository.update(id, {
      title,
      description,
      difficulty,
      prep_time,
      servings,
      ingredients,
      instructions,
      image_url,
      user_id,
    });

    return res.status(201).json(updateRecipe);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'O ID da receita é inválido' });
    }

    const recipe = await RecipesRepository.findByRecipeId(id);

    if (!recipe) {
      return res.status(404).json({ error: 'Receita não encontrada' });
    }

    const { image_url } = await RecipesRepository.findImageById(id);

    if (!image_url.includes('defaultRecipe')) {
      const imageFile = path.resolve(__dirname, '../../../tmp/images', `${image_url}`);

      unlinkSync(imageFile);
    }

    await RecipesRepository.delete(id);

    return res.sendStatus(204);
  }
}

module.exports = new RecipeController();
