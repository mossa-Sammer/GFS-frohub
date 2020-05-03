const { badRequest } = require('@hapi/boom');

const {
  checkService,
  insertService,
} = require('../../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (name) {
      const serviceExist = await checkService(name);
      if (serviceExist.rows.length) {
        next(badRequest('Service name already exist'));
      } else {
        const insertedService = await insertService(name);
        res.json({ ...insertedService.rows[0] });
      }
    } else {
      next(badRequest('Service name required'));
    }
  } catch (err) {
    next(err);
  }
};
