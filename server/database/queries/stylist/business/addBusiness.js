const dbConnection = require('../../../config/dbConnection');

module.exports = (id, business) => {
  const {
    accountNumber, sortCode, preferredPayMethod,
  } = business;
  return dbConnection.query('INSERT INTO business ( user_id, account_number,  sort_code, preferred_pay_method ) VALUES ($1, $2, $3, $4) RETURNING *', [id, accountNumber, sortCode, preferredPayMethod]);
};
