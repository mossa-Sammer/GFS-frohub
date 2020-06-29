const yup = require('yup');

module.exports = yup.object().shape({
  name: yup.string().min(2).required(),
  status: yup.mixed().oneOf(['active', 'inactive']).default('inactive'),
});
