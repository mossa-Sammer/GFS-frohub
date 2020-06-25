const yup = require('yup');

const insertUserSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  firstName: yup.string().required().min(3),
  lastName: yup.string().required().min(3),
  role: yup.string().required(),
});

module.exports = insertUserSchema;
