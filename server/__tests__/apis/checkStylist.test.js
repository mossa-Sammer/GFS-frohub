const dbConnection = require('../../database/config/dbConnection');
// const dbBuild = require('../../database/config/dbBuild');

const { checkStylist } = require('../../database/queries/stylist');

const getStylistUser = (role = 'stylist') => dbConnection.query('SELECT * FROM "user" WHERE "user".role = $1 LIMIT 1', [role]);

const getAdminUser = (role = 'admin') => dbConnection.query('SELECT * FROM "user" WHERE "user".role = $1 LIMIT 1', [role]);

// beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

describe('Check if the user is Stylist or not', () => {
  test('The user is stylist', async () => {
    const stylist = await getStylistUser();
    const { user_id: userID, role } = stylist.rows[0];
    const isStylist = await checkStylist(userID, role);
    expect(stylist.rows[0]).toEqual(isStylist.rows[0]);
  });

  test('The user is an admin not a stylist', async () => {
    const admin = await getAdminUser();
    const { user_id: userID, role } = admin.rows[0];
    const isStylist = await checkStylist(userID, role);
    expect(isStylist.rows[0]).toBeDefined();
  });
});
