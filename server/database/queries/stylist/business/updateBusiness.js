const dbConnection = require('../../../config/dbConnection');

module.exports = (id, business) => {
  const {
    fullName, accountNumber, sortCode, preferredPayMethod,
  } = business;
  const updateBusiness = 'UPDATE business SET full_name=$1, account_number=$2, sort_code=$3, preferred_pay_method=$4 WHERE user_id=$5 RETURNING *';
  return dbConnection.query(updateBusiness, [
    fullName,
    accountNumber,
    sortCode,
    preferredPayMethod,
    id,
  ]);
};
