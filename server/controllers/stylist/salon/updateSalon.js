const boom = require('@hapi/boom');

const { validationError } = require('../../helper');

const {
  addSalonSchema,
  openingTimesSchema,
  salonZonesSchema,
} = require('./validation');

const {
  updateSalon,
  addSalonOpeningTimes,
  deleteOpeningTimes,
  addSalonZones,
  deleteZones,
} = require('../../../database/sql_queries');

module.exports = async (req, res, next) => {
  const { id: salonId } = req.params;
  const {
    salon, zones, openingTimes,
  } = req.body;

  salon.salonId = salonId;

  try {
    await Promise.all([
      addSalonSchema.validate(salon, { abortEarly: false }),
      openingTimesSchema.validate(openingTimes),
      salonZonesSchema.validate(zones),
    ]);

    const [{ rows: [updatedSalon] }] = await Promise.all([
      updateSalon(salon),
      deleteZones(salonId),
      deleteOpeningTimes(salonId),
    ]);

    let updatedZones;
    let updatedOpeningTimes;

    if (zones && zones.length !== 0) {
      const { rows } = await addSalonZones(zones, salonId);
      updatedZones = rows;
    }
    if (openingTimes && openingTimes.length !== 0) {
      const { rows } = await addSalonOpeningTimes(openingTimes, salonId);
      updatedOpeningTimes = rows;
    }

    res.json({
      salon: updatedSalon,
      zones: updatedZones,
      openingTimes: updatedOpeningTimes,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = validationError(err);
      const errObj = boom.badData('message', errors);
      next(errObj);
    }
    next(err);
  }
};
