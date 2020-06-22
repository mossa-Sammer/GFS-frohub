const boom = require('@hapi/boom');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcrypt');

const { getUserByEmail } = require('../../database/sql_queries');
const { secret } = require('../../config/config');

module.exports = async (req, res, next) => {
  const { email, password, remember } = req.body;

  try {
    const { rows: user } = await getUserByEmail(email);

    if (!user.length) {
      return next(boom.unauthorized('email does not exist'));
    }

    const {
      user_id: userId, password: signedPassword, email: addedEmail, role,
    } = user[0];

    const isMatch = await compare(password, signedPassword);

    if (!isMatch) {
      return next(boom.unauthorized('password cannot be recognised'));
    }

    const token = sign(
      { userId, email: addedEmail, role },
      secret, { expiresIn: 6 * 30 * 24 * 60 * 60 * 1000 },
    );

    const cookieOptions = { httpOnly: true };

    if (remember) {
      cookieOptions.maxAge = 6 * 30 * 24 * 60 * 60 * 1000;
    }

    res.cookie('jwt', token, cookieOptions);

    const data = {
      userId,
      email,
      role,
    };

    return res.json({ data });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
