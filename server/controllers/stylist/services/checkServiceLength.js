const dbConnection = require('../../../database/config/dbConnection');

module.exports = (name) => dbConnection.query('SELECT * FROM service_length WHERE name=$1', [name]);
