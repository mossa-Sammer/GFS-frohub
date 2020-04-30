const {
  getServicesLengthes,
} = require('../../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const servicesLengthes = await getServicesLengthes();
    res.send({ data: servicesLengthes.rows });
  } catch (err) {
    next(err);
  }
};
