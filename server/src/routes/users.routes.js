const { Router } = require('express');

const multer = require('../app/middlewares/multer');

const UserController = require('../app/controllers/UserController');

const route = Router();

route.get('/users', UserController.index);
route.get('/users/show/:id', UserController.show);
route.get('/users/show/:id/recipes', UserController.showUserRecipes);

route.put('/:id', UserController.update);

route.patch('/password/:id', UserController.updatePassword);

route.patch('/avatar/:id', multer.single('avatar_url'), UserController.updateAvatar);

route.delete('/avatar/:id', UserController.deleteAvatar);

route.delete('/:id', UserController.delete);

module.exports = route;
