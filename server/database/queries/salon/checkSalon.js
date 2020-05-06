const dbConnection = require('../../config/dbConnection');

module.exports = (id) => dbConnection.query('SELECT * FROM salon WHERE salon_id=$1', [id]);
