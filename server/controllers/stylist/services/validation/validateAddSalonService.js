const yup = require('yup');

const validateSalonService = yup.object().shape({
  service: yup.string().required(),
  length: yup.string().required(),
  price: yup.number().required().positive(),
  images: yup.array().of(yup.string()),
});

module.exports = { validateSalonService };
