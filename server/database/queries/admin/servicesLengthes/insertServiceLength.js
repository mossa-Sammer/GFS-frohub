const connection = require('../../../config/dbConnection');

module.exports = (name, status) => connection.query(
  'INSERT INTO service_length (name,status) VALUES ($1,$2) RETURNING *',
  [name, status],
);
