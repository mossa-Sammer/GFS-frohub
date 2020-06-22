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

const getStylist = (role = 'stylist') => dbConnection.query('SELECT * FROM "user" WHERE "user".role = $1 LIMIT 1', [role]);

test('GET /api/stylist/:id/finance', async (done) => {
  const financeFields = [
    'finance_id',
    'user_id',
    'salon_service_id',
    'collected_deposit',
    'done',
  ];

  try {
    const { rows: [stylist] } = await getStylist();
    const { user_id: stylistId } = stylist;

    const response = await supertest(app)
      .get(`/api/stylist/${stylistId}/finance`)
      .set('Cookie', token)
      .expect(200)
      .expect('Content-Type', /json/);

    const { stylistFinance } = response.body;
    expect(financeFields).toEqual(Object.keys(stylistFinance[0]));
    done();
  } catch (err) {
    done(err);
  }
});
