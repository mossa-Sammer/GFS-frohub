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
  getAllServicesLengthes: getServicesLengthesByAdmin,
  insertService: insertServiceByAdmin,
  insertServiceLength: insertServiceLengthByAdmin,
  updateService: updateServiceByAdmin,
  deleteService: deleteServiceByAdmin,
  updateServiceLength: updateServiceLengthByAdmin,
  deleteServiceLength: deleteServiceLengthByAdmin,
  getAllPartners,
  getPartnerServices,
  getPartnerSalon,
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
  getServicesLengthesByAdmin,
  insertServiceByAdmin,
  insertServiceLengthByAdmin,
  updateServiceByAdmin,
  deleteServiceByAdmin,
  updateServiceLengthByAdmin,
  deleteServiceLengthByAdmin,
  getAllPartners,
  getPartnerServices,
  getPartnerSalon,
};
