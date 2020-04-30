const supertest = require('supertest');

const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const getService = () => dbConnection.query('SELECT * FROM service LIMIT 1');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

test('GET /api/service/:id', async (done) => {
  const serviceFields = [
    'service_id',
    'name',
    'status',
  ];

  expect.assertions(2);

  try {
    const firstService = await getService();
    const { service_id: serviceId, name: serviceName } = firstService.rows[0];
    const response = await supertest(app)
      .get(`/api/service/${serviceId}`)
      .expect(200)
      .expect('Content-Type', /json/);
    const responseFields = Object.keys(response.body.data[0]);
    const { name } = response.body.data[0];
    expect(name).toBe(serviceName);
    expect(responseFields).toEqual(serviceFields);
    done();
  } catch (err) {
    done(err);
  }
});
