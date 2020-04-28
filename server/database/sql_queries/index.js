const { getUserByEmail, getUserById } = require('./getUser');
const { getSalon } = require('./salon');
const { getSalonOpeningTimes } = require('./salonOpeningTimes');
const { getSalonZones } = require('./salonZones');

module.exports = {
  getUserByEmail,
  getUserById,
  getSalon,
  getSalonOpeningTimes,
  getSalonZones,
};
