const connection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');
const { getSalon } = require('../../database/sql_queries');


beforeAll(() => build());
afterAll(() => connection.end());

const getOneSalon = () => connection.query('SELECT * FROM salon LIMIT 1');


test('get salon by user id', async () => {
  expect.assertions(1);
  const result = await getOneSalon();
  const { rows: [firstSalon] } = result;
  const res = await getSalon(firstSalon.user_id);
  const { rows: [salon] } = res;
  expect(salon.user_id).toBe(firstSalon.user_id);
});
