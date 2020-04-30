const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const { getAllServices } = require('../../database/queries');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());


test('Get stylist business', async () => {
  const serviceFields = [
    'service_id',
    'name',
    'status',
  ];

  const stylist = await getAllServices();
  expect(Object.keys(stylist.rows[0])).toEqual(serviceFields);
});
