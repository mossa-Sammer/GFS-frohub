const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');
const { addPersonalData } = require('../../database/sql_queries');

beforeAll(() => dbBuild());
afterAll(() => dbConnection.end());


test('add a stylist', () => {
  expect.assertions(1);

  const data = {
    firstName: 'soha',
    lastName: 'kadi',
    email: 'soha@gmail.com',
    phoneNumber: '599000000',
    country: 'PS',
    callingCode: '970',
  };

  return dbConnection.query(
    'SELECT * FROM "user" LIMIT 1',
  ).then((result) => {
    const {
      rows: [user],
    } = result;
    data.userId = user.user_id;
    return addPersonalData(data);
  }).then((result) => {
    const { rows: [user] } = result;
    expect(user.email).toBe(data.email);
  });
});
