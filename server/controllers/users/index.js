const { addUserBusiness, getUserBusiness } = require('./business');
const { getFinance, updateFinance } = require('./finance');

exports.addUserBusiness = addUserBusiness;
exports.getUserBusiness = getUserBusiness;
exports.getFinance = getFinance;
exports.updateFinance = updateFinance;

exports.addUser = require('./addUser');
exports.getUser = require('./getUser');
exports.updateUser = require('./updateUser');
