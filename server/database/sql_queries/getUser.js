const connection = require('../config/dbConnection');

exports.getUserById = (id) => {
  const sql = {
    text: 'SELECT * FROM "user" WHERE user_id=$1',
    values: [id],
  };
  return connection.query(sql);
};

exports.getUserByEmail = (email) => {
  const sql = {
    text: 'SELECT * FROM "user" WHERE email=$1',
    values: [email],
  };
  return connection.query(sql);
};
