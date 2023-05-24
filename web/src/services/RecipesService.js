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
}

export default new RecipesService();
