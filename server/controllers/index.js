const login = require('./login');
const signup = require('./signup');
const auth = require('./auth');
const getTreatments = require('./treatments');
const {
  addUserBusiness, addUser, getFinance, getUser, getUserBusiness, updateFinance, updateUser,
} = require('./users');

module.exports = {
  login,
  signup,
  auth,
  getTreatments,
  addUserBusiness,
  addUser,
  getFinance,
  getUser,
  getUserBusiness,
  updateFinance,
  updateUser,
};
