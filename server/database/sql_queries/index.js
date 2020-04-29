const { getUserByEmail, getUserById } = require('./getUser');
const addPersonalData = require('./addPersonalData');

const { addSalon } = require('./salon');
const { addSalonOpeningTimes } = require('./salonOpeningTimes');
const { addSalonZones } = require('./salonZones');

module.exports = {
  getUserByEmail, getUserById, addPersonalData, addSalon, addSalonOpeningTimes, addSalonZones,
};
