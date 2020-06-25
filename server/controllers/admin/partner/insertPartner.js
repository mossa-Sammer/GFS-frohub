const { badData } = require('@hapi/boom');

const hashPassword = require('../../signup/utils/hashPassword');
const validateUser = require('./utils/validation');

const { getUserByEmail } = require('../../../database/sql_queries/getUser');
const { insertPartner } = require('../../../database/queries');

module.exports = async (req, res, next) => {
  const {
    email, password, firstName, lastName,
  } = req.body;
  try {
    const isValid = await validateUser.validate({
      email, password, firstName, lastName,
    }, { abortEarly: false });
    if (isValid) {
      const { rows: emailExist } = await getUserByEmail(email);
      // console.log(33333333, emailExist);
      if (emailExist.length) return next(badData('Email is Already Exist'));
      const hashedPass = await hashPassword(password);
      const { rows: [user] } = await insertPartner({
        email, hashedPass, firstName, lastName,
      });
      console.log(99999, user);
      res.json(user);
    }
  } catch (err) {
    console.log(1111111111, err);
    if (err.name === 'ValidationError') {
      // const errors = validationError(err);
      // const errObj = boom.badData('message', errors);
      // next(errObj);
    }
    next(err);
  }
};
