const supertest = require('supertest');

const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

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
      .set('Cookie', token)
      .expect(200)
      .expect('Content-Type', /json/);
    const { services } = response.body;
    const responseFields = Object.keys(services[0]);
    expect(responseFields).toEqual(serviceFields);
    done();
  } catch (err) {
    done(err);
  }
});
