const connection = require('../../../config/dbConnection');

module.exports = ({ id, name, status }) => connection.query(
  'UPDATE service_length SET name=$1, status=$2 WHERE service_length_id=$3 RETURNING *', [name, status, id],
);
