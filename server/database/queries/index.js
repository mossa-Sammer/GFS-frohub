const {
  insertStylistBusiness,
  updateStylistBusiness,
  checkStylist,
  getStylistBusiness,
  getFinance,
} = require('./stylist');

const {
  getServicesLengthes,
  checkServiceLength,
  addServiceLength,
  getService,
  checkService,
  insertService,
  getAllServices,
  insertServiceImage,
  checkSalonService,
  updateSalonService,
  deleteSalonServiceImages,
} = require('./services');

const {
  checkSalon,
  addSalonService,
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
  addSalonService,
  insertServiceImage,
  checkSalonService,
  updateSalonService,
  getFinance,
  deleteSalonServiceImages,
};
