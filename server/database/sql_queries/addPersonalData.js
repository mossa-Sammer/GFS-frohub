const dbConnection = require('../config/dbConnection');


const addPersonalData = ({
  userId, firstName, lastName, email, phone,
}) => {
  const sql = {
    text: 'UPDATE "user" SET first_name=$1, last_name=$2, email=$3, phone_number=$4 WHERE user_id=$5 RETURNING *',
    values: [firstName, lastName, email, phone, userId],
  };
  return dbConnection.query(sql);
};

module.exports = addPersonalData;
