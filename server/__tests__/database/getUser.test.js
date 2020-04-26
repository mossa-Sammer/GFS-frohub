const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const { getUserByEmail, getUserById } = require('../../database/sql_queries');


beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

describe('get user by email or id', () => {
  test('get user by id', () => {
    expect.assertions(1);
    return dbConnection.query('SELECT * FROM "user"').then((result) => {
      const { rows: [user] } = result;
      return getUserById(user.user_id);
    }).then((result) => {
      const { rows: [user] } = result;
      expect(user).toBeDefined();
    });
  });

  test('get user by email', () => {
    expect.assertions(1);
    return dbConnection.query('SELECT * FROM "user"').then((result) => {
      const { rows: [user] } = result;
      return getUserByEmail(user.email);
    }).then((result) => {
      const { rows: [user] } = result;
      expect(user).toBeDefined();
    });
  });
});
