const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const { updateStylistBusiness } = require('../../database/queries/stylist');


const insertBusiness = (id, {
  accountNumber,
  sortCode,
  preferredPayMethod,
}) => dbConnection.query(
  'INSERT INTO business ( user_id, account_number,  sort_code, preferred_pay_method ) VALUES ($1, $2, $3, $4) RETURNING *',
  [
    id,
    accountNumber,
    sortCode,
    preferredPayMethod,
  ],
);

const getStylistUser = (role = 'stylist') => dbConnection.query('SELECT * FROM "user" WHERE "user".role = $1 LIMIT 1', [role]);

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

describe('Add stylist business details', () => {
  test('The user is stylist', async () => {
    const stylistBusiness = {
      accountNumber: '66374958',
      sortCode: '08-99-99',
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

    const stylist = await getStylistUser();
    const { user_id: userID } = stylist.rows[0];
    const insertStylistBusiness = await insertBusiness(userID, stylistBusiness);
    const { user_id: stylistId } = insertStylistBusiness.rows[0];
    const insertedBusiness = await updateStylistBusiness(stylistId, updatedBusiness);
    const { rows: newBusiness } = insertedBusiness;
    const insertedBusFields = Object.keys(newBusiness[0]);
    expect(insertedBusFields).toEqual(businessFields);
  });
});
