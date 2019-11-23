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
        res.cookie('jwt', cookie, { maxAge: 30 * 2 * 24 * 60 * 60 * 10000 }, { HttpOnly: true });
        res.status(200).send({ data: { username: newUser.username }, err: null });
      } else {
        throw Error('validation error');
      }
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422).send({ data: null, err: error.errors });
    } else if (error.code === 11000) {
      res.status(401).send({ data: null, err: ['Username or email is already exist'] });
    } else {
      res.status(500).send({ data: null, err: ['Internal Server Error'] });
    }
  }
};
