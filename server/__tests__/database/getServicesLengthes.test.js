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

  const { rows: servicesLengthes } = await getServicesLengthes();
  expect(Object.keys(servicesLengthes[0])).toEqual(serviceLengthesFields);
});
