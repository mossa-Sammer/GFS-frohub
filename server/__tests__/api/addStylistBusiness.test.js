const supertest = require('supertest');

const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

const getStylist = (role = 'stylist') => dbConnection.query('SELECT * FROM "user" WHERE "user".role = $1 LIMIT 1', [role]);

beforeAll(() => build());
afterAll(() => dbConnection.end());

test('POST /api/stylist/:id/business Route', async (done) => {
  const businessDetails = {
    fullName: 'ansam aabed',
    accountNumber: '66374958',
    sortCode: '08-9999',
    preffaredPayMethod: 'card',
  };
  const businessFields = ['business_id', 'user_id', 'full_name', 'account_number', 'sort_code', 'preferred_pay_method'];
  const stylist = await getStylist();
  const { user_id: userId } = stylist.rows[0];
  supertest(app)
    .post(`/api/stylist/${userId}/business`)
    .send(businessDetails)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      const resFields = Object.keys(res.body);
      expect(businessFields).toEqual(resFields);
      return done();
    });
});
