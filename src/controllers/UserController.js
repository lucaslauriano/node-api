const env = require('./../commons/environment');
const UsersService = require('../services/UsersServices');

module.exports = {
  async getAll(req, res) {
    const path = env.github_api;
    UsersService.usersProxy(req, res, path);
  },

  async get(req, res) {
    const path = env.github_api + '/' + req.params.username;
    UsersService.proxy(req, res, path);
  },

  async getRepos(req, res) {
    const path = env.github_api + '/' + req.params.username + '/repos';
    UsersService.proxy(req, res, path);
  },

  async getDetails(req, res) {
    const path = env.github_api + '/' + req.params.username;
    UsersService.detailsProxy(req, res, path);
  }
};
