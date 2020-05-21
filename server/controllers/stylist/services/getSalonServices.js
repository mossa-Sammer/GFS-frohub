const dbConnection = require('../../../database/config/dbConnection');

const getSalonServices = async (id) => dbConnection.query(
  'SELECT * FROM salon_service inner join service on salon_service.service_id = service.service_id inner join service_length on salon_service.service_length_id = service_length.service_length_id WHERE salon_service.salon_id=$1', [id],
);

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const services = await getSalonServices(id);
    const { rows: salonServices } = services;
    res.json({ salonServices });
  } catch (err) {
    next(err);
  }
};
