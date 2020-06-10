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

const {
  checkAdmin,
  getAllServices: getServicesByAdmin,
  getAllServicesLengthes,
  insertService: insertServiceByAdmin,
  insertServiceLength,
  updateService,
  updateServiceLength,
} = require('./admin');

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
  checkAdmin,
  getServicesByAdmin,
  getAllServicesLengthes,
  insertServiceByAdmin,
  insertServiceLength,
  updateService,
  updateServiceLength,
};
