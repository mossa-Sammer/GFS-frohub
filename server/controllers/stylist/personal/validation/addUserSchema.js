const yup = require('yup');

const addUserSchema = yup.object().shape({
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(6).required(),
  role: yup.string().min(2).required(),
});


module.exports = addUserSchema;
