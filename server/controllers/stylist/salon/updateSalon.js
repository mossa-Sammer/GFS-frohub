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

  try {
    await Promise.all([
      addSalonSchema.validate(salon, { abortEarly: false }),
      openingTimesSchema.validate(openingTimes),
      salonZonesSchema.validate(zones),
    ]);

    const [{ rows: [updatedSalon] }] = await Promise.all([
      updateSalon(salon),
      deleteZones(salon.salonId),
      deleteOpeningTimes(salon.salonId),
    ]);

    const [
      { rows: updatedZones },
      { rows: updatedOpeningTimes },
    ] = await Promise.all([
      addSalonZones(zones, salonId),
      addSalonOpeningTimes(openingTimes, salonId),
    ]);

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
    } next(err);
  }
};
