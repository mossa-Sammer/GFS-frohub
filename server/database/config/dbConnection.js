const { Pool } = require('pg');
const { DATABASE_URL } = require('../../config/config');

const options = {
  connectionString: DATABASE_URL,
  // ssl: true,
};

module.exports = new Pool(options);
