require('custom-env').env();

module.exports = {
  server: process.env.DEV_SERVER,
  github_api: process.env.GITHUB_API_URL,
  github_user_id: process.env.GITHUB_USER_ID,
  github_user_key: process.env.GITHUB_USER_KEY
};
