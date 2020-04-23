const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');


beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

test('get user without existing id', () => {});
test('get user by id', () => {});
test('get user without existing email', () => {});
test('get user by email', () => {});
