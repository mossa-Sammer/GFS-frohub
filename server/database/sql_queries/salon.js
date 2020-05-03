const connection = require('../config/dbConnection');


const getSalon = (userId) => {
  const sql = {
    text: 'SELECT * FROM salon WHERE user_id=$1',
    values: [userId],
  };
  return connection.query(sql);
};

const addSalon = ({
  userId,
  name,
  about,
  profileImage,
  coverImage,
  document,
  type,
  street,
  city,
  countryCode,
  postalCode,
}) => {
  const sql = {
    text: 'INSERT INTO salon (user_id, name, about, profile_image, cover_image, document, type, street, city, country, postal_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
    values: [
      userId,
      name,
      about,
      profileImage,
      coverImage,
      document,
      type,
      street,
      city,
      countryCode,
      postalCode,
    ],
  };

  return connection.query(sql);
};

module.exports = { getSalon, addSalon };
