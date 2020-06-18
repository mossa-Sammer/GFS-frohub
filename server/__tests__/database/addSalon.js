const connection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');
const { addSalon } = require('../../database/sql_queries');

beforeAll(() => build());
afterAll(() => connection.end());


test('adding a new salon for an existing user', async () => {
  const { rows: [user] } = await connection.query(
    'SELECT * FROM "user" WHERE role=$1 LIMIT 1', ['stylist'],
  );
  const data = {
    userId: user.user_id,
    name: 'aaa salon',
    about: 'lorem ipsum is a fake text to add to make a paragrphs with no mening and blablabla',
    instgramHandle: 'http://instgram.com/***',
    profileImage: '',
    coverImage: '',
    document: ['mamama', 'dadada'],
    type: 'mobile',
    street: 'omar el mukhtar',
    city: 'gaza',
    countryCode: 'ps',
    postalCode: '65434',
  };

  const { rows: [salon] } = await addSalon(data);
  expect(salon.user_id).toBe(data.userId);
});
