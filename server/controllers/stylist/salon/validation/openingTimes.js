const yup = require('yup');
const moment = require('moment');


const openingTimesSchema = yup.array().of(yup.object().shape({
  day: yup.number().lessThan(7).moreThan(-1),
  fromTime: yup
    .string()
    .required()
    .test('is 24 hour format', 'time should be in 24 hour format',
      (v) => moment(v, 'HH:mm:ss').isValid()),
  toTime: yup
    .string()
    .required()
    .test('is 24 hour format', 'time should be in 24 hour format',
      (v) => moment(v, 'HH:mm:ss').isValid()),
}));

module.exports = openingTimesSchema;
