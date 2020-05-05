const dbConnection = require('../../../config/dbConnection');

module.exports = (id) => dbConnection.query('SELECT * FROM finance WHERE user_id=$1', [id]);
