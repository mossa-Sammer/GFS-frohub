const {
  insertStylistBusiness,
  getStylistBusiness,
  updateStylistBusiness,
} = require('./business');

const checkStylist = require('./checkStylist');

const {
  getFinance,
} = require('./finance');

module.exports = {
  checkStylist,
  insertStylistBusiness,
  getStylistBusiness,
  updateStylistBusiness,
  getFinance,
};
