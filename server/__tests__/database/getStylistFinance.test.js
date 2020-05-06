const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const {
  getFinance,
} = require('../../database/queries');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

const getStylist = (role = 'stylist') => dbConnection.query('SELECT * FROM "user" WHERE "user".role = $1 LIMIT 1', [role]);

test('Testing getStylistFinance query', async () => {
  const financeFields = [
    'finance_id',
    'user_id',
    'salon_service_id',
    'collected_deposit',
    'done',
  ];

  const { rows: [stylist] } = await getStylist();
  const { user_id: stylistId } = stylist;

  const { rows: [stylistFinance] } = await getFinance(stylistId);
  expect(financeFields).toEqual(Object.keys(stylistFinance));
});
