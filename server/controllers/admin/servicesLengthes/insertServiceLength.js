const boom = require('@hapi/boom');

const { validationError } = require('../../helper');
const { serviceLength: serviceLengthSchema } = require('./validation');
const { insertServiceLengthByAdmin } = require('../../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const { name, status } = req.body;
    const valdiatedData = await serviceLengthSchema.validate({ name, status });
    const { name: validatedName, status: validatedStatus } = valdiatedData;

    const {
      rows: [serviceLength],
    } = await insertServiceLengthByAdmin(validatedName, validatedStatus);

    res.json({ msg: 'service length added successfully', data: serviceLength });
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errors = validationError(e);
      const errObj = boom.badData('message', errors);
      next(errObj);
    }
    next(e);
  }
};
