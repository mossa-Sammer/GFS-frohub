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
  instgramHandle,
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
    text: 'INSERT INTO salon (user_id, name, about,instgram_handle, profile_image, cover_image, document, type, street, city, country, postal_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
    values: [
      userId,
      name,
      about,
      instgramHandle,
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
  salonId, name, about, instgramHandle, profileImage, coverImage, document, type,
  street, city, countryCode, postalCode,
}) => {
  const sql = {
    text: `
    UPDATE salon SET name=$1,about=$2,instgram_handle=$3,profile_image=$4,cover_image=$5, document=$6,type=$7,street=$8,city=$9,country=$10,postal_code=$11 WHERE salon_id=$12 RETURNING *
    `,
    values: [
      name,
      about,
      instgramHandle,
      profileImage,
      coverImage,
      document,
      type,
      street,
      city,
      countryCode,
      postalCode,
      salonId,
    ],
  };
  return connection.query(sql);
};


module.exports = {
  getSalon,
  addSalon,
  updateSalon,
};
