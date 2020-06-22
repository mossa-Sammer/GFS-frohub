const supertest = require('supertest');

const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const getService = () => dbConnection.query('SELECT * FROM service LIMIT 1');

let token;

beforeAll(async () => {
  await dbBuild();
  const result = await supertest(app).post('/api/login').send({
    email: 'mossa@gmail.com',
    password: '123456',
  });
  // eslint-disable-next-line prefer-destructuring
  token = result.headers['set-cookie'][0].split(';')[0];
});

afterAll(() => dbConnection.end());

test('GET /api/service/:id', async (done) => {
  const serviceFields = [
    'service_id',
    'name',
    'status',
  ];

  expect.assertions(2);

  try {
    const { rows: firstService } = await getService();
    const { service_id: serviceId, name: serviceName } = firstService[0];
    const response = await supertest(app)
      .get(`/api/service/${serviceId}`)
      .set('Cookie', token)
      .expect(200)
      .expect('Content-Type', /json/);
    const { service } = response.body;
    const responseFields = Object.keys(service[0]);
    const { name } = service[0];
    expect(name).toBe(serviceName);
    expect(responseFields).toEqual(serviceFields);
    done();
  } catch (err) {
    done(err);
  }
});
