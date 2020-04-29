const boom = require('@hapi/boom');
const { validationError } = require('../helper');
const { addUserDataSchema } = require('./validation');
const { addPersonalData, getUserById } = require('../../database/sql_queries');

module.exports = (req, res, next) => {
  let { id } = req.params;
  id = Number(id);
  if (!id) {
    throw boom.badData('user id should be number');
  }
  addUserDataSchema.validate(req.body, { abortEarly: false })
    .then(() => getUserById(id))
    .then((result) => {
      const {
        rows: [user],
      } = result;

      if (!user) throw boom.badData('user not found');
      return addPersonalData({ ...req.body, userId: id });
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
