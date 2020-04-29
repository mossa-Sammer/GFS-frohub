const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const { insertStylistBusiness } = require('../../database/queries/stylist');

const getStylistUser = (role = 'stylist') => dbConnection.query('SELECT * FROM "user" WHERE "user".role = $1 LIMIT 1', [role]);

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

describe('Add stylist business details', () => {
  test('The user is stylist', async () => {
    const stylistBusiness = {
      fullName: 'angham aabed',
      accountNumber: '66374958',
      sortCode: '08-99-99',
      preferredPayMethod: 'card',
    };
    const businessFields = ['business_id', 'user_id', 'full_name', 'account_number', 'sort_code', 'preferred_pay_method'];
    const stylist = await getStylistUser();
    const { user_id: userID } = stylist.rows[0];
    const insertedBusiness = await insertStylistBusiness(userID, stylistBusiness);
    const insertedBusFields = Object.keys(insertedBusiness.rows[0]);
    expect(insertedBusFields).toEqual(businessFields);
  });
});
