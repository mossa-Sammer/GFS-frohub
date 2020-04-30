const {
  getAllServices,
} = require('../../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const services = await getAllServices();
    res.send({ data: services.rows });
  } catch (err) {
    next(err);
  }
};
