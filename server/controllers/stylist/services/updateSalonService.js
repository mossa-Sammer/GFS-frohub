const {
  badRequest,
  unauthorized,
  notFound,
  badData,
} = require('@hapi/boom');

const {
  checkSalonService,
  checkService,
  checkServiceLength,
  addServiceLength,
  updateSalonService,
  deleteSalonServiceImages,
  insertServiceImage,
} = require('../../../database/queries');

const { validateSalonService } = require('./validation/validateAddSalonService');

const { validationError } = require('../../helper');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  const {
    salonId,
    serviceId,
  } = req.params;
  const salonService = {};
  try {
    const { rows: isService } = await checkSalonService(serviceId);
    if (!isService.length) return next(badRequest('Service isnt exist'));
    const {
      salon_id: serviceOwnerId,
      user_id: userId,
    } = isService[0];
    if (Number(salonId) !== Number(serviceOwnerId)) return next(unauthorized('Unauthorized'));
    const {
      service,
      length,
      price,
      images,
    } = req.body;
    await validateSalonService.validate({
      service,
      length,
      price,
      images,
    }, { abortEarly: false });
    const { rows: [serviceNameExist] } = await checkService(service);
    if (!serviceNameExist) return next(notFound('Service name not found'));
    salonService.salon_id = salonId;
    salonService.user_id = userId;
    salonService.service_id = serviceNameExist.service_id;
    salonService.salon_service_id = serviceId;
    const { rows: [isServiceLength] } = await checkServiceLength(length);
    if (!isServiceLength) {
      const { rows: [insertedLength] } = await addServiceLength(length);
      salonService.service_length_id = insertedLength.service_length_id;
    } else {
      salonService.service_length_id = isServiceLength.service_length_id;
    }
    salonService.price = price;
    const { rows: [updatedService] } = await updateSalonService(salonService);
    const { salon_service_id: salonServiceId } = updatedService;
    await deleteSalonServiceImages(salonServiceId);
    const { rows: updatedImages } = await insertServiceImage(images);
    res.json({
      salonService: updatedService,
      images: updatedImages,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = validationError(err);
      const errObj = badData('message', errors);
      return next(errObj);
    } return next(err);
  }
};
