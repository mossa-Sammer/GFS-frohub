const boom = require('@hapi/boom');

const { validationError } = require('../../helper');
const { serviceValidation } = require('./validation');
const { updateServiceByAdmin } = require('../../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const validatedData = await serviceValidation.validate({ name, status });

    const {
      rows: [updatedService],
    } = await updateServiceByAdmin({ ...validatedData, id });
    res.json({ msg: 'service updated successfully', data: updatedService });
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errors = validationError(e);
      const errObj = boom.badData('message', errors);
      next(errObj);
    }
    next(e);
  }
};
