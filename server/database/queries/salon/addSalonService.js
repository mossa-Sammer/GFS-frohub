const dbConnection = require('../../config/dbConnection');

module.exports = ({
  salon_id: salonId,
  service_id: serviceId,
  service_length_id: serviceLengthId,
  user_id: userId, price,
}) => {
  const insertSalonService = {
    text: 'INSERT INTO salon_service (salon_id, user_id, service_id, service_length_id, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [
      salonId,
      userId,
      serviceId,
      serviceLengthId,
      price],
  };
  return dbConnection.query(insertSalonService);
};
