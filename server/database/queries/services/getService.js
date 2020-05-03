const dbConnection = require('../../config/dbConnection');

module.exports = (serviceId) => dbConnection.query('SELECT * FROM service WHERE service_id=$1', [serviceId]);
