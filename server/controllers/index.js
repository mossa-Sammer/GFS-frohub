const login = require('./login');
const signup = require('./signup');
const auth = require('./auth');
const getTreatments = require('./treatments');
const personal = require('./personal');
const {
  business, finance, salon, services,
} = require('./stylist');
const uploads = require('./uploads');

const countriesPhones = require('./countriesPhone');


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
  uploads,
  countriesPhones,
};
