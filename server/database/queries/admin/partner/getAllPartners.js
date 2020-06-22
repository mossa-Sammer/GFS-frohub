const dbConnection = require('../../../config/dbConnection');

module.exports = () => dbConnection.query(
  'SELECT user_id, first_name || last_name AS fullNAme , email, calling_code, phone_number, role FROM "user"',
);
