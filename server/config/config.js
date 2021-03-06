// read the config file
require('dotenv').config();

// Get Mongodb URI
let mongoURI = process.env.MONGO_URI_DEV;
let DATABASE_URL = '';

if (process.env.NODE_ENV === 'test') {
  DATABASE_URL = process.env.TEST_DB;
} else if (process.env.NODE_ENV === 'production') {
  mongoURI = process.env.MONGO_URI;
  DATABASE_URL = process.env.DATABASE_URL;
} else {
  DATABASE_URL = process.env.DATABASE_URL_DEV;
}

const secret = process.env.SECRET;

module.exports = {
  mongoURI,
  secret,
  DATABASE_URL,
};
