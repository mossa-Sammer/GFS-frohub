const boom = require('@hapi/boom');
const express = require('express');

const { login } = require('../controllers');

const router = express.Router();

router.post('/login', login);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  next(boom.notFound());
});

module.exports = router;
