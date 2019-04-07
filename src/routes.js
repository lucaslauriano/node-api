const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');

routes.get('/users', UserController.getAll);
routes.get('/users/:username', UserController.get);
routes.get('/users/:username/repos', UserController.getRepos);
routes.get('/users/:username/details', UserController.getDetails);

module.exports = routes;
