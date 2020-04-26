const request = require('supertest');
const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');

afterAll(() => dbConnection.end());

test('get the user using id in query param', (done) => {
  const expectedFields = [
    'user_id', 'first_name', 'last_name', 'email', 'phone_number', 'role',
  ];
  expectedFields.sort();

  expect.assertions(expectedFields.length);

  request(app)
    .get('/api/stylist/1')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const fields = Object.keys(res.body).sort();
      for (let i = 0; i < expectedFields.length; i += 1) {
        expect(expectedFields[i]).toBe(fields[i]);
      }

      return done();
    });
});
