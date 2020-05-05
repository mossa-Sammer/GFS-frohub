const {
  badRequest,
  unauthorized,
} = require('@hapi/boom');

const {
  checkSalonService,
} = require('../../../database/queries');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  const {
    salonId,
    serviceId,
  } = req.params;
  try {
    const { rows: isService } = await checkSalonService(serviceId);
    if (!isService.length) return next(badRequest('Service isnt exist'));
    const {
      salon_id: serviceOwnerId,
    } = isService[0];
    if (Number(salonId) !== Number(serviceOwnerId)) return next(unauthorized('Unauthorized'));
  } catch (err) {
    next(err);
  }
};
