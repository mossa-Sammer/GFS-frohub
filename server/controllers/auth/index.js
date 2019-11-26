const boom = require('@hapi/boom');

const auth = (req, res, next) => {
  const isAuth = req.cookies;
  if (isAuth) {
    res.send();
  } else next(boom.unauthorized('Un authorized'));
};

module.exports = auth;
