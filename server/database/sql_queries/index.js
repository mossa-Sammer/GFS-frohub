const { getUserByEmail, getUserById } = require('./getUser');
const addPersonalData = require('./addPersonalData');
const { getSalon } = require('./salon');
const { getSalonOpeningTimes } = require('./salonOpeningTimes');
const { getSalonZones } = require('./salonZones');

const { addSalon } = require('./salon');
const { addSalonOpeningTimes } = require('./salonOpeningTimes');
const { addSalonZones } = require('./salonZones');

module.exports = {
  getUserByEmail,
  getUserById,
  addPersonalData,
  getSalon,
  getSalonOpeningTimes,
  getSalonZones,
  addSalon,
  addSalonOpeningTimes,
  addSalonZones,
};
