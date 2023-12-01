const mongoose = require('mongoose');
const CONFIG = require('../courses_planning/config/config')
async function connectToDatabase() {
  await mongoose.connect(CONFIG.db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function closeDatabase() {
  await mongoose.connection.close();
}

module.exports = { connectToDatabase, closeDatabase};