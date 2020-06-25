const { badData } = require('@hapi/boom');

const hashPassword = require('../../signup/utils/hashPassword');
const validateUser = require('./utils/validation');

const { validationError } = require('../../helper');

const { getUserByEmail } = require('../../../database/sql_queries/getUser');
const { insertPartner } = require('../../../database/queries');

module.exports = async (req, res, next) => {
  const {
    email, password, firstName, lastName, role,
  } = req.body;
  try {
    const isValid = await validateUser.validate({
      email, password, firstName, lastName, role,
    }, { abortEarly: false });
    if (isValid) {
      const { rows: emailExist } = await getUserByEmail(email);
      if (emailExist.length) return next(badData('Email is Already Exist'));
      const hashedPass = await hashPassword(password);
      await insertPartner({
        email, hashedPass, firstName, lastName, role,
      });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = validationError(err);
      const errObj = badData('message', errors);
      next(errObj);
    }
    next(err);
  }
};
