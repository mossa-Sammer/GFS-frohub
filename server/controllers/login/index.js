const boom = require('@hapi/boom');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcrypt');

const { getUserByEmailOrUsername } = require('../../database/queries/users');
const { secret } = require('../../config/config');

module.exports = async (req, res, next) => {
  const { username, password, remember } = req.body;

  try {
    const user = await getUserByEmailOrUsername(username);

    if (!user) {
      return next(boom.unauthorized('Login failed. User does not exist'));
    }

    const {
      _id: userId, username: storedUsername, email, password: signedPassword,
    } = user;

    const isMatch = await compare(password, signedPassword);

    if (!isMatch) {
      return next(boom.unauthorized('Login failed. password cannot be recognised'));
    }

    const token = sign({ userId }, secret, { expiresIn: 6 * 30 * 24 * 60 * 60 * 1000 });

    const cookieOptions = { httpOnly: true };

    if (remember) {
      cookieOptions.maxAge = 6 * 30 * 24 * 60 * 60 * 1000;
    }

    res.cookie('jwt', token, cookieOptions);

    const data = {
      userId,
      username: storedUsername,
      email,
    };

    return res.json({ data });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
