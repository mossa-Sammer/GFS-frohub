const mongoose = require('mongoose');
const { mongoURI } = require('../config/config');

/**
 * create DB connection
 */
const dbConnection = () => mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

module.exports = dbConnection;
