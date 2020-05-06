const connection = require('../../config/dbConnection');

const deleteSalonServiceImages = (salonServiceId) => connection.query(
  'DELETE FROM service_image WHERE salon_service_id=$1', [salonServiceId],
);
module.exports = deleteSalonServiceImages;
