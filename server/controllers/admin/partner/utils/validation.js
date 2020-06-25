const yup = require('yup');

// const insertUserSchema = yup.object().shape({
//   email: yup.string().required().email(),
//   password: yup.string().required().min(6),
// });

const insertUserSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

module.exports = insertUserSchema;
