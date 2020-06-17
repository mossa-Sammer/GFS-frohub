const checkAdmin = require('./checkAdmin');

const {
  getAllServices,
  insertService,
  updateService,
} = require('./services');

const {
  getAllServicesLengthes,
  insertServiceLength,
  updateServiceLength,
  deleteServiceLength,
} = require('./servicesLengthes');

const {
  getAllPartners,
  getPartnerBusiness,
  getPartnerServices,
  getPartnerSalon,
} = require('./partner');

module.exports = {
  checkAdmin,
  getAllServices,
  insertService,
  updateService,
  getAllServicesLengthes,
  insertServiceLength,
  updateServiceLength,
  deleteServiceLength,
  getAllPartners,
  getPartnerBusiness,
  getPartnerServices,
  getPartnerSalon,
};
