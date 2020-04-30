const dbConnection = require('../../config/dbConnection');

module.exports = () => dbConnection.query('SELECT * FROM service_length');
