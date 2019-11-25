// read the config file
require('dotenv').config();

// Get Mongodb URI
let mongoURI = process.env.MONGO_URI_DEV;

if (process.env.NODE_ENV === 'test') {
  mongoURI = process.env.MONGOURI_TEST;
} else if (process.env.NODE_ENV === 'production') {
  mongoURI = process.env.MONGO_URI;
}

const secret = process.env.SECRET;

module.exports = {
  mongoURI,
  secret,
};
