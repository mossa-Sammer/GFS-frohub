const yup = require('yup');

const openingTimesSchema = yup.object().shape({
  openingTimes: yup.array().of(yup.object().shape({
    salonId: yup.number().required(),
    day: yup.number().min(1).max(1).required(),
    fromTime: yup.string().required(),
    toTime: yup.string().required(),
  })),
});

module.exports = openingTimesSchema;
