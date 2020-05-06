const { unauthorized } = require('@hapi/boom');
const UkModulusChecking = require('uk-modulus-checking');

const { checkStylist, updateStylistBusiness } = require('../../../database/queries');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const {
    fullName,
    accountNumber,
    sortCode,
    preferredPayMethod,
  } = req.body;
  try {
    const stylist = await checkStylist(id);
    if (stylist.rows.length) {
      if (fullName.length >= 6) {
        const accountSortValid = new UkModulusChecking({ accountNumber, sortCode }).isValid();
        if (accountSortValid) {
          const business = await updateStylistBusiness(id, {
            fullName, accountNumber, sortCode, preferredPayMethod,
          });
          res.send({ data: business.rows });
        } else {
          next(unauthorized('Account Number or Sort Code invalid'));
        }
      }
    } else {
      next(unauthorized('Unauthorized'));
    }
  } catch (err) {
    next(err);
  }
};
