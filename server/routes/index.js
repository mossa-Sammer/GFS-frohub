const boom = require('@hapi/boom');
const express = require('express');

const signup = require('./signup');

const router = express.Router();

router.post('/signup', signup);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  next(boom.notFound());
});

module.exports = router;
