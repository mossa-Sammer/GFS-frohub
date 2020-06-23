const login = require('./login');
const signup = require('./signup');
const { auth, verfiyAdmin } = require('./auth');
const getTreatments = require('./treatments');
const personal = require('./personal');
const {
  business, finance, salon, services,
} = require('./stylist');
const uploads = require('./uploads');

const countriesPhones = require('./countriesPhone');

const {
  servicesByAdmin,
  lengthesByAdmin,
  partnerByAdmin,
} = require('./admin');

module.exports = {
  login,
  signup,
  auth,
  verfiyAdmin,
  getTreatments,
  personal,
  business,
  finance,
  salon,
  services,
  uploads,
  countriesPhones,
  servicesByAdmin,
  lengthesByAdmin,
  partnerByAdmin,
};
