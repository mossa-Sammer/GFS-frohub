const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const { checkSalon } = require('../../database/queries');

const getSalon = () => dbConnection.query('SELECT * FROM salon LIMIT 1');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

test('Check if salon is exist or not', async () => {
  const { rows: firstSalon } = await getSalon();
  const { salon_id: salonId, name, type } = firstSalon[0];
  const { rows: [salon] } = await checkSalon(salonId);
  const { name: salonName, type: salonType } = salon;
  expect(salonName).toBe(name);
  expect(salonType).toBe(type);
});
