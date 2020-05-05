const dbConnection = require('../../config/dbConnection');

const insertServiceImages = require('../helper/insertImages');

module.exports = async (images, salonServiceId) => {
  const { preparedStatment, values } = insertServiceImages(images, salonServiceId);

  const text = `INSERT INTO service_image (salon_service_id, image) VALUES ${preparedStatment} RETURNING *`;

  return dbConnection.query(text, values);
};
