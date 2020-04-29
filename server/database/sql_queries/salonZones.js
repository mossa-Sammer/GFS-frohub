const connection = require('../config/dbConnection');
const { multiRowInsert } = require('./helper');

// every single object should be {
//  salonId, fromZone, toZone, price
// }

const addSalonZones = async (zones) => {
  const { preparedStatment, values } = multiRowInsert(zones);
  const text = `INSERT INTO salon_zone (salon_id, from_zone, to_zone, price) VALUES ${preparedStatment} RETURNING *`;

  return connection.query(text, values);
};

module.exports = { addSalonZones };
