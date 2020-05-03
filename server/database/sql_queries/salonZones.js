const connection = require('../config/dbConnection');
const { multiRowInsert } = require('./helper');


const getSalonZones = (salonId) => {
  const sql = {
    text: 'SELECT from_zone, to_zone, price FROM salon_zone WHERE salon_id=$1',
    values: [salonId],
  };
  return connection.query(sql);
};

// every single object should be {
//  salonId, fromZone, toZone, price
// }

const addSalonZones = async (zones, id) => {
  const { preparedStatment, values } = multiRowInsert(zones, id);
  const text = `INSERT INTO salon_zone (salon_id, from_zone, to_zone, price) VALUES ${preparedStatment} RETURNING *`;

  return connection.query(text, values);
};

module.exports = { addSalonZones, getSalonZones };
