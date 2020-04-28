const boom = require('@hapi/boom');
const { getSalon } = require('../../../database/sql_queries');

module.exports = async (req, res, next) => {
  try {
    let { userId } = req.params;
    userId = Number(userId);

    if (typeof userId !== 'number') {
      throw boom.badData('user id should be number');
    }
    const { rows: [salon] } = await getSalon(userId);
    console.log(salon);
    if (salon) return res.json({ salon });

    throw boom.notFound('salon not found');
  } catch (e) {
    next(e);
  }
};
