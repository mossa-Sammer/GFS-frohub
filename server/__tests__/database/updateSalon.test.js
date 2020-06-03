const connection = require('../../database/config/dbConnection');
const build = require('../../database/config/dbBuild');

const { updateSalon } = require('../../database/sql_queries');

beforeAll(() => build());
afterAll(() => connection.end());

const getFirstSalon = () => connection.query('SELECT * FROM salon LIMIT 1');

test('testing update salon query', async (done) => {
  expect.assertions(1);
  try {
    const { rows: [firstSalon] } = await getFirstSalon();
    const { salon_id: salonId } = firstSalon;

    const data = {
      salonId,
      name: 'lolololol',
      about: 'lorem lorem lorem lorem',
      profileImage: 'image',
      coverImage: 'image',
      document: 'docu',
      type: 'home',
      street: 'hmeed',
      city: 'gaza',
      countryCode: 'PS',
      postalCode: '00972',
    };

    const expectedField = [
      'salon_id',
      'user_id',
      'name',
      'about',
      'instgram_handle',
      'profile_image',
      'cover_image',
      'document',
      'type',
      'street',
      'city',
      'country',
      'postal_code',
      'status',
    ];

    const { rows: [updatedSalon] } = await updateSalon(data);
    expect(Object.keys(updatedSalon)).toEqual(expectedField);
    done();
  } catch (e) { done(e); }
});
