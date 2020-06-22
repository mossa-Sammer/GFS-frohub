const supertest = require('supertest');

const app = require('../../app');

const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const {
  getAllServices,
  getServicesLengthes,
} = require('../../database/queries');

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

const getSalon = () => dbConnection.query('SELECT * FROM salon LIMIT 1');

test('POST /api/salon/:id/service route', async (done) => {
  const salonServiceFields = ['salonService', 'serviceImages'];

  const serviceImages = [
    'a',
    'b',
    'c',
  ];

  try {
    const [
      { rows: [salon] },
      { rows: [service] },
      { rows: [serviceLength] },
    ] = await Promise.all([
      getSalon(),
      getAllServices(),
      getServicesLengthes(),
    ]);

    const { salon_id: salonId } = salon;
    const { name: serviceName } = service;
    const { name: lengthName } = serviceLength;

    const newSalonService = {
      service: serviceName,
      length: lengthName,
      price: 100,
      images: serviceImages,
    };

    const response = await supertest(app)
      .post(`/api/salon/${salonId}/service`)
      .send(newSalonService)
      .set('Cookie', token)
      .expect(200)
      .expect('Content-Type', /json/);

    const reponseFields = Object.keys(response.body);
    expect(salonServiceFields).toEqual(reponseFields);
    done();
  } catch (err) {
    done(err);
  }
});
