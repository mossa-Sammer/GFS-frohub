const { readFileSync } = require('fs');
const { join } = require('path');

const dbConnection = require('./dbConnection');

function dbBuild() {
  const sql = readFileSync(join(__dirname, 'dbBuild.sql')).toString();
  return dbConnection.query(sql);
}

module.exports = dbBuild;
