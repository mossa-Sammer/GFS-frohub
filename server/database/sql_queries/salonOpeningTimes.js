const connection = require('../config/dbConnection');

const { multiRowInsert } = require('./helper');


const getSalonOpeningTimes = (salonId) => {
  const sql = {
    text: 'SELECT * FROM salon_opening_time WHERE salon_opening_time.salon_id=$1',
    values: [salonId],
  };
  return connection.query(sql);
};


// every single object should be like {
//   salonId, day, fromTime, toTime,
// }

const addSalonOpeningTimes = async (openingTimes, id) => {
  const { preparedStatment, values } = multiRowInsert(openingTimes, id);

  const text = `INSERT INTO salon_opening_time (salon_id,day,from_time,to_time) VALUES ${preparedStatment} RETURNING *`;

  const sql = {
    text,
    values,
  };

  return connection.query(sql);
};

/*
  openingTimeId,
  salonId,
  day,
  fromTime,
  toTime
*/

const deleteOpeningTimes = (salonId) => {
  const sql = {
    text: 'DELETE FROM salon_opening_time WHERE salon_id=$1',
    values: [salonId],
  };
  return connection.query(sql);
};

module.exports = {
  getSalonOpeningTimes,
  addSalonOpeningTimes,
  deleteOpeningTimes,
};
