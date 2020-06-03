const dbConnection = require('../config/dbConnection');


const addPersonalData = ({
  userId, firstName, lastName, email, phoneNumber, callingCode, country,
}) => {
  const sql = {
    text: 'UPDATE "user" SET first_name=$1, last_name=$2, email=$3, phone_number=$4, country=$5, calling_code=$6 WHERE user_id=$7 RETURNING *',
    values: [firstName, lastName, email, phoneNumber, country, callingCode, userId],
  };
  return dbConnection.query(sql);
};

module.exports = addPersonalData;
