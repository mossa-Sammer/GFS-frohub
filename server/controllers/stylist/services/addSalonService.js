const { notFound, badRequest } = require('@hapi/boom');
const {
  checkSalon,
  checkService,
  checkServiceLength,
  addServiceLength,
  addSalonService,
} = require('../../../database/queries');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const salonService = {};
  try {
    const { rows: [salonExist] } = await checkSalon(id);
    if (!salonExist) next(notFound('Salon not exist'));
    else {
      salonService.salon_id = Number(id);
      salonService.user_id = salonExist.user_id;
      const {
        service,
        length,
        price,
        images,
      } = req.body;
      if (!service || !length || !price || !images.length) next(badRequest('All fields required'));
      else {
        const { rows: [serviceNameExist] } = await checkService(service);
        if (!serviceNameExist) next(notFound('Service name not found'));
        else {
          salonService.service_id = serviceNameExist.service_id;
          const { rows: [isServiceLength] } = await checkServiceLength(length);
          if (!isServiceLength) {
            const { rows: [insertedLength] } = await addServiceLength(length);
            salonService.service_length_id = insertedLength.service_length_id;
          } else {
            salonService.service_length_id = isServiceLength.service_length_id;
          }
          salonService.price = price;
          const { rows: [newSalonService] } = await addSalonService(salonService);
          res.json({ ...newSalonService });
        }
      }
    }
  } catch (err) {
    next(err);
  }
};
