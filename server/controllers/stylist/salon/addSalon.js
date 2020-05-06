const boom = require('@hapi/boom');
const { validationError } = require('../../helper');

const {
  addSalon,
  addSalonOpeningTimes,
  addSalonZones,
} = require('../../../database/sql_queries');

const {
  addSalonSchema,
  openingTimesSchema,
  salonZonesSchema,
} = require('./validation');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  const { salon, openingTimes, zones } = req.body;

  try {
    await Promise.all([
      addSalonSchema.validate(salon, { abortEarly: false }),
      openingTimesSchema.validate(openingTimes, { abortEarly: false }),
      salonZonesSchema.validate(zones, { abortEarly: false }),
    ]);

    const { rows: [addedSalon] } = await addSalon(salon);
    const { salon_id: salonId } = addedSalon;

    const [{ rows: addedTimes }, { rows: addedZones }] = await Promise.all([
      addSalonOpeningTimes(openingTimes, salonId),
      addSalonZones(zones, salonId),
    ]);


    return res.json({
      msg: 'added salon data successfully',
      data: {
        salon: addedSalon,
        times: addedTimes,
        zones: addedZones,
      },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = validationError(err);
      const errObj = boom.badData('message', errors);
      return next(errObj);
    } return next(err);
  }
};
