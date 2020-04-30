const supertest = require('supertest');

const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

test('GET /api/services', async (done) => {
  const serviceFields = [
    'service_id',
    'name',
    'status',
  ];
  expect.assertions(1);
  try {
    const response = await supertest(app)
      .get('/api/services')
      .expect(200)
      .expect('Content-Type', /json/);
    const responseFields = Object.keys(response.body.data[0]);
    expect(responseFields).toEqual(serviceFields);
    done();
  } catch (err) {
    done(err);
  }
});
