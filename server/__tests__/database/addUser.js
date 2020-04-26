const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');
const { addUser } = require('../../database/sql_queries');

beforeAll(() => dbBuild());
afterAll(() => dbConnection.end());


test('add a stylist', () => {
  expect.assertions(1);
  const data = {
    firstName: 'soha',
    lastName: 'kadi',
    email: 'soha@gmail.com',
    phone: '1231244',
  };
  return addUser(data).then(({ rows }) => {
    expect(rows[0].role).toBe('stylist');
  });
});
