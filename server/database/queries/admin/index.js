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
} = require('./servicesLengthes');

module.exports = {
  checkAdmin,
  getAllServices,
  insertService,
  updateService,
  getAllServicesLengthes,
  insertServiceLength,
  updateServiceLength,
};
