const dbConnection = require('../../config/dbConnection');

module.exports = async ({
  salon_id: salonId,
  salon_service_id: salonServiceId,
  user_id: userId,
  service_id: serviceId,
  service_length_id: serviceLengthId,
  price,
}) => dbConnection.query('UPDATE salon_service SET salon_id=$1, user_id=$2, service_id=$3, service_length_id=$4, price=$5 WHERE salon_service_id=$6 RETURNING *', [
  salonId,
  userId,
  serviceId,
  serviceLengthId,
  price,
  salonServiceId,
]);
