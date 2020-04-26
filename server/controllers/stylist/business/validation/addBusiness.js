const yup = require('yup');

const validateAddBusiness = yup.object().shape({
  fullName: yup.string().required(),
  accountNum: yup.string().min(3).max(12),
  sortCode: yup.string().min(3).max(12),
});

module.exports = { validateAddBusiness };
