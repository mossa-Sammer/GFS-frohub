const dbConnection = require('../../../config/dbConnection');

module.exports = (userId) => dbConnection.query('SELECT * FROM business WHERE user_id = $1', [userId]);
