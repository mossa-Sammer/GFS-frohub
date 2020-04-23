const { readFileSync } = require('fs');
const { join } = require('path');

const dbConnection = require('./dbConnection');

function dbBuild() {
  const sql = readFileSync(join(__dirname, 'dbBuild.sql')).toString();
  const fakeData = readFileSync(join(__dirname, 'fakeData.sql')).toString();
  return dbConnection.query(sql + fakeData);
}

module.exports = dbBuild;
