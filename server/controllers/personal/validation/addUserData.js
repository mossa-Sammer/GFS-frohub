const yup = require('yup');

const userDataSchema = yup.object().shape({
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  email: yup.string().email().required(),
  callingCode: yup.string().required(),
  country: yup.string().max(2).required(),
  phoneNumber: yup.string().required(),
});


module.exports = userDataSchema;
