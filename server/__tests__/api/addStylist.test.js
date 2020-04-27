const request = require('supertest');
const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');

afterAll(() => dbConnection.end());

test('adding a stylist with invalid data',
  () => request(app).post('/api/user/personal', {}).expect(422)
    .expect('Content-Type', /json/));


test('adding a stylist with valid data', () => {
  expect.assertions(1);
  const data = {
    firstName: 'mossa',
    lastName: 'dbabesh',
    email: 'mossa@gmail.com',
    phone: '123123123',
  };
  return dbConnection.query('SELECT * FROM "user" LIMIT 1')
    .then((result) => {
      const { rows: [user] } = result;
      data.userId = user.user_id;

      return request(app).post('/api/user/personal').send(data).expect(200)
        .expect('Content-Type', /json/);
    }).then((res) => {
      expect(res.body.user.email).toBe(data.email);
    });
});
