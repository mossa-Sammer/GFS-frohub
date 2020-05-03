const supertest = require('supertest');
const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

beforeAll(() => dbBuild());
afterAll(() => dbConnection.end());
test('GET /api/service/length', async (done) => {
  const serviceLengthesFields = [
    'service_length_id',
    'name',
    'status',
  ];
  try {
    const response = await supertest(app)
      .get('/api/service/length')
      .expect(200)
      .expect('Content-Type', /json/);
    const { servicesLengthes } = response.body;
    const responseFields = Object.keys(servicesLengthes[0]);
    expect(responseFields).toEqual(serviceLengthesFields);
    done();
  } catch (err) {
    done(err);
  }
});
