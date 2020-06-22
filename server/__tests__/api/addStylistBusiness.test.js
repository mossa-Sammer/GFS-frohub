const supertest = require('supertest');

const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const getStylist = (role = 'stylist') => dbConnection.query('SELECT * FROM "user" WHERE "user".role = $1 LIMIT 1', [role]);

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

test('POST /api/stylist/:id/business Route', async (done) => {
  const businessDetails = {
    accountNumber: '66374958',
    sortCode: '08-9999',
    preferredPayMethod: 'card',
  };

  const businessFields = [
    'business_id',
    'user_id',
    'account_number',
    'sort_code',
    'preferred_pay_method',
  ];

  const stylist = await getStylist();
  const { user_id: userId } = stylist.rows[0];

  supertest(app)
    .post(`/api/stylist/${userId}/business`)
    .send(businessDetails)
    .set('Cookie', token)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      const resFields = Object.keys(res.body);
      expect(businessFields).toEqual(resFields);
      return done();
    });
});
