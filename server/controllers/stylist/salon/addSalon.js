const boom = require('@hapi/boom');
const { validationError } = require('../../helper');

const {
  addSalon,
  addSalonOpeningTimes,
  addSalonZones,
} = require('../../../database/sql_queries');

const {
  addSalonSchema, openingTimesSchema, salonZonesSchema,
} = require('./validation');

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  // const { userId } = req.params;
  const { salon, openingTimes, zones } = req.body;

  try {
    await Promise.all([
      addSalonSchema.validate(salon, { abortEarly: false }),
      openingTimesSchema.validate(openingTimes, { abortEarly: false }),
      salonZonesSchema.validate(zones, { abortEarly: false }),
    ]);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = validationError(err);
      const errObj = boom.badData('message', errors);
      return next(errObj);
    } return next(err);
  }

  try {
    const { rows: [addedSalon] } = await addSalon(salon);
    const [{ rows: addedTimes }, { rows: addedZones }] = await Promise.all([
      addSalonOpeningTimes(openingTimes),
      addSalonZones(zones),
    ]);
    return res.json({
      msg: 'added salon data successfully',
      data: {
        salon: addedSalon,
        times: addedTimes,
        zones: addedZones,
      },
    });
  } catch (e) {
    next(e);
  }
};
