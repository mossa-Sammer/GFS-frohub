const dbConnection = require('../../config/dbConnection');

module.exports = (id, role = 'stylist') => dbConnection.query('SELECT * FROM "user" WHERE user_id = $1 AND role = $2', [id, role]);
