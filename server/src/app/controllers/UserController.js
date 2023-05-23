const { hash, compare } = require('bcryptjs');
const { unlinkSync } = require('fs');
const path = require('path');

const RecipesRepository = require('../repositories/RecipesRepository');
const UsersRepository = require('../repositories/UsersRepository');

const isValidUUID = require('../utils/isValidUUID');

class UserController {
  async index(req, res) {
    const users = await UsersRepository.findAll();

    return res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'O ID do Usuário é inválido' });
    }

    const user = await UsersRepository.findByUserId(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.json(user);
  }

  async showUserRecipes(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'O ID do Usuário é inválido' });
    }

    const user = await UsersRepository.findByUserId(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const recipes = await RecipesRepository.findByUserId(id);

    return res.json(recipes);
  }

  async update(req, res) {
    const { id } = req.params;

    const { name, email, admin } = req.body;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'O ID do usuário é inválido' });
    }

    const userExists = await UsersRepository.findByUserId(id);

    if (!userExists) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (!Object.values(req.body).every((value) => value)) {
      return res.status(400).json({ error: 'Todos os campos devem ser preenchidos' });
    }

    const emailAlreadyExists = await UsersRepository.findByEmail(email);

    if (emailAlreadyExists && emailAlreadyExists.id !== id) {
      return res.status(400).json({ error: 'Esse e-mail já está em uso' });
    }

    const user = await UsersRepository.update(id, {
      name,
      email,
      admin,
    });

    delete user.password;

    return res.status(200).json(user);
  }

  async updatePassword(req, res) {
    const { id } = req.params;

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'O ID do usuário é inválido' });
    }

    const user = await UsersRepository.findByUserId(id, true);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (!Object.values(req.body).every((value) => value)) {
      return res.status(400).json({ error: 'Todos os campos devem ser preenchidos' });
    }

    const matchedPassword = await compare(currentPassword, user.password);

    if (!matchedPassword) {
      return res.status(400).json({ error: 'A senha atual está incorreta' });
    }

    if (newPassword.length < 3) {
      return res.status(400).json({ error: 'A senha deve conter pelo menos 3 caracteres' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'A senha não corresponde à confirmação de senha' });
    }

    const hashedPassword = await hash(newPassword, 8);

    const updatedUser = await UsersRepository.updatePassword(id, {
      password: hashedPassword,
    });

    delete updatedUser?.password;

    return res.sendStatus(204);
  }

  async updateAvatar(req, res) {
    const { id } = req.params;

    const avatar = req.file?.filename;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'O ID do usuário é inválido' });
    }

    const user = await UsersRepository.findByUserId(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { avatar_url } = await UsersRepository.findImageById(id);

    if (!avatar_url.includes('defaultAvatar')) {
      const imageFile = path.resolve(__dirname, '../../../tmp/images', avatar_url);

      unlinkSync(imageFile);
    }

    const updatedUser = await UsersRepository.updateAvatar(id, {
      avatar_url: avatar,
    });

    return res.json(updatedUser);
  }

  async deleteAvatar(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'O ID do usuário é inválido' });
    }

    const user = await UsersRepository.findByUserId(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { avatar_url } = await UsersRepository.findImageById(id);

    const avatarFile = '../../../tmp/imagesdefaultAvatar.png';
    const defaultAvatar = avatarFile.replace('../../../tmp/images', '');

    if (!avatar_url.includes('defaultAvatar')) {
      const imageFile = path.resolve(__dirname, '../../../tmp/images', avatar_url);

      unlinkSync(imageFile);
    }

    const updatedUser = await UsersRepository.updateAvatar(id, {
      avatar_url: defaultAvatar,
    });

    return res.json(updatedUser);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'O ID do usuário é inválido' });
    }

    const user = await UsersRepository.findByUserId(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { avatar_url } = await UsersRepository.findImageById(id);

    if (!avatar_url.includes('defaultAvatar')) {
      const imageFile = path.resolve(__dirname, '../../../tmp/images', avatar_url);

      unlinkSync(imageFile);
    }

    await UsersRepository.delete(id);

    return res.sendStatus(204);
  }
}

module.exports = new UserController();
