import HttpClient from './utils/HttpClient';

import UserMapper from './mappers/UserMapper';

class UsersService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333/users');
  }

  async listUsers(signal) {
    const users = await this.httpClient.get('/', { signal });

    return users.map(UserMapper.toDomain);
  }
}

export default new UsersService();
