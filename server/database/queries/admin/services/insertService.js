const connection = require('../../../config/dbConnection');


module.exports = (name, isActive) => connection.query(
  'INSERT INTO service (name, status) VALUES ($1,$2) RETURNING *',
  [name, isActive],
);
