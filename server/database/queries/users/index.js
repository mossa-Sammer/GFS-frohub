const { Users } = require('../../Models');
const createUser = require('./createUser');

const getUserByEmailOrUsername = (emailOrUsername) => Users.findOne({
  $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
});

module.exports = {
  getUserByEmailOrUsername,
  createUser,
};
