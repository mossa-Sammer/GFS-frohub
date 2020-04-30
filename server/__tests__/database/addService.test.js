const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const { insertService } = require('../../database/queries');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

test('Testing POST api/service', async () => {
  const service = {
    name: 'hair loss',
  };

  const serviceFields = [
    'service_id',
    'name',
    'status',
  ];

  const status = 'inactive';

  const insertedService = await insertService(service.name);
  expect(insertedService.rows[0].status).toBe(status);
  expect(Object.keys(insertedService.rows[0])).toEqual(serviceFields);
});
