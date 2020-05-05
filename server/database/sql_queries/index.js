const addPersonalData = require('./addPersonalData');
const { getUserByEmail, getUserById } = require('./getUser');
const {
  getSalon,
  addSalon,
  updateSalon,
} = require('./salon');

const {
  getSalonOpeningTimes,
  addSalonOpeningTimes,
  deleteOpeningTimes,
} = require('./salonOpeningTimes');

const {
  getSalonZones,
  addSalonZones,
  deleteZones,
} = require('./salonZones');

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
  updateSalon,
  deleteZones,
  deleteOpeningTimes,
};
