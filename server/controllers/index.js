const login = require('./login');
const signup = require('./signup');
const auth = require('./auth');
const getTreatments = require('./treatments');
const {
  personal, business, finance, salon, services,
} = require('./stylist');

module.exports = {
  login,
  signup,
  auth,
  getTreatments,
  personal,
  business,
  finance,
  salon,
  services,
};
