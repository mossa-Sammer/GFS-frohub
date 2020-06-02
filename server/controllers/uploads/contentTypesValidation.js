const yup = require('yup');


const contentTypesSchema = yup
  .array()
  .of(yup
    .string()
    .test((value) => value === 'application/pdf' || value.startsWith('image/'))).required();


module.exports = contentTypesSchema;
