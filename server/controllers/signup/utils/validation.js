const yup = require('yup');

const signupSchema = yup.object().shape({
  username: yup.string().required().min(6),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

module.exports = signupSchema;
