const dbConnection = require('../../../config/dbConnection');

module.exports = (id) => dbConnection.query(
  'SELECT * FROM business WHERE user_id=$1',
  [id],
);
