const connection = require('../../../config/dbConnection');

module.exports = (id) => connection.query('DELETE FROM service WHERE service_id=$1', [id]);
