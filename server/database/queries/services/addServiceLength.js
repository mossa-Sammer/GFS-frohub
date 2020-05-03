const dbConnection = require('../../config/dbConnection');

module.exports = (name) => dbConnection.query('INSERT INTO service_length (name) VALUES ($1) RETURNING *', [name]);
