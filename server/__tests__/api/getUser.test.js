const request = require('supertest');
const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

beforeAll(() => build());
afterAll(() => dbConnection.end());

test('get the user using id in query param', () => {
  expect.assertions(1);
  const expectedFields = [
    'user_id',
    'first_name',
    'last_name',
    'email',
    'phone_number',
    'role',
    'password',
  ];

  return dbConnection.query('SELECT * FROM "user" LIMIT 1')
    .then((data) => {
      const {
        rows: [user],
      } = data;
      const { user_id: userId } = user;

      return request(app)
        .get(`/api/user/${userId}/personal`)
        .expect('Content-Type', /json/)
        .expect(200);
    }).then((result) => {
      const fields = Object.keys(result.body);
      expect(expectedFields).toEqual(fields);
    });
});
