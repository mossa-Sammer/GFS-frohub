const dbConnection = require('../../config/dbConnection');

module.exports = (name) => dbConnection.query('SELECT * FROM service WHERE name=$1', [name]);
