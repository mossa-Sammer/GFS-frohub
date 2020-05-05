const {
  checkSalonService,
} = require('../../../database/queries');

/* eslint-disable no-unused-vars */
module.exports = async (req, res, next) => {
  const {
    salonId,
    serviceId,
  } = req.params;
  try {
    const { rows: isService } = await checkSalonService(serviceId);
    console.log(888888, isService);
  } catch (err) {
    console.log(11111111111, err);
    next(err);
  }
};
