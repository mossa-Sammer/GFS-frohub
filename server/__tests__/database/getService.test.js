const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const { getService } = require('../../database/queries');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

const getFirstService = () => dbConnection.query('SELECT * FROM service LIMIT 1');

test('get service query by id', async () => {
  const serviceFields = [
    'service_id',
    'name',
    'status',
  ];

  expect.assertions(2);

  const { rows: firstService } = await getFirstService();
  const { service_id: serviceId, status } = firstService[0];
  const { rows: service } = await getService(serviceId);
  const { status: serviceStatus } = service[0];
  expect(serviceStatus).toEqual(status);
  expect(Object.keys(service[0])).toEqual(serviceFields);
});
