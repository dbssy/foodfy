import HttpClient from './utils/HttpClient';

import UserMapper from './mappers/UserMapper';

class AuthServices {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333/auth');
  }

  signUp(user) {
    const body = UserMapper.toPersistence(user);

    return this.httpClient.post('/signup', { body });
  }

  signIn(user) {
    const body = UserMapper.toPersistence(user);

    return this.httpClient.post('/signin', { body });
  }

  signOut(token) {
    return this.httpClient.delete('/signout', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new AuthServices();
