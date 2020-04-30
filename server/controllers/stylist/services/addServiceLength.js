const { badRequest } = require('@hapi/boom');

const {
  checkServiceLength,
  addServiceLength,
} = require('../../../database/queries');

module.exports = async (req, res, next) => {
  const { name } = req.body;
  try {
    if (name) {
      const lengthNameExist = await checkServiceLength(name);
      if (!lengthNameExist.rows[0]) {
        const serviceLength = await addServiceLength(name);
        res.json({ ...serviceLength.rows[0] });
      } else {
        next(badRequest('Service length name already exist'));
      }
    } else {
      next(badRequest('Service length name is required'));
    }
  } catch (err) {
    next(err);
  }
};
