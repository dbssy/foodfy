const { hash, compare } = require('bcryptjs');

const AccessTokenProvider = require('../providers/AccessTokenProvider');
const RefreshTokenProvider = require('../providers/RefreshTokenProvider');

const UsersRepository = require('../repositories/UsersRepository');
const RevokedTokensRepository = require('../repositories/RevokedTokensRepository');

const isValidUUID = require('../utils/isValidUUID');

class AuthController {
  async signUp(req, res) {
    const { name, email, password } = req.body;

    const avatarFile = '../../../tmp/images/defaultAvatar.png';
    const avatar_url = avatarFile.replace('../../../tmp/images/', '');

    if (!Object.values(req.body).every((value) => value)) {
      return res.status(400).json({ error: 'Todos os campos devem ser preenchidos' });
    }

    const userAlreadyExists = await UsersRepository.findByUserEmail(email);

    if (userAlreadyExists) {
      return res.status(400).json({ error: 'Esse email já está em uso' });
    }

    const hashedPassword = await hash(password, 8);

    const user = await UsersRepository.create({
      name,
      email,
      password: hashedPassword,
      admin: false,
      avatar_url,
    });

    delete user.password;

    const payload = {
      userId: user.id,
    };

    const token = AccessTokenProvider.generate({ payload });
    await RefreshTokenProvider.generate(user.id);

    return res.status(201).json({ user, token });
  }

  async signIn(req, res) {
    const { email, password } = req.body;

    if (!Object.values(req.body).every((value) => value)) {
      return res.status(400).json({ error: 'Todos os campos devem ser preenchidos' });
    }

    const user = await UsersRepository.findByUserEmail(email, true);

    if (!user) {
      return res.status(400).json({ error: 'A combinação de endereço de e-mail ou senha está incorreta' });
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      return res.status(400).json({ error: 'A combinação de endereço de e-mail ou senha está incorreta' });
    }

    delete user.password;

    const payload = {
      userId: user.id,
    };

    const token = AccessTokenProvider.generate({ payload });

    const userHasRefreshToken = await RefreshTokenProvider.getRefreshToken(user.id);

    if (userHasRefreshToken) {
      const { id } = userHasRefreshToken;

      await RefreshTokenProvider.regenerate(id, user.id);
    } else {
      await RefreshTokenProvider.generate(user.id);
    }

    return res.status(200).json({ user, token });
  }

  async signOut(req, res) {
    const { userId, tokenRequesting } = req;

    if (!isValidUUID(userId)) {
      return res.status(400).json({ error: 'O ID do usuário é inválido' });
    }

    const userExists = await UsersRepository.findByUserId(userId);

    if (!userExists) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await RefreshTokenProvider.delete(userId);
    await RevokedTokensRepository.create(tokenRequesting);

    return res.status(200).json({ message: 'Você foi desconectado com sucesso' });
  }
}

module.exports = new AuthController();
