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
    const { body: insertedLength } = await supertest(app)
      .post('/api/service/length')
      .send(serviceLength)
      .set('Cookie', token)
      .expect(200)
      .expect('Content-Type', /json/);
    const responseFields = Object.keys(insertedLength);
    expect(serviceLengthFields).toEqual(responseFields);
    done();
  } catch (err) {
    done(err);
  }
});
