const { unauthorized } = require('@hapi/boom');
const UkModulusChecking = require('uk-modulus-checking');
const {
  insertStylistBusiness,
  checkStylist,
} = require('../../../database/queries');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const {
    accountNumber,
    sortCode,
    preferredPayMethod,
  } = req.body;
  const isStylist = await checkStylist(id);
  const accountSortValid = new UkModulusChecking({ accountNumber, sortCode }).isValid();
  if (accountSortValid) {
    if (isStylist.rows.length) {
      insertStylistBusiness(id, {
        accountNumber, sortCode, preferredPayMethod,
      }).then((business) => {
        if (business.rows[0]) {
          res.json({ ...business.rows[0] });
        }
      }).catch((err) => {
        if (err.code === '23505') {
          next(unauthorized('Account number already exist'));
        } else {
          next();
        }
      });
    } else {
      next(unauthorized('Unauthorized'));
    }
  } else {
    next(unauthorized('Account Number or Sort Code invalid'));
  }
};
