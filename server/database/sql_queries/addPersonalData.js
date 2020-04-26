const dbConnection = require('../config/dbConnection');


const addPersonalData = ({
  firstName, lastName, email, phone, role = 'stylist',
}) => {
  const sql = {
    text: 'INSERT INTO "user" (first_name,last_name,email,phone_number,role) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    values: [firstName, lastName, email, phone, role],
  };
  return dbConnection.query(sql);
};

module.exports = addPersonalData;
