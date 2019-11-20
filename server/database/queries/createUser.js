const { Users } = require('../Models');

module.exports = ({ username, email, password }) => Users.create({ username, email, password });
