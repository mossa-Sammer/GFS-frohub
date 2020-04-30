const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const { getAllServices } = require('../../database/queries');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());


test('Get all services query', async () => {
  const serviceFields = [
    'service_id',
    'name',
    'status',
  ];

  const services = await getAllServices();
  expect(Object.keys(services.rows[0])).toEqual(serviceFields);
});
