const connection = require('../config/dbConnection');

const getSalon = (userId) => {
  const sql = {
    text: 'SELECT * FROM salon WHERE user_id=$1',
    values: [userId],
  };
  return connection.query(sql);
};

module.exports = { getSalon };
