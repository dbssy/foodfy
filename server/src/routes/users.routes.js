const { Router } = require('express');

const ensureAuthenticated = require('../app/middlewares/auth/ensureAuthenticated');
const multer = require('../app/middlewares/multer');

const UserController = require('../app/controllers/UserController');

const route = Router();

route.get('/', UserController.index);

route.get('/show/:id', UserController.show);

route.get('/show/:id/recipes', UserController.showUserRecipes);

route.use(ensureAuthenticated);

route.get('/me', UserController.me);

route.put('/:id', UserController.update);

route.patch('/password/:id', UserController.updatePassword);

route.patch('/avatar/:id', multer.single('avatar_url'), UserController.updateAvatar);

route.delete('/avatar/:id', UserController.deleteAvatar);

route.delete('/:id', UserController.delete);

module.exports = route;
