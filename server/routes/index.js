const boom = require('@hapi/boom');
const express = require('express');

const {
  login, signup, auth, getTreatments, personal, business, finance, salon, services,
} = require('../controllers');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);
router.get('/treatments', getTreatments);
router.get('/authenticated', auth);

// Stylist/Personal

router.get('/stylist/:id', personal.getStylist);
router.post('/stylist/personal', personal.addStylist);
router.patch('/stylist/personal', personal.updateStylist);

// Stylist/business
router.get('/stylist/business', business.getStylistBusiness);
router.post('/stylist/business', business.addStylistBusiness);
router.patch('/stylist/business', business.updateStylistBusiness);

// Stylist/finance
router.get('/stylist/finance', finance.getFinance);
router.post('/stylist/finance', finance.addFinance);

// Salon
router.get('/salons', salon.getAllSalons);
router.get('/salon/:id', salon.getSalon);
router.post('/salon', salon.addSalon);
router.patch('/salon/:id', salon.updateSalon);

// Salon services
router.get('/salon/:id/services', services.getSalonServices);
router.post('/salon/:id/service', services.addSalonService);
router.patch('/salon/:id/service/:id', services.updateSalonService);
router.delete('/salon/:id/service/:id', services.deleteSalonService);

// Service
router.get('/services', services.getAllServices);
router.get('/service/:id', services.getService);
router.get('/service/lengthes', services.getServicesLengthes);
router.post('/service', services.addService);
router.patch('/service/:id', services.updateService);
router.delete('/service', services.deleteService);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  next(boom.notFound());
});

module.exports = router;
