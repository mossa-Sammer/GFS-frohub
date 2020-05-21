const supertest = require('supertest');

const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

const { insertStylistBusiness } = require('../../database/queries');

const getStylist = (role = 'stylist') => dbConnection.query('SELECT * FROM "user" WHERE "user".role = $1 LIMIT 1', [role]);

beforeAll(() => build());
afterAll(() => dbConnection.end());

test('PATCH /api/stylist/:id/business Route', async (done) => {
  const businessDetails = {
    accountNumber: '66374958',
    sortCode: '08-9999',
    preffaredPayMethod: 'card',
  };

  const updatedBusiness = {
    accountNumber: '66374958',
    sortCode: '08-9999',
    preffaredPayMethod: 'cash',
  };

  const businessFields = [
    'business_id',
    'user_id',
    'account_number',
    'sort_code',
    'preferred_pay_method',
  ];

  try {
    const stylist = await getStylist();
    const { user_id: userId } = stylist.rows[0];
    const stylistBusiness = await insertStylistBusiness(userId, businessDetails);
    const { user_id: stylistId } = stylistBusiness.rows[0];
    const res = await supertest(app)
      .patch(`/api/stylist/${stylistId}/business`)
      .send(updatedBusiness)
      .expect(200)
      .expect('Content-Type', /json/);
    const { data: response } = res.body;
    const resFields = Object.keys(response[0]);
    expect(businessFields).toEqual(resFields);
    return done();
  } catch (err) {
    return done(err);
  }
});
