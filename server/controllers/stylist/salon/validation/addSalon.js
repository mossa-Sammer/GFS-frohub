const yup = require('yup');

const addSalonSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  about: yup.string().min(10).required(),
  instgramHandle: yup.string().min(3).required(),
  profileImage: yup.string().required(),
  coverImage: yup.string().required(),
  document: yup.array().of(yup.string()),
  type: yup.string().oneOf(['home', 'salon', 'mobile']).required(),
  street: yup.string().required(),
  city: yup.string().required(),
  countryCode: yup.string().length(2).required(),
  postalCode: yup.string().required(),
});

module.exports = addSalonSchema;
