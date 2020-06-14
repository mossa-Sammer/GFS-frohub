const dbConnection = require('../../../database/config/dbConnection');

const getServiceImages = async (id) => dbConnection.query('SELECT image FROM service_image WHERE salon_service_id=$1', [id]);

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows } = await getServiceImages(id);
    res.json({ images: rows });
  } catch (err) {
    next(err);
  }
};
