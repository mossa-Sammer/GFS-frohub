const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const { checkSalonService } = require('../../database/queries');

const getSalonService = () => dbConnection.query('SELECT * FROM salon_service LIMIT 1');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

test('Check if salon service is exist or not', async () => {
  const salonServiceFields = [
    'salon_service_id',
    'salon_id',
    'user_id',
    'service_id',
    'service_length_id',
    'price',
    'status',
  ];

  const { rows: salonService } = await getSalonService();
  const { salon_service_id: salonServiceId } = salonService[0];
  const { rows: [isSalonService] } = await checkSalonService(salonServiceId);
  // console.log(4444444444, Object.keys(isSalonService[0]));
  // const { name: salonName, type: salonType } = salon;
  expect(Object.keys(isSalonService)).toEqual(salonServiceFields);
  // expect(salonType).toBe(type);
});
