require('dotenv').config();

let CONFIG = {} //Make this global to use all over the application
CONFIG.db_uri = 'mongodb://127.0.0.1:27017';
CONFIG.jwt_secret = "secret"
module.exports = CONFIG;