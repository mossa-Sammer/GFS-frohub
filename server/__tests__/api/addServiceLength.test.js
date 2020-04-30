const supertest = require('supertest');

const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

test('POST /api/service/length Route', async (done) => {
  const serviceLength = {
    name: 'winning hair',
  };

  const serviceLengthFields = [
    'service_length_id',
    'name',
    'status',
  ];

  try {
    const insertedLength = await supertest(app)
      .post('/api/service/length')
      .send(serviceLength)
      .expect(200)
      .expect('Content-Type', /json/);
    const responseFields = Object.keys(insertedLength.body);
    expect(serviceLengthFields).toEqual(responseFields);
    done();
  } catch (err) {
    done(err);
  }
});
