const connection = require('../config/dbConnection');

const getSalonZones = (salonId) => {
  const sql = {
    text: 'SELECT from_zone, to_zone, price FROM salon_zone WHERE salon_id=$1',
    values: [salonId],
  };
  return connection.query(sql);
};

module.exports = { getSalonZones };
