const dbConnection = require('../../../config/dbConnection');

module.exports = ({
  email, hashedPass, firstName, lastName, role,
}) => dbConnection.query(
  'INSERT INTO "user" (email, password, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  [email, hashedPass, firstName, lastName, role],
);
