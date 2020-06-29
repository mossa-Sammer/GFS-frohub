const boom = require('@hapi/boom');

const { validationError } = require('../../helper');
const { serviceLength: serviceLengthValidation } = require('./validation');
const { updateServiceLengthByAdmin } = require('../../../database/queries');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { name, status } = req.body;

  try {
    const validatedData = await serviceLengthValidation.validate({ name, status });
    const {
      rows: [serviceLength],
    } = await updateServiceLengthByAdmin({ id, ...validatedData });
    res.json({ msg: 'service length updated successfully', data: serviceLength });
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errors = validationError(e);
      const errObj = boom.badData('message', errors);
      next(errObj);
    }
    next(e);
  }
};
