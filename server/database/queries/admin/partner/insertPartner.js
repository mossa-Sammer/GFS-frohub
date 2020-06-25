const dbConnection = require('../../../config/dbConnection');

module.exports = ({
  email, hashedPass, firstName, lastName,
}) => dbConnection.query(
  'INSERT INTO "user" (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
  [email, hashedPass, firstName, lastName],
);
