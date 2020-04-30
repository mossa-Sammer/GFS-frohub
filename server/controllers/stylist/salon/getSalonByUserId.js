const boom = require('@hapi/boom');

const {
  getSalon,
  getSalonZones,
  getSalonOpeningTimes,
} = require('../../../database/sql_queries');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  try {
    let { id: userId } = req.params;
    userId = Number(userId);

    if (typeof userId !== 'number') {
      throw boom.badData('user id should be number');
    }

    const { rows: [salon] } = await getSalon(userId);
    const { salon_id: salonId } = salon;

    const [
      { rows: zones },
      { rows: openingTimes },
    ] = await Promise.all([
      getSalonZones(salonId),
      getSalonOpeningTimes(salonId),
    ]);


    if (salon) return res.json({ salon, zones, openingTimes });

    throw boom.notFound('salon not found');
  } catch (e) {
    next(e);
  }
};
