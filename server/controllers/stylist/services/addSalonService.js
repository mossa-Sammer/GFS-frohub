const { notFound, badData } = require('@hapi/boom');

const {
  checkSalon,
  checkService,
  checkServiceLength,
  addServiceLength,
  addSalonService,
  insertServiceImage,
} = require('../../../database/queries');

const { validateSalonService } = require('./validation/validateAddSalonService');

const { validationError } = require('../../helper');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  const { id } = req.params;
  const salonService = {};

  try {
    const { rows: [salonExist] } = await checkSalon(id);
    if (!salonExist) next(notFound('Salon not exist'));

    salonService.salon_id = Number(id);
    salonService.user_id = salonExist.user_id;

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

    const { rows: [isServiceLength] } = await checkServiceLength(length);

    if (!isServiceLength) {
      const { rows: [insertedLength] } = await addServiceLength(length);
      salonService.service_length_id = insertedLength.service_length_id;
    } else {
      salonService.service_length_id = isServiceLength.service_length_id;
    }

    salonService.price = price;

    const { rows: [newSalonService] } = await addSalonService(salonService);
    const { salon_service_id: salonServiceId } = newSalonService;

    const { rows: insertedImages } = await insertServiceImage(images, salonServiceId);

    res.json({
      salonService: newSalonService,
      serviceImages: insertedImages,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = validationError(err);
      const errObj = badData('message', errors);
      return next(errObj);
    } return next(err);
  }
};
