const supertest = require('supertest');

const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const getStylist = (role = 'stylist') => dbConnection.query('SELECT * FROM "user" WHERE "user".role = $1 LIMIT 1 OFFSET 2', [role]);

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

test('GET /api/stylist/:id/business', async (done) => {
  const businessFields = [
    'business_id',
    'user_id',
    'account_number',
    'sort_code',
    'preferred_pay_method',
  ];
  expect.assertions(1);
  try {
    const stylist = await getStylist();
    const { user_id: stylistId } = stylist.rows[0];
    const response = await supertest(app)
      .get(`/api/stylist/${stylistId}/business`)
      .set('Cookie', token)
      .expect(200)
      .expect('Content-Type', /json/);
    const responseFields = Object.keys(response.body.data[0]);
    expect(responseFields).toEqual(businessFields);
    done();
  } catch (err) {
    done(err);
  }
});
