const { Router } = require('express');

const ensureAuthenticated = require('../app/middlewares/auth/ensureAuthenticated');
const multer = require('../app/middlewares/multer');

const RecipeController = require('../app/controllers/RecipeController');

const route = Router();

route.get('/', RecipeController.index);

route.get('/show/:id', RecipeController.show);

route.use(ensureAuthenticated);

route.post('/', multer.single('image_url'), RecipeController.store);

route.put('/:id', multer.single('image_url'), RecipeController.update);

route.delete('/:id', RecipeController.delete);

module.exports = route;
