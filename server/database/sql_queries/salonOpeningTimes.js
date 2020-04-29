const connection = require('../config/dbConnection');

const { multiRowInsert } = require('./helper');

// every single object should be like {
//   salonId, day, fromTime, toTime,
// }

const addSalonOpeningTimes = async (openingTimes) => {
  const { preparedStatment, values } = multiRowInsert(openingTimes);

  const text = `INSERT INTO salon_opening_time (salon_id,day,from_time,to_time) VALUES ${preparedStatment} RETURNING *`;

  const sql = {
    text,
    values,
  };

  return connection.query(sql);
};

module.exports = { addSalonOpeningTimes };
