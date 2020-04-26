const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');
const { addPersonalData } = require('../../database/sql_queries');

beforeAll(() => dbBuild());
afterAll(() => dbConnection.end());


test('add a stylist', () => {
  expect.assertions(2);
  const data = {
    firstName: 'soha',
    lastName: 'kadi',
    email: 'soha@gmail.com',
    phone: '1231244',
  };
  return addPersonalData(data).then((result) => {
    const { rows: [user] } = result;
    expect(user.email).toBe(data.email);
    expect(user.role).toBe('stylist');
  });
});
