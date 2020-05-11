const boom = require('@hapi/boom');
const { sign } = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const { compare } = require('bcrypt');

// const { getUserByEmailOrUsername } = require('../../database/queries/users');
const { getUserByEmail } = require('../../database/sql_queries');
const { secret } = require('../../config/config');

module.exports = async (req, res, next) => {
  const { email, password, remember } = req.body;

  try {
    const { rows: user } = await getUserByEmail(email);

    if (!user.length) {
      return next(boom.unauthorized('email does not exist'));
    }
    // console.log(11111111111, user);
    const {
      user_id: userId, password: signedPassword,
    } = user[0];

    // const hash = await bcrypt.hash('123456', 10);
    // console.log(hash);

    const isMatch = await compare(password, signedPassword);
    // console.log(111111111, isMatch);
    if (!isMatch) {
      return next(boom.unauthorized('password cannot be recognised'));
    }

    const token = sign({ userId }, secret, { expiresIn: 6 * 30 * 24 * 60 * 60 * 1000 });

    const cookieOptions = { httpOnly: true };

    if (remember) {
      cookieOptions.maxAge = 6 * 30 * 24 * 60 * 60 * 1000;
    }

    res.cookie('jwt', token, cookieOptions);

    const data = {
      userId,
      email,
    };

    return res.json({ data });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
