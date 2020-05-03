const yup = require('yup');

const time24Regx = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const openingTimesSchema = yup.array().of(yup.object().shape({
  day: yup.number().lessThan(7).moreThan(-1),
  fromTime: yup
    .string()
    .required()
    .test('is 24 hour format', 'time should be in 24 hour format',
      (v) => time24Regx.test(v)),
  toTime: yup
    .string()
    .required()
    .test('is 24 hour format', 'time should be in 24 hour format',
      (v) => time24Regx.test(v)),
}));

module.exports = openingTimesSchema;
