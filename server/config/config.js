// read the config file
require('dotenv').config();

// Get Mongodb URI
let mongoURI = process.env.MONGO_URI_DEV;
let DATABASE_URL = process.env.DATABASE_URL_DEV;

if (process.env.NODE_ENV === 'test') {
  mongoURI = process.env.MONGOURI_TEST;
  DATABASE_URL = process.env.TEST_DB;
} else if (process.env.NODE_ENV === 'production') {
  mongoURI = process.env.MONGO_URI;
  DATABASE_URL = process.env.DATABASE_URL;
}

const secret = process.env.SECRET;

module.exports = {
  mongoURI,
  secret,
  DATABASE_URL,
};
