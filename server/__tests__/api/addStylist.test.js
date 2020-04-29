const request = require('supertest');

const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

beforeAll(() => build());
afterAll(() => dbConnection.end());

const getFirstUser = () => dbConnection.query(
  'SELECT * FROM "user" LIMIT 1',
);

test('adding a stylist with invalid data',
  () => request(app).post('/api/user/dddd/personal', {}).expect(422)
    .expect('Content-Type', /json/));


test('adding a stylist with valid data', () => {
  expect.assertions(1);
  const data = {
    firstName: 'mossa',
    lastName: 'dbabesh',
    email: 'mossa@gmail.com',
    phone: '123123123',
  };
  return getFirstUser()
    .then((result) => {
      const { rows: [user] } = result;
      return request(app).post(`/api/user/${user.user_id}/personal`).send(data).expect(200)
        .expect('Content-Type', /json/);
    }).then((res) => {
      expect(res.body.user.email).toBe(data.email);
    });
});
