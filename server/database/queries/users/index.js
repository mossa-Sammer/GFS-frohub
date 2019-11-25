const { Users } = require('../../Models');

const getUserByEmailOrUsername = (emailOrUsername) => Users.findOne({
  $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
});

module.exports = {
  getUserByEmailOrUsername,
};
