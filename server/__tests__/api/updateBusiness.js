const supertest = require('supertest');

const app = require('../../app');
const dbConnection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

const insertBusiness = (id, {
  fullName,
  accountNumber,
  sortCode,
  preferredPayMethod,
}) => dbConnection.query(
  'INSERT INTO business ( user_id, full_name, account_number,  sort_code, preferred_pay_method ) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  [
    id,
    fullName,
    accountNumber,
    sortCode,
    preferredPayMethod,
  ],
);

const getStylist = (role = 'stylist') => dbConnection.query('SELECT * FROM "user" WHERE "user".role = $1 LIMIT 1', [role]);

beforeAll(() => build());
afterAll(() => dbConnection.end());

test('PATCH /api/stylist/:id/business Route', async (done) => {
  const businessDetails = {
    fullName: 'ansam aabed',
    accountNumber: '66374958',
    sortCode: '08-9999',
    preffaredPayMethod: 'card',
  };

  const updatedBusiness = {
    fullName: 'ansam abed',
    accountNumber: '66374958',
    sortCode: '08-9999',
    preffaredPayMethod: 'cash',
  };

  const businessFields = [
    'business_id',
    'user_id',
    'full_name',
    'account_number',
    'sort_code',
    'preferred_pay_method',
  ];

  try {
    const stylist = await getStylist();
    const { user_id: userId } = stylist.rows[0];
    const stylistBusiness = await insertBusiness(userId, businessDetails);
    const { user_id: stylistId } = stylistBusiness.rows[0];
    const res = await supertest(app)
      .patch(`/api/stylist/${stylistId}/business`)
      .send(updatedBusiness)
      .expect(200)
      .expect('Content-Type', /json/);
    const resFields = Object.keys(res.body.data[0]);
    expect(businessFields).toEqual(resFields);
    return done();
  } catch (err) {
    return done(err);
  }
});
