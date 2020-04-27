const { unauthorized } = require('@hapi/boom');
const UkModulusChecking = require('uk-modulus-checking');
const {
  insertStylistBusiness,
  checkStylist,
} = require('../../../database/queries');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const {
    fullName,
    accountNumber,
    sortCode,
    preffaredPayMethod,
  } = req.body;
  const isStylist = await checkStylist(id);
  if (fullName.length >= 6) {
    const ukAccountsValidation = new UkModulusChecking({ accountNumber, sortCode }).isValid();
    if (ukAccountsValidation) {
      if (isStylist.rows.length) {
        insertStylistBusiness(id, {
          fullName, accountNumber, sortCode, preffaredPayMethod,
        }).then((business) => {
          if (business.rows.length) {
            res.json({ ...business.rows[0] });
          }
        }).catch((err) => next(err));
      } else {
        next(unauthorized('Unauthorized'));
      }
    } else {
      next(unauthorized('Account Number or Sort Code invalid'));
    }
  } else {
    next(unauthorized('FullName should be at least 6 characters'));
  }
};
