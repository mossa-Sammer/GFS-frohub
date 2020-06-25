const connection = require('../../../config/dbConnection');


module.exports = () => connection.query('SELECT * FROM service_length');
