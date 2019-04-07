const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const fetch = require('node-fetch');
const path = 'https://api.github.com/users';

const Users = fetch(path)
  .then(res => res.json())
  .then(json => {
    return json;
  });

const UserSchema = new mongoose.Schema(Users);

UserSchema.plugin(mongoosePaginate);

mongoose.model('Users', UserSchema);
