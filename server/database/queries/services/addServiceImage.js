const dbConnection = require('../../config/dbConnection');

const { multiRowInsert } = require('../../sql_queries/helper');

module.exports = async (images, salonServiceId) => {
  const { preparedStatment, values } = multiRowInsert(images, salonServiceId);
  const text = `INSERT INTO service_image (salon_service_id, image) VALUES ${preparedStatment} RETURNING *`;
  return dbConnection.query(text, values);
};
