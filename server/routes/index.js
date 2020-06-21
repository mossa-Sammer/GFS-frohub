const boom = require('@hapi/boom');
const express = require('express');

const {
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
  partnerByAdmin,
  lengthesByAdmin,
  servicesByAdmin,
} = require('../controllers');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);
router.get('/treatments', getTreatments);
router.get('/authenticated', auth);

router.post('/upload/:id', uploads.uploadFiles);

router.get('/country.io/phone.json', countriesPhones);

// Stylist/Personal
router.get('/user/:id/personal', personal.getUser);
router.post('/user/:id/personal', personal.addUserData);
router.patch('/user/personal', personal.updateUser);

// Stylist/business
router.get('/stylist/:id/business', business.getStylistBusiness);
router.post('/stylist/:id/business', business.addStylistBusiness);
router.patch('/stylist/:id/business', business.updateStylistBusiness);

// Stylist/finance
router.get('/stylist/:id/finance', finance.getFinance);
router.post('/stylist/finance', finance.addFinance);

// Salon
router.get('/salons', salon.getAllSalons);
router.get('/salon/:id', salon.getSalonByUserId);
router.post('/salon/:id', salon.addSalon);
router.patch('/salon/:id', salon.updateSalon);

// Salon services
router.get('/salon/:id/services', services.getSalonServices);
router.post('/salon/:id/service', services.addSalonService);
router.patch('/salon/:salonId/service/:serviceId', services.updateSalonService);
router.delete('/salon/:id/service/:id', services.deleteSalonService);

// Service
router.post('/service', services.addService);
router.post('/service/length', services.addServiceLength);
router.get('/services', services.getAllServices);
router.get('/service/:id', services.getService);
router.get('/services/lengthes', services.getServicesLengthes);
router.get('/service/:id/length/', services.getServiceLength);
router.post('/service', services.addService);
router.patch('/service/:id', services.updateService);
router.delete('/service', services.deleteService);
router.get('/service/:id/images', services.getServiceImages);

// admin

// services and lengthes
router.get('/admin/services', servicesByAdmin.getServices);
router.get('/admin/services/lengthes', lengthesByAdmin.getAllServicesLengthes);
router.post('/admin/services', servicesByAdmin.insertService);
router.post('/admin/services/lengthes', lengthesByAdmin.insertServiceLength);
router.put('/admin/services/:id', servicesByAdmin.updateService);
router.put('/admin/services/lengthes/:id', lengthesByAdmin.updateServiceLength);
router.delete('/admin/services/:id', servicesByAdmin.deleteService);
router.delete('/admin/services/lengthes/:id', lengthesByAdmin.deleteServiceLength);

// stylist: personal, business, salon, services
router.get('/admin/users', partnerByAdmin.getAllPartners);
router.get('/admin/users/:id/business', partnerByAdmin.getPartnerBusiness);
router.get('/admin/users/:id/services', partnerByAdmin.getPartnerServices);
router.get('/admin/users/:id/salon', partnerByAdmin.getPartnerSalon);


// catch 404 and forward to error handler
router.use((req, res, next) => {
  next(boom.notFound());
});

module.exports = router;
