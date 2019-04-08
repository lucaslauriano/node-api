const fetch = require('node-fetch');
const env = require('../commons/environment');

var prev = 0;

class Users {
  constructor() {
    this.proxy;
    this.usersProxy;
    this.detailsProxy;
    this.createDetail;
    this.createLinks;
    this.setPreviousPage;
  }

  createLinks(json, server) {
    var _next = json[json.length - 1].id,
      _prev = prev;

    const obj = {
      _links: {
        next: `${server}?since=${_next}`,
        prev: `${server}?since=${_prev}`
      },
      users: json
    };

    return obj;
  }

  setPreviousPage(obj) {
    var id = obj.users[0].id;
    var prev = id <= 1 ? 0 : obj.users[0].id;
    return prev;
  }

  proxy(req, res, path) {
    fetch(path)
      .then(response => response.json())
      .then(items => {
        return res.json(items);
      });
  }

  usersProxy(req, res, path) {
    if (req.query) {
      const { since } = req.query;
      if (since) {
        path =
          env.github_api +
          `?since=${since}&per_page=${10}&client_id=env.github_user_id&client_secret=env.github_user_key'`;
      }
    }

    fetch(path)
      .then(response => response.json())
      .then(json => {
        var obj = this.createLinks(json, env.server);
        prev = this.setPreviousPage(obj);
        return res.json(obj);
      })
      .catch(function(e) {
        console.log(e);
      });
  }

  detailsProxy(req, res, path) {
    fetch(path)
      .then(response => response.json())
      .then(json => {
        var details = this.createDetail(json);
        res.send(details);
      })
      .catch(function(e) {
        console.log(e);
      });
  }

  createDetail(json) {
    const user = {
      id: json.id,
      login: json.login,
      name: json.name,
      bio: json.bio,
      avatar: json.avatar_url,
      location: json.location,
      url: json.html_url,
      created: json.created_at
    };
    return user;
  }

  createLinks(json, server) {
    var _next = json[json.length - 1].id,
      _prev = prev;

    const obj = {
      _links: {
        next: `${server}?since=${_next}`,
        prev: `${server}?since=${_prev}`
      },
      users: json
    };

    return obj;
  }

  setPreviousPage(obj) {
    var id = obj.users[0].id;
    var prev = id <= 1 ? 0 : obj.users[0].id;
    return prev;
  }
}

module.exports = new Users();
