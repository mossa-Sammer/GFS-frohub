const request = require('supertest');
const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');

afterAll(() => dbConnection.end());

test('get the user using id in query param', (done) => request(app)
  .get('/api/stylist/1')
  .expect('Content-Type', /json/)
  .expect(200, done));
