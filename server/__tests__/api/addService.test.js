const supertest = require('supertest');

const app = require('../../app');

const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

test('POST /api/service', async (done) => {
  const newService = {
    name: 'hair loss',
  };

  const serviceFields = [
    'service_id',
    'name',
    'status',
  ];

  try {
    const response = await supertest(app)
      .post('/api/service')
      .send(newService)
      .expect(200)
      .expect('Content-Type', /json/);
    const responseFields = Object.keys(response.body);
    expect(serviceFields).toEqual(responseFields);
    done();
  } catch (err) {
    done(err);
  }
});
