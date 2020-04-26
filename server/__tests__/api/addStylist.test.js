const request = require('supertest');
const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');

afterAll(() => dbConnection.end());

test('adding a stylist with invalid data',
  () => request(app).post('/api/stylist/', {}).expect(422)
    .expect('Content-Type', /json/));


test('adding a stylist with valid data', (done) => {
  expect.assertions(1);
  const data = {
    firstName: 'mossa',
    lastName: 'dbabesh',
    email: 'mossa@gmail.com',
    phone: '123123123',
    role: 'stylist',
  };
  return request(app).post('/api/stylist/').send(data).expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) done(err);
      expect(res.body.stylist.email).toBe(data.email);
      done();
    });
});
