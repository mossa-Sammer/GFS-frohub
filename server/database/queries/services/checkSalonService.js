const dbConnection = require('../../config/dbConnection');

module.exports = (serviceId) => dbConnection.query('SELECT * FROM salon_service WHERE salon_service_id=$1', [serviceId]);
