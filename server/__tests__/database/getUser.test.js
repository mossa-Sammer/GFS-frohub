const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const { getUserByEmail, getUserById } = require('../../database/sql_queries');


beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

describe('get user by email or id', () => {
  test('get user without existing id', () => {
    expect.assertions(1);
    return getUserById(12342134).then((data) => {
      const { rows } = data;
      expect(rows[0]).toBeUndefined();
    });
  });

  test('get user by id', () => {
    expect.assertions(1);
    return getUserById(1).then((data) => {
      const { rows } = data;
      expect(rows[0]).toBeDefined();
    });
  });

  test('get user without existing email', () => {
    expect.assertions(1);
    return getUserByEmail('skidrow@gmail.com').then((data) => {
      const { rows } = data;
      expect(rows[0]).toBeUndefined();
    });
  });

  test('get user by email', () => {
    expect.assertions(1);
    return getUserByEmail('mossa@gmail.com').then((data) => {
      const { rows } = data;
      expect(rows[0]).toBeDefined();
    });
  });
});
