import HttpClient from './utils/HttpClient';

import RecipeMapper from './mappers/RecipeMapper';

class RecipesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333/recipes');
  }

  async listRecipes(signal) {
    const recipes = await this.httpClient.get('/', { signal });

    return recipes.map(RecipeMapper.toDomain);
  }

  async getRecipeById(id, signal) {
    const recipe = await this.httpClient.get(`/show/${id}`, { signal });

    return RecipeMapper.toDomain(recipe);
  }

  deleteRecipe(id, token) {
    return this.httpClient.delete(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new RecipesService();
