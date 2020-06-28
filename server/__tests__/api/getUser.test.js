const request = require('supertest');
const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

let token;

beforeAll(async () => {
  await build();
  const result = await request(app).post('/api/login').send({
    email: 'mossa@gmail.com',
    password: '123456',
  });
  // eslint-disable-next-line prefer-destructuring
  token = result.headers['set-cookie'][0].split(';')[0];
});

afterAll(() => dbConnection.end());

test('get the user using id in query param', () => {
  expect.assertions(1);
  const expectedFields = [
    'user_id',
    'first_name',
    'last_name',
    'email',
    'phone_number',
    'calling_code',
    'password',
    'role',
    'country',
  ];

  return dbConnection.query('SELECT * FROM "user" LIMIT 1')
    .then((data) => {
      const {
        rows: [user],
      } = data;
      const { user_id: userId } = user;

      return request(app)
        .get(`/api/user/${userId}/personal`)
        .set('Cookie', token)
        .expect('Content-Type', /json/)
        .expect(200);
    }).then((result) => {
      const fields = Object.keys(result.body);
      expect(expectedFields).toEqual(fields);
    });
});
