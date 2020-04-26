const validationError = (err) => {
  const errorsObj = {};
  err.inner.forEach((one) => {
    errorsObj[one.path] = one.errors;
  });
  return errorsObj;
};
module.exports = validationError;
