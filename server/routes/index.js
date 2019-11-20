const boom = require('@hapi/boom');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ body: 'test route' });
});

// catch 404 and forward to error handler
router.use((req, res, next) => {
  next(boom.notFound());
});

module.exports = router;
