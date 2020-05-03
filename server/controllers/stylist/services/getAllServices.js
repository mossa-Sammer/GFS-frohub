const {
  getAllServices,
} = require('../../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const services = await getAllServices();
    res.send({ services: services.rows });
  } catch (err) {
    next(err);
  }
};
