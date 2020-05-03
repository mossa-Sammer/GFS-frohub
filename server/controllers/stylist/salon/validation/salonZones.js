const yup = require('yup');


const salonZones = yup.array().of(yup.object().shape({
  fromZone: yup.number().lessThan(10).moreThan(0).required(),
  toZone: yup.number().lessThan(10).moreThan(0).required(),
  price: yup.number().required(),
}));
module.exports = salonZones;
