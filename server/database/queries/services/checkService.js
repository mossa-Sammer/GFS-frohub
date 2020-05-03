const dbConnection = require('../../config/dbConnection');

const selectService = 'SELECT * FROM service WHERE name=$1';

module.exports = (name) => dbConnection.query(selectService, [name]);
