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

  createRecipe(recipe, token) {
    if (recipe instanceof FormData) {
      return this.httpClient.post('/', {
        headers: { Authorization: `Bearer ${token}` },
        body: recipe,
      });
    }

    const body = RecipeMapper.toPersistence(recipe);

    return this.httpClient.withJSON('/', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body,
    });
  }

  updateRecipe(id, recipe, token) {
    if (recipe instanceof FormData) {
      return this.httpClient.put(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        body: recipe,
      });
    }

    const body = RecipeMapper.toPersistence(recipe);

    return this.httpClient.withJSON(`/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body,
    });
  }

  deleteRecipe(id, token) {
    return this.httpClient.delete(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new RecipesService();
