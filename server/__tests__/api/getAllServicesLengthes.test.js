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
test('GET /api/service/length', async (done) => {
  const serviceLengthesFields = [
    'service_length_id',
    'name',
    'status',
  ];
  try {
    const response = await supertest(app)
      .get('/api/services/lengthes')
      .set('Cookie', token)
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
