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

const getFirstUser = () => dbConnection.query(
  'SELECT * FROM "user" LIMIT 1',
);

test('adding a stylist with invalid data',
  () => request(app)
    .post('/api/user/dddd/personal', {})
    .set('Cookie', token)
    .expect(422)
    .expect('Content-Type', /json/));


test('adding a stylist with valid data', () => {
  expect.assertions(1);
  const data = {
    firstName: 'mossa',
    lastName: 'dbabesh',
    email: 'mossa0000@gmail.com',
    phoneNumber: '123123123',
    country: 'PS',
    callingCode: '972',
  };
  return getFirstUser()
    .then((result) => {
      const { rows: [user] } = result;
      return request(app)
        .post(`/api/user/${user.user_id}/personal`)
        .send(data)
        .set('Cookie', token)
        .expect(200)
        .expect('Content-Type', /json/);
    }).then((res) => {
      expect(res.body.user.email).toBe(data.email);
    });
});
