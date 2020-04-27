const yup = require('yup');

const userDataSchema = yup.object().shape({
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(6).required(),
});


module.exports = userDataSchema;
