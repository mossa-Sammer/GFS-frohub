const connection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

const { getSalonZones } = require('../../database/sql_queries');

beforeAll(() => build());
afterAll(() => connection.end());


const getFirstSalon = () => connection.query('SELECT * FROM salon LIMIT 1');

test('get salon zones', async () => {
  const { rows: [firstSalon] } = await getFirstSalon();
  const { salon_id: salonId } = firstSalon;
  const { rows: zones } = await getSalonZones(salonId);
  expect(zones).toBeDefined();
});
