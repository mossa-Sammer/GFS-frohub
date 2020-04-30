const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const { getServicesLengthes } = require('../../database/queries');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());


test('Get services lengthes', async () => {
  const serviceLengthesFields = [
    'service_length_id',
    'name',
    'status',
  ];

  const servicesLengthes = await getServicesLengthes();
  expect(Object.keys(servicesLengthes.rows[0])).toEqual(serviceLengthesFields);
});
