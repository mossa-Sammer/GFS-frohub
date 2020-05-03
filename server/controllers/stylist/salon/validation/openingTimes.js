const yup = require('yup');

const openingTimesSchema = yup.array().of(yup.object().shape({
  day: yup.number().lessThan(7).moreThan(-1),
  fromTime: yup.string().required(),
  toTime: yup.string().required(),
}));

module.exports = openingTimesSchema;
