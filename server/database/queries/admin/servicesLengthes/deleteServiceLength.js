const connection = require('../../../config/dbConnection');

module.exports = (id) => connection.query('DELETE FROM service_length WHERE service_length_id=$1', [id]);
