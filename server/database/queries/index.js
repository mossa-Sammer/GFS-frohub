const {
  insertStylistBusiness,
  updateStylistBusiness,
  checkStylist,
  getStylistBusiness,
} = require('./stylist');

const {
  getServicesLengthes,
  checkServiceLength,
  addServiceLength,
  getService,
  checkService,
  insertService,
  getAllServices,
} = require('./services');

const {
  checkSalon,
} = require('./salon');

module.exports = {
  insertStylistBusiness,
  updateStylistBusiness,
  checkStylist,
  getStylistBusiness,
  getServicesLengthes,
  checkServiceLength,
  addServiceLength,
  getService,
  checkService,
  insertService,
  getAllServices,
  checkSalon,
};
