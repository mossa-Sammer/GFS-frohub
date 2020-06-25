const connection = require('../config/dbConnection');

exports.getUserById = (id) => connection.query('SELECT user_id, role, phone_number, first_name, last_name, email, calling_code, country FROM "user" WHERE user_id=$1', [id]);

exports.getUserByEmail = (email) => connection.query('SELECT * FROM "user" WHERE email=$1', [email]);
