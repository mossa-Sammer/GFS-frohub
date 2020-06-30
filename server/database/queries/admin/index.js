const checkAdmin = require('./checkAdmin');

const {
  getAllServices,
  insertService,
  updateService,
  deleteService,
} = require('./services');

const {
  getAllServicesLengthes,
  insertServiceLength,
  updateServiceLength,
  deleteServiceLength,
} = require('./servicesLengthes');

const {
  getAllPartners,
  getPartnerServices,
  getPartnerSalon,
} = require('./partner');

module.exports = {
  checkAdmin,
  getAllServices,
  insertService,
  updateService,
  deleteService,
  getAllServicesLengthes,
  insertServiceLength,
  updateServiceLength,
  deleteServiceLength,
  getAllPartners,
  getPartnerServices,
  getPartnerSalon,
};
