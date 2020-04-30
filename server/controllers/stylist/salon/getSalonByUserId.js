const boom = require('@hapi/boom');

const {
  getSalon,
  getSalonZones,
  getSalonOpeningTimes,
} = require('../../../database/sql_queries');
const { checkStylist } = require('../../../database/queries');
// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  try {
    let { id: userId } = req.params;
    userId = Number(userId);

    if (typeof userId !== 'number') {
      throw boom.badData('user id should be number');
    }

    const { rows: [stylist] } = await checkStylist(userId);

    if (!stylist) {
      throw boom.badData('stylist not found');
    }

    const { rows: [salon] } = await getSalon(userId);

    if (!salon) {
      throw boom.notFound('salon not found');
    }

    const { salon_id: salonId } = salon;


    const [
      { rows: zones },
      { rows: openingTimes },
    ] = await Promise.all([
      getSalonZones(salonId),
      getSalonOpeningTimes(salonId),
    ]);

    return res.json({ salon, zones, openingTimes });
  } catch (e) {
    next(e);
  }
};
