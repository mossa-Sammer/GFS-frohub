const connection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

const { getSalonOpeningTimes } = require('../../database/sql_queries');

beforeAll(() => build());
afterAll(() => connection.end());


const getFirstSalon = () => connection.query('SELECT * FROM salon LIMIT 1');

test('get salon opening times ', async () => {
  const { rows: [firstSalon] } = await getFirstSalon();
  const { salon_id: salonId } = firstSalon;
  const { rows: openingTimes } = await getSalonOpeningTimes(salonId);
  expect(openingTimes).toBeDefined();
});
