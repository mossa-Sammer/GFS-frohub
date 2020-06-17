const { notImplemented } = require('@hapi/boom');

module.exports = async (req, res, next) => next(notImplemented());
