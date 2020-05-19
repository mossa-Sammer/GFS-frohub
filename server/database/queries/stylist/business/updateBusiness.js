const dbConnection = require('../../../config/dbConnection');

module.exports = (id, business) => {
  const {
    accountNumber, sortCode, preferredPayMethod,
  } = business;
  const updateBusiness = 'UPDATE business SET account_number=$1, sort_code=$2, preferred_pay_method=$3 WHERE user_id=$4 RETURNING *';
  return dbConnection.query(updateBusiness, [
    accountNumber,
    sortCode,
    preferredPayMethod,
    id,
  ]);
};
