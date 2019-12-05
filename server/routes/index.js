const boom = require('@hapi/boom');
const express = require('express');

const {
  login, signup, auth, getTreatments,
} = require('../controllers');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);
router.get('/treatments', getTreatments);
router.get('/authenticated', auth);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  next(boom.notFound());
});

module.exports = router;
