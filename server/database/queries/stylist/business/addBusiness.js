const dbConnection = require('../../../config/dbConnection');

module.exports = (id, business) => {
  const {
    fullName, accountNumber, sortCode, preffaredPayMethod,
  } = business;
  return dbConnection.query('INSERT INTO business ( user_id, full_name, account_number,  sort_code, preferred_pay_method ) VALUES ($1, $2, $3, $4, $5) RETURNING *', [id, fullName, accountNumber, sortCode, preffaredPayMethod]);
};
