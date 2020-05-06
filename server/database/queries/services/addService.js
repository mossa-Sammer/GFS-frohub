const dbConnection = require('../../config/dbConnection');

const insertService = 'INSERT INTO service (name) VALUES ($1) RETURNING *';

module.exports = (name) => dbConnection.query(insertService, [name]);
