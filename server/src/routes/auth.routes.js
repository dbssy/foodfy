const { Router } = require('express');

const ensureAuthenticated = require('../app/middlewares/auth/ensureAuthenticated');

const AuthController = require('../app/controllers/AuthController');

const route = Router();

route.post('/signup', AuthController.signUp);

route.post('/signin', AuthController.signIn);

route.delete('/signout', ensureAuthenticated, AuthController.signOut);

module.exports = route;
