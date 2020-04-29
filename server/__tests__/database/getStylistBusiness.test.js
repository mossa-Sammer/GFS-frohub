const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const { getStylistBusiness } = require('../../database/queries');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());


const selectStylist = 'SELECT * FROM "user" WHERE "user".role = $1 LIMIT 1 OFFSET 2';
const getStylist = (role = 'stylist') => dbConnection.query(selectStylist, [role]);

describe('Get stylist business details query function', () => {
  test('Get stylist business', async () => {
    const businessFields = [
      'business_id',
      'user_id',
      'full_name',
      'account_number',
      'sort_code',
      'preferred_pay_method',
    ];

    const stylist = await getStylist();
    const { user_id: userId } = stylist.rows[0];
    const stylistBusiness = await getStylistBusiness(userId);
    const stylistBusFields = Object.keys(stylistBusiness.rows[0]);
    expect(stylistBusFields).toEqual(businessFields);
  });
});
