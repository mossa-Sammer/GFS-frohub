const dbConnection = require('../../database/config/dbConnection');
const dbBuild = require('../../database/config/dbBuild');

const {
  addSalonService,
  getAllServices,
  getServicesLengthes,
} = require('../../database/queries');

const getSalon = () => dbConnection.query('SELECT * FROM salon LIMIT 1');

beforeAll(() => dbBuild());

afterAll(() => dbConnection.end());

test('Testing insert new salon service query', async () => {
  const [
    { rows: [service] },
    { rows: [salon] },
    { rows: [serviceLength] },
  ] = await Promise.all([
    getAllServices(),
    getSalon(),
    getServicesLengthes(),
  ]);

  const { service_id: serviceId } = service;
  const { salon_id: salonId, user_id: userId } = salon;
  const { service_length_id: serviceLengthId } = serviceLength;

  const newSalonService = {
    salonId,
    userId,
    serviceId,
    serviceLengthId,
    price: 200,
  };

  const salonServiceFields = [
    'salon_service_id',
    'salon_id',
    'user_id',
    'service_id',
    'service_length_id',
    'price',
    'status',
  ];

  const status = 'inactive';

  const { rows: [insertedSalonService] } = await addSalonService(newSalonService);
  expect(Object.keys(insertedSalonService)).toEqual(salonServiceFields);
  const { status: serviceStatus } = insertedSalonService;
  expect(status).toEqual(serviceStatus);
});
