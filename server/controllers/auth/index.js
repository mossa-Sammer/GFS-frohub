const boom = require('@hapi/boom');
const { verify } = require('jsonwebtoken');
const { secret } = require('../../config/config');

const auth = (req, res, next) => {
  const { jwt } = req.cookies;
  if (jwt && secret) {
    verify(jwt, secret, (err, decoded) => {
      if (decoded) {
        req.user = decoded;
        next();
      } else {
        res.clearCookie('jwt');
        next(boom.unauthorized('Un authorized'));
      }
    });
  } else next(boom.unauthorized('Un authorized'));
};


const verfiyAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role === 'admin') next();
  else next(boom.unauthorized('un authorized'));
};


module.exports = { auth, verfiyAdmin };
