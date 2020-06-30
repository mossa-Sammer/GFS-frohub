const connection = require('../../../config/dbConnection');

module.exports = ({ id, name, status }) => connection.query(
  'UPDATE service SET name=$1, status=$2 WHERE service_id=$3 RETURNING *', [name, status, id],
);
