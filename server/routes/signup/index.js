const { sign } = require('jsonwebtoken');
const signupSchema = require('./utils/validation');
const insertNewUser = require('../../database/queries/createUser');
const hashPassword = require('./utils/hashPassword');

module.exports = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const valid = await signupSchema
      .validate({
        username,
        email,
        password,
      }, { abortEarly: false });
    if (valid) {
      const hashedPassword = await hashPassword(password);
      const newUser = await insertNewUser({ username, email, password: hashedPassword });
      if (newUser) {
        const cookie = sign({ username }, process.env.SECRET);
        res.cookie('jwt', cookie, { maxAge: 6 * 30 * 24 * 60 * 60, httpOnly: true });
        res.status(200).send({ data: { username: newUser.username }, err: null });
      } else {
        throw Error('validation error');
      }
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = error.inner.reduce((acc, item) => ({ ...acc, [item.path]: item.message }));
      res.status(422).send({ data: null, err: errors });
    } else if (error.code === 11000) {
      const err = error.errmsg.split('index: ')[1].split(' ')[0];
      const errField = err.substring(0, err.lastIndexOf('_'));
      res.status(401).send({ data: null, err: { [errField]: `${errField} is already exists` } });
    } else {
      res.status(500).send({ data: null, err: { message: 'Internal Server Error' } });
    }
  }
};
