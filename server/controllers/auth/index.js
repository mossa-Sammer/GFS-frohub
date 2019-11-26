const boom = require('@hapi/boom');
const { verify } = require('jsonwebtoken');
const { secret } = require('../../config/config');

const auth = (req, res, next) => {
  const { jwt } = req.cookies;
  if (jwt && secret) {
    verify(jwt, secret, (err, decoded) => {
      if (decoded) {
        res.send();
      } else {
        res.clearCookie('jwt');
        next(boom.unauthorized('Un authorized'));
      }
    });
  } else next(boom.unauthorized('Un authorized'));
};

module.exports = auth;
