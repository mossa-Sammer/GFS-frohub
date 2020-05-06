const {
  getServicesLengthes,
} = require('../../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const servicesLengthes = await getServicesLengthes();
    res.json({ servicesLengthes: servicesLengthes.rows });
  } catch (err) {
    next(err);
  }
};
