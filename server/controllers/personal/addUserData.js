const boom = require('@hapi/boom');
const { addUserDataSchema, validationError } = require('./validation');
const { addPersonalData, getUserById } = require('../../database/sql_queries');

module.exports = (req, res, next) => {
  const { userId } = req.body;
  addUserDataSchema.validate(req.body, { abortEarly: false })
    .then(() => getUserById(userId))
    .then((result) => {
      const {
        rows: [user],
      } = result;

      if (!user) throw boom.badData('user not found');
      return addPersonalData(req.body);
    })
    .then((result) => {
      const {
        rows: [user],
      } = result;
      return res.json({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errors = validationError(err);
        const errObj = boom.badData('message', errors);
        return next(errObj);
      } return next(err);
    });
};
