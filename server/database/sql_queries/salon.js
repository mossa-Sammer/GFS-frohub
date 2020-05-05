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


const updateSalon = ({
  salonId, name, about, profileImage, coverImage, document, type,
  street, city, countryCode, postalCode,
}) => {
  const sql = {
    text: `
    UPDATE salon SET name=$1,about=$2,profile_image=$3,cover_image=$4, document=$5,type=$6,street=$7,city=$8,country=$9,postal_code=$10 WHERE salon_id=$11 RETURNING *
    `,
    values: [name, about, profileImage, coverImage, document, type,
      street, city, countryCode, postalCode, salonId],
  };
  return connection.query(sql);
};


module.exports = { getSalon, addSalon, updateSalon };
