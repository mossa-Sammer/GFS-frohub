const yup = require('yup');


const salonZones = yup.object().shape({
  zones: yup.array().of(yup.object().shape({
    salonId: yup.number().required(),
    fromZone: yup.number().min(1).max(1).required(),
    toZone: yup.number().min(1).max(1).required(),
    price: yup.number().required(),
  })),
});

module.exports = salonZones;
