const yup = require('yup');

const addSalonSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  about: yup.string().min(10).required(),
  profileImage: yup.string().required(),
  coverImage: yup.string().required(),
  document: yup.string().default(null),
  type: yup.string().oneOf(['home', 'salon', 'mobile']).required(),
  street: yup.string().required(),
  city: yup.string().required(),
  countryCode: yup.string().required(),
  postalCode: yup.string().required(),
});

module.exports = addSalonSchema;
