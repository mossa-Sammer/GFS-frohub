const boom = require('@hapi/boom');
const { addUserSchema, validationError } = require('./validation');
const { addPersonalData } = require('../../../database/sql_queries');

module.exports = (req, res, next) => {
  addUserSchema.validate(req.body, { abortEarly: false })
    .then(() => addPersonalData(req.body)).then((result) => {
      const {
        rows: [stylist],
      } = result;
      return res.json({ stylist });
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        const errors = validationError(err);
        const errObj = boom.badData('message', errors);
        return next(errObj);
      } return next(err);
    });
};
