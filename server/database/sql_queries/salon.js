const connection = require('../config/dbConnection');

const getSalon = (userId) => {
  const sql = {
    text: 'SELECT * FROM salon WHERE user_id=$1',
    values: [userId],
  };
  return connection.query(sql);
};

module.exports = { getSalon };


/* 'SELECT * FROM salon INNER JOIN salon_zone ON salon.
salon_id=salon_zone.salon_id INNER JOIN salon_opening_time ON salon.
salon_id=salon_opening_time.salon_id WHERE user_id=$1'
*/
