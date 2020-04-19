require('dotenv').config();
const { Pool } = require('pg');

let dbUrl = '';

if (process.env.NODE_NEV === 'production') {
  dbUrl = process.env.DATABASE_URL;
} else if (process.env.NODE_NEV === 'test') {
  dbUrl = process.env.TEST_DB;
} else {
  // default to development if no db spacfied
  dbUrl = process.env.DEV_DB;
}

const options = {
  connectionString: dbUrl,
  ssl: true,
};

module.exports = new Pool(options);
