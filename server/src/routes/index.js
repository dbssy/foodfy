const { Router } = require('express');

const authRoutes = require('./auth.routes');

const usersRoutes = require('./users.routes');

const recipesRoutes = require('./recipes.routes');

const routes = Router();

routes.use('/auth', authRoutes);

routes.use('/users', usersRoutes);

routes.use('/recipes', recipesRoutes);

module.exports = routes;
