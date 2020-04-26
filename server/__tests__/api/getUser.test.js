const request = require('supertest');
const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');

afterAll(() => dbConnection.end());

test('get the user using id in query param', (done) => {
  expect.assertions(1);
  const expectedFields = [
    'user_id', 'first_name', 'last_name', 'email', 'phone_number', 'role',
  ];

  dbConnection.query('SELECT * FROM "user" LIMIT 1')
    .then((data) => {
      const {
        rows: [user],
      } = data;

      request(app)
        .get(`/api/stylist/${user.user_id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const fields = Object.keys(res.body);
          expect(expectedFields).toEqual(fields);

          return done();
        });
    });
});
