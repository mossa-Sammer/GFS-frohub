const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const { addServiceLength } = require('../../database/queries');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

describe('Add new service length', () => {
  test('The user is stylist', async () => {
    const serviceLengthFields = [
      'service_length_id',
      'name',
      'status',
    ];

    const serviceLength = {
      name: 'fabulous choppy bob',
    };

    const { name } = serviceLength;
    const insertedServiceLength = await addServiceLength(name);
    const newLengthFields = Object.keys(insertedServiceLength.rows[0]);
    expect(newLengthFields).toEqual(serviceLengthFields);
  });
});
