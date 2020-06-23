const boom = require('@hapi/boom');
const { validationError } = require('../../helper');
const { addSalonService: addSalonServiceValidation } = require('./validation');

const { insertServiceByAdmin } = require('../../../database/queries');


module.exports = async (req, res, next) => {
  try {
    const { name, status } = req.body;
    const validatedService = await addSalonServiceValidation.validate({ name, status });
    const {
      rows: [addedService],
    } = await insertServiceByAdmin(validatedService.name, validatedService.status);
    res.json({ msg: 'service added successfully', data: addedService });
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errors = validationError(e);
      const errObj = boom.badData('message', errors);
      next(errObj);
    }
    next(e);
  }
};
