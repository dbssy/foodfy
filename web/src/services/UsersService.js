import HttpClient from './utils/HttpClient';

import UserMapper from './mappers/UserMapper';
import RecipeMapper from './mappers/RecipeMapper';

class UsersService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333/users');
  }

  async listUsers(signal) {
    const users = await this.httpClient.get('/', { signal });

    return users.map(UserMapper.toDomain);
  }

  async getUserById(id, signal) {
    const user = await this.httpClient.get(`/show/${id}`, { signal });

    return UserMapper.toDomain(user);
  }

  async getUserRecipesById(id, signal) {
    const recipes = await this.httpClient.get(`/show/${id}/recipes`, { signal });

    return recipes.map(RecipeMapper.toDomain);
  }

  async getCurrentUser(token, signal) {
    const user = await this.httpClient.get('/me', {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });

    return UserMapper.toDomain(user);
  }

  deleteUser(id, token) {
    return this.httpClient.delete(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new UsersService();
