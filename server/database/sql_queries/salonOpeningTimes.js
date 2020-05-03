const connection = require('../config/dbConnection');

const getSalonOpeningTimes = (salonId) => {
  const sql = {
    text: 'SELECT day, from_time, to_time FROM salon_opening_time WHERE salon_opening_time.salon_id=$1',
    values: [salonId],
  };
  return connection.query(sql);
};

module.exports = { getSalonOpeningTimes };
