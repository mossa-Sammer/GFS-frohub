const dbConnection = require('../../../config/dbConnection');

module.exports = ({ email, hashedPass }) => dbConnection.query(
  'INSERT INTO "user" (email, password) VALUES ($1, $2) RETURNING *',
  [email, hashedPass],
);
